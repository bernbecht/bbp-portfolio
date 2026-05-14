# BBP Portfolio

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Font Awesome](https://fontawesome.com/) - React icons library

## Features

- Responsive design for mobile, tablet, and desktop
- Accessible semantic HTML5 structure
- TypeScript for type safety
- Modern React patterns with Server Components
- Optimized performance with Next.js

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Set **`NEXT_PUBLIC_SITE_URL`** in production to your canonical HTTPS site URL (for example `https://yourdomain.com`). Next.js uses it as `metadataBase` so Open Graph, Twitter card, and canonical URLs resolve to your real domain instead of localhost or a generic host. Copy [.env.example](.env.example) to `.env.local` for local overrides. On Vercel, add the variable under Project → Settings → Environment Variables for the Production environment.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
app/                 # Next.js App Router pages
components/          # Reusable React components
icons/              # Custom icon components
public/             # Static assets
docs/               # Project documentation
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/), but can be deployed to any platform that supports Next.js applications.

## License

Private project © BBP
