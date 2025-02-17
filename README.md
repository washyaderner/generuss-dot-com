# Generuss.com

Personal website and portfolio built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 14.2.16
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:washyaderner/generuss-dot-com.git
   cd generuss-dot-com
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   Note: We use `--legacy-peer-deps` to resolve dependency conflicts with date-fns and react-day-picker.

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
generuss-dot-com/
├── app/                # Next.js app directory
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── public/            # Static assets
└── styles/            # Global styles and Tailwind config
```

## Development

- Run `npm run dev` to start the development server
- Run `npm run build` to create a production build
- Run `npm run start` to start the production server

## Deployment

This site is deployed on Vercel and uses Cloudflare for DNS management.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m '[Cursor] Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

All rights reserved.