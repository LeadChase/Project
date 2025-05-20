# SmartRealEstate LeadFlow Automation

SmartRealEstate LeadFlow Automation is a powerful tool designed to streamline lead management and enhance customer interactions using AI-powered voice and chat assistants. This guide will help you set up the project on your local machine and configure it for use.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wojackbro/SmartRealEstate-LeadFlow-Automation.git
   cd SmartRealEstate-LeadFlow-Automation
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Project

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Environment Variables

To use the AI-powered voice and chat assistants, you need to configure the environment variables.

1. Create a `.env` file in the `src/components/` directory if it doesn't already exist.

2. Add the following variables to the `.env` file:
   ```env
   VITE_OPENAI_API_KEY=YOUR_API_KEY_HERE
   ```
   Replace `YOUR_API_KEY_HERE` with your OpenAI API key. You can obtain an API key by signing up at [OpenAI](https://openai.com/).

3. Save the file.

## Features

- **AI Chat Assistant**: Engage with leads using an intelligent chat interface.
- **AI Voice Assistant**: Communicate with leads through a voice-enabled assistant.
- **Lead Management**: Capture, manage, and analyze leads effectively.
- **Analytics Dashboard**: Gain insights into lead performance and reports.

For more details, visit the [GitHub repository](https://github.com/wojackbro/SmartRealEstate-LeadFlow-Automation).

## Deployment

### 1. Environment Variables

Create a `.env.production` file (or set these in your hosting provider's environment settings):

```
APP_URL=https://leadchoose.com
PORT=80
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_supabase_anon_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SMTP_FROM="LeadChoose <noreply@leadchoose.com>"
NODE_ENV=production
```

### 2. Build the Frontend

```
npm run build
```
This will generate a `dist` folder with static files.

### 3. Serve the Frontend
- Serve the `dist` folder using Nginx, Apache, or your backend server.
- If your backend serves static files, copy the `dist` folder to your backend's public/static directory.

### 4. Deploy the Backend
- Upload your backend code to your server or hosting provider.
- Install dependencies:
  ```
  npm install
  ```
- Start the server:
  ```
  npm run start
  ```
  Or use a process manager like PM2:
  ```
  npx pm2 start dist/server.js --name leadchoose
  ```

### 5. SSL/HTTPS
- Make sure your site uses HTTPS (get a certificate via Let's Encrypt or your host).

### 6. CORS
- Ensure your backend CORS config allows only your production domain (`https://leadchoose.com`).

### 7. Database and SMTP
- Use production credentials for your database and email.

### 8. Notes
- The Vite proxy is only for local development.
- All API calls in the frontend should use `/api/...` (no hardcoded localhost).
- For email confirmation, `APP_URL` must be set to `https://leadchoose.com`.

---

For any issues, check your backend and frontend logs, and ensure all environment variables are set correctly.

Feel free to contribute to the project by submitting issues or pull requests. Happy coding!
