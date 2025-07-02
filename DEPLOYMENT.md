# Deployment Guide

## Vercel Deployment with Environment Variables

### Step 1: Prepare Your Repository
1. Ensure your repository is committed to GitHub, GitLab, or Bitbucket
2. Make sure `.env.local` is in your `.gitignore` (it already is)
3. Verify that your YouTube API key is not hardcoded anywhere

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. The initial deployment will fail because the YouTube API key is missing - this is expected

### Step 3: Set Environment Variables
1. In your Vercel project dashboard, go to **Settings**
2. Click on **Environment Variables**
3. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_YOUTUBE_API_KEY`
   - **Value**: `your_actual_youtube_api_key_here`
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**

### Step 4: Redeploy
1. Go to the **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Your site should now work with the YouTube integration

### Step 5: Verify
1. Visit your deployed site
2. Navigate to `/hitpixels`
3. Check that YouTube videos are loading properly
4. Check the browser console for any API errors

## Security Notes

- **Never commit API keys** to version control
- Use `NEXT_PUBLIC_` prefix only for client-side variables that are safe to expose
- The YouTube Data API key can be safely exposed to the client since it's read-only
- Consider setting API key restrictions in Google Cloud Console to limit usage to your domain

## Troubleshooting

### YouTube Videos Not Loading
1. Check that the environment variable is set correctly in Vercel
2. Verify the API key is valid in Google Cloud Console
3. Ensure YouTube Data API v3 is enabled
4. Check browser console for specific error messages

### Build Errors
1. Make sure all dependencies are in `package.json`
2. Verify TypeScript types are correct
3. Check that all imports are valid

### Performance Issues
1. Consider implementing caching for YouTube API responses
2. Optimize images and use Next.js Image component
3. Enable Vercel Analytics to monitor performance

## API Quotas

The YouTube Data API has quotas:
- 10,000 units per day by default
- Each video list request costs ~3-5 units
- Monitor usage in Google Cloud Console
- Consider caching responses to reduce API calls 