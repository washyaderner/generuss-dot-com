Title: [Cursor] Link solutions to corresponding portfolio projects and add YouTube video showcase

Base: dev
Compare: feature/external-links

## Changes
- Added ID attributes to each project card in the portfolio page for direct linking
- Added IDs for each project: "hold-my-brain", "sales-acceleration", "content-generation", and "excel-dashboard"
- Updated solution cards in the solutions page to link to their corresponding portfolio projects
- Modified each solution object to include a portfolioLink property pointing to its related portfolio project
- Changed "Learn more" links to navigate to the respective portfolio project instead of the contact page
- Mapped solutions to portfolio projects as follows:
  - "Excel & AI Automation" → "Excel Performance Dashboard" 
  - "Sales Strategy & Systems" → "Sales Acceleration Suite"
  - "AI-Powered App & Web Development" → "Hold My Brain"
  - "Business & Content Automation" → "Content Generation Engine"
- Reordered portfolio projects to move Excel Performance Dashboard from fourth position to second position
- New portfolio project order: Hold My Brain, Excel Performance Dashboard, Sales Acceleration Suite, Content Generation Engine
- Added "(coming soon!)" text to the titles of the Sales Acceleration Suite and Content Generation Engine projects
- Added YouTube video showcase below "Where Technology Meets Creativity" section
- Created styled container with gradient header for the video
- Embedded video with responsive design and proper accessibility attributes

## Testing
- Verified that each solution's "Learn more" link points to the correct portfolio project
- Confirmed that the portfolio project IDs are properly added to each project card
- Tested navigation from solutions page to portfolio projects via the "Learn more" links
- Checked that anchor links work correctly when navigating to specific portfolio projects
- Verified smooth scrolling to the targeted project when using anchor links
- Tested navigation flow on both desktop and mobile devices
- Confirmed that the Excel Performance Dashboard now appears as the second card in the portfolio listing
- Verified that all project details remain intact after reordering
- Validated that "(coming soon!)" text appears correctly on the designated project titles
- Verified direct links to YouTube and Upwork case studies work correctly
- Tested YouTube video embedding and responsiveness
- Verified video plays correctly on desktop and mobile

## Notes
- Using squash and merge to maintain clean git history
- No structural changes to the solutions or portfolio pages, only enhanced linking between them and reordering of portfolio cards
- This improves the user experience by providing a more connected journey through the site
- The reordering prioritizes the Excel Performance Dashboard to give it more prominence on the page
- The "(coming soon!)" indicators help set proper expectations for project case studies in development
- Future enhancement could include adding a "Back to Solutions" link on the portfolio page
- YouTube video showcases AI-generated content skills
- The addition of "(coming soon!)" helps set proper expectations for users
- Future enhancement: Add tracking for external link clicks 