# TaskHub

TaskHub is a task management app for organizing work into spaces, tracking progress, and keeping deadlines visible.

**Live app:** [https://task-hub-lyart-psi.vercel.app](https://task-hub-lyart-psi.vercel.app)

## Features

- Create and manage personal workspaces (spaces) and their tasks.
- Set task priorities, start and due dates, and track tasks as pending, in progress, or completed.
- View dashboard summaries, task status charts, and filtered task lists, including overdue tasks.
- Sign up and sign in with email/password, Google, or GitHub.
- Verify email addresses, reset passwords, and manage account settings.
- Automatically mark unfinished tasks as overdue with the scheduled Vercel cron job.

## Tech stack

- [Next.js](https://nextjs.org/) App Router, React, and TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Better Auth](https://www.better-auth.com/) for authentication
- [Prisma](https://www.prisma.io/) and PostgreSQL for data storage
- Nodemailer with Brevo SMTP for verification and password-reset emails

## Run locally

### Prerequisites

- Node.js and npm
- A PostgreSQL database
- OAuth credentials for Google and GitHub if you want to use social sign-in
- Brevo SMTP credentials for email verification and password resets

### 1. Install dependencies

From the project directory:

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root. Keep real credentials private and do not commit this file.

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

BREVO_SMTP_HOST=""
BREVO_SMTP_PORT="587"
BREVO_SMTP_USERNAME=""
BREVO_SMTP_PASSWORD=""
BREVO_MAIL_FROM=""

CRON_SECRET="replace-with-a-long-random-secret"
```

Set `BETTER_AUTH_URL` to the deployed app URL in production. Configure the OAuth applications with these callback URLs:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

For production, register the same paths on your deployed domain. Configure Brevo with a verified sender address for `BREVO_MAIL_FROM`. Set `CRON_SECRET` in Vercel so the scheduled overdue-task endpoint can be authorized.

### 3. Apply database migrations

The repository includes Prisma migrations. With `DATABASE_URL` set, apply them and generate the Prisma Client:

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Deployment

The app is configured for Vercel, with a daily cron job at `/api/cron` for overdue-task updates. Set the environment variables above in the Vercel project and use the production app URL for `BETTER_AUTH_URL`. The live application is available at [task-hub-lyart-psi.vercel.app](https://task-hub-lyart-psi.vercel.app).
