# Gebin George Portfolio

A professional portfolio website for Gebin George built with Next.js, Tailwind CSS, Framer Motion, and React Icons.

## Features

- **Modern Design** - Clean, professional layout with blue/white color scheme
- **Dark Mode** - Toggle between light and dark themes
- **Animations** - Smooth animations using Framer Motion
- **Responsive** - Mobile-friendly design that works on all devices
- **Section-based Navigation** - Easy navigation through portfolio sections
- **YouTube Integration** - Dynamic video loading from YouTube channel
- **Instagram Page** - Dedicated motorcycle adventure page

## Sections

- **Home** - Introduction and contact info
- **About** - Personal bio and information
- **Education** - Academic qualifications and religious formation
- **Experience** - Work experience and pastoral ministry
- **Projects** - Featured and regular project showcases
- **Contact** - Contact information and form
- **HitPixels** - YouTube channel showcase page
- **BikesWithGebin** - Instagram motorcycle adventure page

## Technologies Used

- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **YouTube Data API** - For dynamic video content

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# YouTube API Configuration
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
```

### Getting YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to your `.env.local` file

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `NEXT_PUBLIC_YOUTUBE_API_KEY` with your API key value
4. Redeploy your project

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Add your YouTube API key to `.env.local`
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000 in your browser

## Deployment

This site can be easily deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

**Important:** Don't forget to set up your environment variables in your deployment platform!

## License

This project is licensed under the MIT License. 