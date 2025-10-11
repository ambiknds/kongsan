# Sanity CMS Setup Guide

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign up/log in
2. Click "Create project" in the dashboard
3. Choose a project name (e.g., "kongsan-cms")
4. Choose a dataset name (use "production")
5. Copy your Project ID

## Step 2: Get Your API Token

1. In your Sanity project dashboard, go to "API" section
2. Click "Tokens" tab
3. Click "Add API token"
4. Give it a name (e.g., "Web App Token")
5. Choose "Editor" permissions
6. Copy the token immediately (you won't see it again)

## Step 3: Update Environment Variables

Update your `.env` file with:
```
VITE_SANITY_PROJECT_ID=your_actual_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your_actual_token
```

## Step 4: Set Up Sanity Studio

1. Install Sanity CLI globally:
```bash
npm install -g @sanity/cli
```

2. Create a new Sanity Studio in a separate folder:
```bash
cd ..
sanity init
```

3. Follow the prompts:
   - Use existing project
   - Select your project
   - Use default dataset configuration
   - Choose project output path (e.g., "kongsan-studio")

## Step 5: Add Schema Definitions

In your Sanity Studio folder, create schema files in `schemas/`:

### schemas/video.js
```javascript
export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 25:30'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail'
    }
  }
}
```

### schemas/podcast.js
```javascript
export default {
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'imageUrl',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 35:20'
    },
    {
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
      description: 'URL to the podcast audio file'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'imageUrl'
    }
  }
}
```

### schemas/teaching.js
```javascript
export default {
  name: 'teaching',
  title: 'Teaching',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 10
    },
    {
      name: 'imageUrl',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Grace', value: 'Grace'},
          {title: 'Faith', value: 'Faith'},
          {title: 'Prayer', value: 'Prayer'},
          {title: 'Worship', value: 'Worship'},
          {title: 'Purpose', value: 'Purpose'},
          {title: 'Spiritual Growth', value: 'Spiritual Growth'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'imageUrl'
    },
    prepare(selection) {
      const {author, title, media} = selection
      return {
        title: title,
        subtitle: `By ${author}`,
        media: media
      }
    }
  }
}
```

### Update schemas/index.js
```javascript
import video from './video'
import podcast from './podcast'
import teaching from './teaching'

export const schemaTypes = [video, podcast, teaching]
```

## Step 6: Deploy Sanity Studio

```bash
cd kongsan-studio
sanity deploy
```

Choose a studio hostname (e.g., kongsan-studio)

## Step 7: Access Your Studio

Go to: `https://your-studio-name.sanity.studio`

You can now add content through the Sanity Studio interface!
