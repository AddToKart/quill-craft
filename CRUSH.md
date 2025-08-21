# QuillCraft Development Guidelines

## Project Structure
- `frontend/` - Next.js 13+ with TypeScript, Tailwind CSS, ShadCN UI
- `backend/` - Node.js Express API with TypeScript

## Frontend Commands
- Dev server: `cd frontend && npm run dev`
- Build: `cd frontend && npm run build`
- Lint: `cd frontend && npm run lint`
- Test: Jest coming soon

## Backend Commands
- Dev server: `cd backend && npm run dev`
- Build: `cd backend && npm run build`
- Start: `cd backend && npm run start`
- Lint: `cd backend && npm run lint`
- Format: `cd backend && npm run format`

## Code Style
- TypeScript strict mode enabled
- Functional components with hooks
- Tailwind CSS for styling
- ShadCN UI components
- Absolute imports preferred
- Types colocated with components when possible
- Default exports for pages, named exports for components
- Error handling with try/catch and user-facing toasts

## Copilot Instructions
Always use byterover-retrive-knowledge tool to get the related context before any tasks.
Always use byterover-store-knowledge to store all the critical informations after sucessful tasks.

## Git Ignore
- Next.js: .next/, out/
- Node: node_modules/, .env
- TypeScript: *.tsbuildinfo, next-env.d.ts
- Vercel: .vercel/