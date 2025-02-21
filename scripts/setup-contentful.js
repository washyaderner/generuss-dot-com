require('dotenv').config()
const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
})

async function setupContentType() {
  try {
    console.log('Setting up Contentful content type...')
    
    // Get space and environment
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
    const environment = await space.getEnvironment('master')
    
    // Read content type definition
    const contentType = require('../contentful/content-types/blog-post.json')
    
    try {
      // Try to create new content type
      console.log('Creating content type...')
      await environment.createContentType(contentType)
      console.log('Content type created successfully!')
    } catch (error) {
      if (error.name === 'RequestError' && error.message.includes('already exists')) {
        console.log('Content type already exists, updating instead...')
        const existingType = await environment.getContentType('blogPost')
        existingType.fields = contentType.fields
        await existingType.update()
        console.log('Content type updated successfully!')
      } else {
        throw error
      }
    }
    
    // Publish the content type
    const publishedContentType = await environment.getContentType('blogPost')
    await publishedContentType.publish()
    console.log('Content type published successfully!')
    
  } catch (error) {
    console.error('Error setting up content type:', error)
    process.exit(1)
  }
}

setupContentType() 