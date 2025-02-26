// Simple script to test Contentful API
require('dotenv').config();
const { createClient } = require('contentful');

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function testContentful() {
  try {
    console.log('Fetching blog posts from Contentful...');
    const entries = await client.getEntries({
      content_type: 'blogPost',
      include: 2,
    });

    console.log(`Found ${entries.items.length} blog posts`);
    
    entries.items.forEach((entry, index) => {
      console.log(`\nBlog Post ${index + 1}:`);
      console.log(`Title: ${entry.fields.title}`);
      console.log(`Slug: ${entry.fields.slug}`);
      
      if (entry.fields.headerImage && entry.fields.headerImage.fields) {
        const imageUrl = entry.fields.headerImage.fields.file.url;
        console.log(`Header Image URL: https:${imageUrl}`);
        console.log(`Image Description: ${entry.fields.headerImage.fields.description || 'No description'}`);
      } else {
        console.log('No header image found');
      }
    });
  } catch (error) {
    console.error('Error fetching from Contentful:', error);
  }
}

testContentful(); 