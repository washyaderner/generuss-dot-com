# Common Issues and Solutions

This document outlines common issues that may occur during development and their solutions.

## Development Server Issues

### Server Constantly Restarting

**Problem:** The Next.js development server keeps restarting with the message "Found a change in next.config.js".

**Solution:**
1. Create a `.env.local` file with the environment variable `NEXT_SKIP_WATCHING_CONFIG=true`
2. Use the provided `scripts/restart-dev.sh` script which already sets this variable

**Explanation:** Next.js watches configuration files for changes. Sometimes file system events or other processes can cause Next.js to incorrectly detect changes in the configuration file, leading to continuous restarts.

### Port Already in Use

**Problem:** "Port 3000 is in use, trying 3001 instead"

**Solution:**
1. Run `scripts/clean-ports.sh` to kill processes using ports 3000 and 3001
2. Or use `scripts/restart-dev.sh` which automatically cleans ports before starting

**Explanation:** This typically happens when a previous instance of the development server is still running in the background or when another application is using the port.

## Favicon Issues

### 404 Errors for Favicon Files

**Problem:** Console shows 404 errors for favicon files like `/favicon.svg`, `/site.webmanifest`, or `/favicon-96x96.png`

**Solution:**
1. Run `scripts/create-favicon-files.sh` to create placeholder favicon files
2. Replace the placeholder files with your actual favicons
3. Clear browser cache (DevTools > Network tab > "Disable cache")
4. Restart the development server with `scripts/restart-dev.sh`

**Explanation:** The browser tries to load favicon files but they might be missing from the public directory or there might be a caching issue.

## Cache-Related Issues

### Changes Not Appearing

**Problem:** Changes to code or assets don't appear in the browser

**Solution:**
1. Clear the Next.js cache with `rm -rf .next`
2. Clear browser cache
3. Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
4. Or use `scripts/restart-dev.sh` which handles cache clearing

**Explanation:** Both Next.js and browsers cache aggressively for performance. Sometimes you need to clear these caches to see recent changes.

## Git Workflow Issues

### Merge Conflicts in Configuration Files

**Problem:** Frequent merge conflicts in `next.config.js` or other configuration files

**Solution:**
1. Always check with the team before modifying configuration files
2. Make small, focused changes to minimize conflict surface area
3. Document changes in comments within the file
4. When conflicts occur, carefully merge by understanding both versions

**Explanation:** Configuration files are often changed by multiple developers and can be prone to conflicts. Coordinating changes and documenting them well reduces conflicts.

## API and Data Issues

### Content API Errors

**Problem:** Errors related to Contentful or other API integrations

**Solution:**
1. Check API keys and environment variables
2. Verify network connectivity
3. Check API service status
4. Ensure content models match what the code expects

**Explanation:** API integrations can break due to various reasons including expired tokens, changed schemas, or service outages.

## Performance Issues

### Slow Development Server

**Problem:** The development server runs slowly

**Solution:**
1. Use `scripts/restart-dev.sh` to start with a clean slate
2. Reduce the number of pages/components being monitored
3. Temporarily disable some plugins or optimizations in development

**Explanation:** The development server needs to watch files and rebuild components, which can become resource-intensive in large projects.

## Deployment Issues

### Vercel/Netlify Build Failures

**Problem:** Deployment builds fail

**Solution:**
1. Check the build logs for specific errors
2. Ensure all dependencies are correctly specified in package.json
3. Verify environment variables are set in the deployment platform
4. Test the build locally with `npm run build`

**Explanation:** Deployment environments may differ from development environments in subtle ways that can cause builds to fail. 