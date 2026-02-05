# SE Masonry & Repair – static site

Static mirror of https://www.semasonryrepair.com built for GitHub Pages.

## Local preview
```
python -m http.server 8000
# then open http://localhost:8000
```

## Image optimization
```
npm install sharp
node tools/optimize-images.mjs
```
Optimized files are written to `assets/img/optimized/`. Swap `<img>` sources if you want to serve the resized assets.

## Deployment
- The repo root is ready for GitHub Pages (branch: `main`).
- `CNAME` sets the canonical host to `www.semasonryrepair.com`.
- DNS: point apex A records to GitHub Pages IPs and `www` CNAME to `<username>.github.io`.
- Enable Pages and enforce HTTPS in repo settings.
