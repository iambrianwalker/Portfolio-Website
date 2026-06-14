# Portfolio Website

Personal portfolio for **Brian Walker** — a Next.js site with AWS-backed contact submissions, analytics, resume management, and a secure admin dashboard.

**Live site:** deployed via [AWS Amplify](https://aws.amazon.com/amplify/) from the `dev` branch.

## Features

- **Public site** — Home, About, Projects, Skills, and Contact pages with Framer Motion animations
- **Contact form** — Validates input, rate-limits submissions, stores messages in DynamoDB, and sends email via SES
- **Analytics** — Tracks page views, resume downloads, project clicks, and contact submissions
- **Resume download** — Serves the latest PDF from S3 (production) or `public/resume.pdf` (local dev)
- **Admin dashboard** — Hidden behind a secret path; Cognito auth in production with a dev-only password fallback
- **Admin tools** — View contact submissions, analytics charts, and upload a new resume without redeploying

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| Backend | Next.js Route Handlers (App Router) |
| AWS | Amplify Hosting, DynamoDB, SES, Cognito, S3, CloudWatch Logs |

## Project structure

```
portfolio-website/
├── amplify.yml          # Amplify build config (monorepo root)
└── portfolio-site/      # Next.js application
    ├── app/
    │   ├── (site)/      # Public pages
    │   ├── admin/       # Admin dashboard (internal routes)
    │   └── api/         # API routes
    ├── components/
    ├── lib/             # AWS clients, auth, analytics, content
    ├── proxy.ts         # Admin path rewrites and auth gate
    └── public/
```

## Local development

### Prerequisites

- Node.js 20+
- npm
- AWS resources configured (DynamoDB, SES, Cognito, etc.) for full functionality

### Setup

```bash
cd portfolio-site
npm install
# Create .env.local and add the variables listed below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

Run these from `portfolio-site/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## Environment variables

Create `portfolio-site/.env.local` for local development. Set the same values in **Amplify Console → Environment variables** for production.

| Variable | Required | Description |
| --- | --- | --- |
| `APP_REGION` | Yes | AWS region (e.g. `us-east-1`) |
| `CONTACT_TABLE_NAME` | Yes | DynamoDB table for contact submissions |
| `CONTACT_FROM_EMAIL` | Yes | Verified SES sender address |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives contact form emails |
| `ANALYTICS_TABLE_NAME` | Yes | DynamoDB table for analytics events |
| `COGNITO_USER_POOL_CLIENT_ID` | Yes (prod) | Cognito app client ID |
| `COGNITO_USER_POOL_CLIENT_SECRET` | Yes (prod) | Cognito app client secret |
| `ADMIN_BASE_PATH` | Yes | Secret admin URL path (e.g. `/portfolio-ops-bw2026`) |
| `NEXT_PUBLIC_ADMIN_BASE_PATH` | Yes | Same as `ADMIN_BASE_PATH` (client-side admin link) |
| `CLOUDWATCH_LOG_GROUP_NAME` | Optional | CloudWatch log group for admin events |
| `RESUME_S3_BUCKET` | Prod recommended | S3 bucket for resume PDFs |
| `ADMIN_PASSWORD` | Dev only | Local fallback when Cognito is unavailable — **do not set in production** |

## Admin dashboard

The admin area is not linked in public navigation. Access it by **Shift+clicking** “Brian Walker” in the site header, or go directly to your configured `ADMIN_BASE_PATH`.

- **Production** — Sign in with your Cognito username and password
- **Local dev** — Cognito login, or `ADMIN_PASSWORD` if set in `.env.local`

From the dashboard you can:

- Review contact form submissions
- View analytics charts
- Upload a new resume PDF

## Deploy on AWS Amplify

1. Connect this repository and deploy the **`dev`** branch.
2. Amplify reads `amplify.yml` at the repo root and builds from `portfolio-site/`.
3. Add all environment variables in the Amplify console.
4. Attach IAM permissions to the Amplify compute role:

   - **DynamoDB** — read/write on contact and analytics tables
   - **SES** — `ses:SendEmail`
   - **S3** — `s3:PutObject`, `s3:GetObject` on `arn:aws:s3:::your-bucket/resume/*`
   - **CloudWatch Logs** — create streams and put log events

### Resume storage (production)

Without `RESUME_S3_BUCKET`, the bundled `public/resume.pdf` is served, but **admin uploads will not persist** on Amplify’s ephemeral filesystem. Create an S3 bucket and set `RESUME_S3_BUCKET` for production resume management.

## API routes

| Route | Access | Purpose |
| --- | --- | --- |
| `POST /api/contact` | Public | Submit contact form |
| `POST /api/analytics` | Public | Record analytics events |
| `GET /api/resume` | Public | Download current resume PDF |
| `POST /api/admin/login` | Public | Admin authentication |
| `POST /api/admin/logout` | Admin | Sign out |
| `GET /api/admin/messages` | Admin | List contact submissions |
| `GET/POST /api/admin/resume` | Admin | Resume metadata and upload |

## License

Private project — all rights reserved.
