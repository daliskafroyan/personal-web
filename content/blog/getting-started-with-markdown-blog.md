---
title: "Getting Started with Your Markdown Blog"
date: "2024-01-15"
excerpt: "Learn how to create and manage your static markdown blog with Next.js. This guide covers everything from writing your first post to deploying your site."
tags: ["markdown", "blog", "nextjs", "static-site"]
author: "Tech Blogger"
---

# Welcome to Your New Markdown Blog!

Congratulations! You've successfully set up a static markdown blog. This post will show you how to create and manage your content.

## Writing Blog Posts

Your blog posts are written in Markdown and stored in the `content/blog` directory. Each post should have:

### Frontmatter

At the top of each markdown file, include frontmatter with metadata:

```yaml
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
tags: ["tag1", "tag2", "tag3"]
author: "Your Name"
---
```

### Markdown Content

After the frontmatter, write your content using standard Markdown syntax:

- **Bold text** and *italic text*
- [Links](https://example.com)
- `Inline code`
- Lists and numbered lists
- Tables
- Images
- Code blocks with syntax highlighting

## Code Examples

Here's a JavaScript example:

```javascript
function greetReader(name) {
  console.log(`Hello, ${name}! Welcome to the blog.`);
}

greetReader("Developer");
```

And here's some Python:

```python
def calculate_reading_time(content):
    words = len(content.split())
    return math.ceil(words / 200)  # 200 words per minute

reading_time = calculate_reading_time("Your blog post content here...")
print(f"Estimated reading time: {reading_time} minutes")
```

## Features

Your blog includes:

1. **Static Generation**: All pages are pre-built for fast loading
2. **Markdown Processing**: Full GitHub Flavored Markdown support
3. **Syntax Highlighting**: Code blocks are automatically highlighted
4. **Reading Time**: Automatically calculated based on word count
5. **Tags**: Organize your posts with tags
6. **Responsive Design**: Looks great on all devices

## Deployment

Since this is a static site, you can deploy it to:

- **Vercel**: Perfect for Next.js projects
- **Netlify**: Great for static sites
- **GitHub Pages**: Free hosting for public repositories
- **Any static hosting service**

To build your site for production:

```bash
npm run build
```

This will generate a static version of your site in the `out` directory.

## Next Steps

1. Create more blog posts in the `content/blog` directory
2. Customize the styling in `src/app/globals.css`
3. Add more features like search or categories
4. Set up automatic deployment

Happy blogging! 🚀 