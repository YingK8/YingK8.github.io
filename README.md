
  # Minimalist Portfolio Website

  This is a code bundle for Minimalist Portfolio Website. The original project is available at https://www.figma.com/design/IajZ3RfE1UClLNPt5pRz1B/Minimalist-Portfolio-Website.

  ## Local preview

  1. Install dependencies:
    npm i
  2. Start the dev server:
    npm run dev
  3. Open the local URL shown in the terminal (usually http://localhost:5173).

  ## Production preview

  1. Build the site:
    npm run build
  2. Preview the built output:
    npm run preview

  ## Deploy to GitHub Pages

  This project is configured for GitHub Pages project-site hosting with:
  - Vite base path set to /Portfoliowebsite/
  - Hash-based routing to avoid 404 errors on nested routes
  - One-command publish script using gh-pages

  Deploy steps:

  1. Make sure your GitHub repo is named Portfoliowebsite (or update the base path in vite.config.ts).
  2. Commit and push your latest changes.
  3. Run:
    npm run deploy
  4. In GitHub repo settings, enable Pages and set source to gh-pages branch.

  Your site URL will be:
  https://<your-username>.github.io/Portfoliowebsite/

  ## Media files

  For static media URLs like /media/images/..., place files under:
  - public/media/images
  - public/media/videos
  - public/media/3d_models

  Vite will include these files in production output automatically.
  