# AWS Deployment Guide

## Overview
This portfolio uses AWS Amplify with IAM roles for service access, DynamoDB for storage, SES for outbound email, CloudWatch Logs for request visibility, and a lightweight admin dashboard for operational oversight.

## Architecture
- Next.js App Router frontend hosted on Amplify
- API routes for contact and analytics
- DynamoDB tables for contact submissions and analytics events
- SES for notification emails
- CloudWatch Logs for structured request logging

## Amplify configuration
1. Create a new Amplify app and connect the GitHub repository.
2. Set the build command to `npm run build`.
3. Set the build output directory to `.next`.
4. Configure the following environment variables in Amplify:
   - `NEXT_PUBLIC_SITE_URL`
   - `AWS_REGION`
   - `CONTACT_TABLE_NAME`
   - `ANALYTICS_TABLE_NAME`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
5. Attach an IAM role to the Amplify service role instead of using static access keys.

## AWS resources
- DynamoDB table `contact-submissions` with partition key `id` (String)
- DynamoDB table `portfolio-analytics` with partition key `eventType` (String), sort key `timestamp`
- SES verified sender and recipient addresses
- CloudWatch log group `/aws/amplify/portfolio-site`

## Monitoring
Application logs are automatically forwarded from AWS Amplify to CloudWatch.

Tracked events:
- Contact form submissions
- Contact form failures
- Resume downloads
- Project clicks
- Admin dashboard access

## CI/CD
Git Push
  ↓
GitHub Repository
  ↓
AWS Amplify Build
  ↓
Automated Deployment

## Security
- Zod validation on all API requests
- Rate limiting on contact submissions
- Security headers configured in Next.js
- Server-side environment variables only
- No AWS access keys stored in source control

## IAM role permissions
Grant the Amplify execution role least-privilege access to:
- `dynamodb:PutItem`
- `dynamodb:GetItem`
- `dynamodb:Query`
- `dynamodb:Scan`
- `ses:SendEmail`
- `logs:CreateLogStream`
- `logs:PutLogEvents`

## Environment variables
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
AWS_REGION=us-east-1
CONTACT_TABLE_NAME=contact-submissions
ANALYTICS_TABLE_NAME=portfolio-analytics
CONTACT_FROM_EMAIL=verified-sender@example.com
CONTACT_TO_EMAIL=your-email@example.com
```
