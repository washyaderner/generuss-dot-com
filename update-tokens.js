const fs = require('fs');
const path = require('path');

// The correct token values from your Contentful dashboard
const CORRECT_DELIVERY_TOKEN = '_D_hul3Vx9iSuITAHiOpfF-_c27wCiSk1a8sBfkc4is';
const CORRECT_PREVIEW_TOKEN = '-1vC6w7HGBT3vTXO77uLTmMzPL986QExbuCe8iUMIaY';

// Path to .env.local file
const envFilePath = path.join(process.cwd(), '.env.local');

try {
  console.log('Reading .env.local file...');
  let envFileContent = fs.readFileSync(envFilePath, 'utf8');
  
  // Replace the token values
  console.log('Updating token values...');
  
  // Update the delivery token
  envFileContent = envFileContent.replace(
    /CONTENTFUL_ACCESS_TOKEN=.*/,
    `CONTENTFUL_ACCESS_TOKEN=${CORRECT_DELIVERY_TOKEN}`
  );
  
  // Update the public delivery token
  envFileContent = envFileContent.replace(
    /NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=.*/,
    `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=${CORRECT_DELIVERY_TOKEN}`
  );
  
  // Update the preview token
  envFileContent = envFileContent.replace(
    /CONTENTFUL_PREVIEW_TOKEN=.*/,
    `CONTENTFUL_PREVIEW_TOKEN=${CORRECT_PREVIEW_TOKEN}`
  );
  
  // Write the updated content back to .env.local
  fs.writeFileSync(envFilePath, envFileContent);
  console.log('Tokens updated successfully in .env.local');
  
  // Output the current token values for confirmation
  console.log('\nCurrent token values:');
  console.log(`CONTENTFUL_ACCESS_TOKEN=${CORRECT_DELIVERY_TOKEN}`);
  console.log(`NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=${CORRECT_DELIVERY_TOKEN}`);
  console.log(`CONTENTFUL_PREVIEW_TOKEN=${CORRECT_PREVIEW_TOKEN}`);
  
  console.log('\nNOTE: You need to restart your Next.js server for changes to take effect.');
} catch (error) {
  console.error('Error updating tokens:', error);
} 