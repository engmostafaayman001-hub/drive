# Drive Dashboard Rebuild

## Stack
- Next.js 14 App Router
- TypeScript strict mode
- Prisma + PostgreSQL
- Tailwind CSS + next-themes
- JWT auth + bcrypt
- Zod validation

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   ```
3. Run Prisma generate and migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## Notes
- Upload processing state is saved to `storage/temp/state.json`.
- JWT is stored in an httpOnly cookie.
