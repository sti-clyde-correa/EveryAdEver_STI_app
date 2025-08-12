# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css` 
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
npm run dev        # Start dev server (client + server)
npm run build      # Production build
npm run start      # Start production server
npm run typecheck  # TypeScript validation
npm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `npm run build` + `npm start`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces




# Steups to deploy on ubnutu

Here’s a clean step-by-step guide for **building and deploying** a **Next.js (Vite-powered) + Tailwind CSS React app** on Ubuntu.
I’ll assume you already have the project locally and want to run it in production on an Ubuntu server with Node.js.

---

## **1. Prepare the Ubuntu server**

Update and install essential tools:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential
```

---

## **2. Install Node.js & npm**

Install Node.js LTS (e.g., v20):

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

Check versions:

```bash
node -v
npm -v
```

---

## **3. Clone or upload your project**

If it’s in GitHub:

```bash
cd /var/www
sudo git clone https://github.com/username/your-repo.git myapp
cd myapp
```

*(Adjust path to your liking, e.g., `/var/www/myapp`)*

---

## **4. Install dependencies**

```bash
npm install
```

---

## **5. Build for production**

For **Next.js (Vite plugin)**:

```bash
npm run build
```

This generates the `.next` build output.

---

## **6. Test locally before deploying**

```bash
npm start
```

By default, Next.js runs on port **3000**.
You can visit:

```
http://SERVER_IP:3000
```

If it works, stop the server (Ctrl+C).

---

## **7. Run as a background process with PM2**

Install **PM2**:

```bash
sudo npm install -g pm2
```

Start the app:

```bash
pm2 start npm --name "myapp" -- start
```

Enable startup on reboot:

```bash
pm2 startup
pm2 save
```

Check logs:

```bash
pm2 logs myapp
```

---

## **8. Set up Nginx as a reverse proxy**

Install Nginx:

```bash
sudo apt install -y nginx
```

Configure:

```bash
sudo nano /etc/nginx/sites-available/myapp
```

Paste:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

---

## **9. (Optional) Enable HTTPS with Certbot**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## **10. Tailwind CSS setup check**

If not already configured, ensure **tailwind.config.js** is present and content paths include:

```js
content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
]
```

And CSS is imported in `styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

✅ **At this point:**

* The app runs on `http://your-domain.com`
* Managed by PM2
* Served via Nginx
* Tailwind styles are active
* Optional HTTPS enabled

---

If you want, I can give you a **Docker-based deployment** flow for Next.js + Tailwind on Ubuntu so you won’t have to install Node.js directly on the server. That approach is cleaner for scaling.




# DB schema created by clyde

-- ==============================
-- DATABASE: everyadever
-- ==============================

-- Extensions (Optional but recommended)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================
-- MASTER DATA TABLES
-- ==============================

CREATE TABLE Countries (
    country_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    iso_code CHAR(2) UNIQUE NOT NULL
);

CREATE TABLE Regions (
    region_id SERIAL PRIMARY KEY,
    country_id INT REFERENCES Countries(country_id),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Cities (
    city_id SERIAL PRIMARY KEY,
    region_id INT REFERENCES Regions(region_id),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Zips (
    zip_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES Cities(city_id),
    zip_code VARCHAR(20) NOT NULL
);

-- ==============================
-- USER TABLES
-- ==============================

CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(20),
    city_id INT REFERENCES Cities(city_id),
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE UserPics (
    pic_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE UserVideos (
    video_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- ==============================
-- SOCIAL CONNECTIONS
-- ==============================

CREATE TABLE Relationships (
    relationship_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    friend_id UUID REFERENCES Users(user_id),
    status VARCHAR(20) CHECK (status IN ('pending','accepted','blocked')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================
-- EVENTS & FILES
-- ==============================

CREATE TABLE Events (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES Users(user_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE EventFiles (
    file_id SERIAL PRIMARY KEY,
    event_id UUID REFERENCES Events(event_id),
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Plans (
    plan_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    features TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================
-- PAYMENTS & TRANSACTIONS
-- ==============================

CREATE TABLE Payments (
    payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(user_id),
    plan_id INT REFERENCES Plans(plan_id),
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending','completed','failed')),
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID REFERENCES Payments(payment_id),
    gateway_reference VARCHAR(255),
    transaction_type VARCHAR(20) CHECK (transaction_type IN ('credit','debit')),
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================
-- COMMUNICATIONS
-- ==============================

CREATE TABLE ChatHistories (
    chat_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES Users(user_id),
    receiver_id UUID REFERENCES Users(user_id),
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ContactsUs (
    contact_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE SalesRequests (
    request_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    details TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================
-- EXTRA TABLES FOR SOCIAL MEDIA
-- ==============================

CREATE TABLE Notifications (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(user_id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Likes (
    like_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    event_id UUID REFERENCES Events(event_id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Comments (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(user_id),
    event_id UUID REFERENCES Events(event_id),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================
-- HISTORY TABLES (Audit logs)
-- ==============================

CREATE TABLE Users_Hist (LIKE Users INCLUDING ALL);
CREATE TABLE Events_Hist (LIKE Events INCLUDING ALL);
CREATE TABLE Payments_Hist (LIKE Payments INCLUDING ALL);
CREATE TABLE Transactions_Hist (LIKE Transactions INCLUDING ALL);
CREATE TABLE ChatHistories_Hist (LIKE ChatHistories INCLUDING ALL);

-- ==============================
-- FUNCTIONS & TRIGGERS FOR HISTORY
-- ==============================

-- Generic history insert function
CREATE OR REPLACE FUNCTION log_history()
RETURNS TRIGGER AS $$
BEGIN
    EXECUTE format('INSERT INTO %I SELECT ($1).*', TG_TABLE_NAME || '_Hist') USING NEW;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for history tables
CREATE TRIGGER trg_users_hist
AFTER INSERT OR UPDATE ON Users
FOR EACH ROW EXECUTE FUNCTION log_history();

CREATE TRIGGER trg_events_hist
AFTER INSERT OR UPDATE ON Events
FOR EACH ROW EXECUTE FUNCTION log_history();

CREATE TRIGGER trg_payments_hist
AFTER INSERT OR UPDATE ON Payments
FOR EACH ROW EXECUTE FUNCTION log_history();

CREATE TRIGGER trg_transactions_hist
AFTER INSERT OR UPDATE ON Transactions
FOR EACH ROW EXECUTE FUNCTION log_history();

CREATE TRIGGER trg_chathistories_hist
AFTER INSERT OR UPDATE ON ChatHistories
FOR EACH ROW EXECUTE FUNCTION log_history();

