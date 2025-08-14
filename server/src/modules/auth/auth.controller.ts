import { Controller, Post, Body, UseGuards, Request, Get, HttpCode, Res, BadRequestException, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import express from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private jwtService: JwtService
    ) { }

    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        // const hashedPassword = await bcrypt.hash(password, 12);
        // return this.authService.register(username, email, hashedPassword);
        return this.authService.register(username, email, password);
    }

    //   @UseGuards(LocalAuthGuard)
    //   @Post('login')
    //   async login(@Request() req) {
    //     return this.authService.login(req.user);
    //   }
    // @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) res: express.Response,
    ) {
        const user = await this.authService.findOne(email);
        if (!user) {
            throw new BadRequestException('Invalid credentials : Invalid email or password');
        }
        // console.log("password", password)        
        if (!await bcrypt.compare(password, user.password_hash)) {
            throw new BadRequestException('Password is incorrect');
        };

        const jwt = await this.jwtService.signAsync({ id: user.user_id });
        // console.log("jwt", jwt);
        // const token = await this.authService.login(user);


        res.cookie('jwt', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // sameSite: 'lax',
            // maxAge: 60 * 60 * 1000,
        });

        // return jwt;
        return { message: 'Login successful' };
    }

    @Get('user')
    async getUser(@Req() req: express.Request) {
        try {
            const cookie = req.cookies?.jwt;
            // console.log("cookie",cookie)
            const data = await this.jwtService.verifyAsync(cookie);
            // console.log("data",data)

            if (!data) throw new UnauthorizedException('JWT not found');

            const user = await this.authService.findOne(data.user_id);
            // console.log("user",user)
            const { password_hash, ...result } = user
            return result;

        } catch (e) {
            console.log("error", e)
            throw new UnauthorizedException('JWT cookie not found or invalid');
        }

        // const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];
        // if (!token) throw new UnauthorizedException('JWT not found');
        // return this.authService.verifyToken(token);
        // const token = req.cookies?.jwt;
        // if (!token) throw new UnauthorizedException('JWT not found');

        // return this.authService.verifyToken(token);

    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
