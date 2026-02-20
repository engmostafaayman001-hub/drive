# Drive SaaS Rebuild

## Stack
- Next.js 14 App Router
- TypeScript (strict)
- Prisma + PostgreSQL
- TailwindCSS
- next-themes
- JWT auth with httpOnly cookie
- Zod validation

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Set `DATABASE_URL` and `JWT_SECRET`.
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Run development server:
   ```bash
   npm run dev
   ```

## Build
```bash
npm run build
```
