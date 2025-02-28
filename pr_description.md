Title: [Cursor] Update footer links for Solutions and social media profiles

Base: dev
Compare: feature/footer

## Changes
- Changed "Web Design" to "App & Web Dev" in Solutions section links
- Changed "n8n Automation" to "Business Automation" in Solutions section links
- Added "Excel Optimization" link above "Business Automation" in Solutions section
- Updated solutions links to navigate to respective sections on the solutions page
- Added section IDs to solutions array and cards on the solutions page for anchor links
- Updated social media links with proper URLs and accessibility attributes
- Added target="_blank" and rel="noopener noreferrer" to social links for security
- Added Upwork profile link to Connect section with appropriate SVG icon
- Added YouTube case study link for the Hold My Brain project in the portfolio page
- Added Upwork case study link for the Excel Performance Dashboard project in the portfolio page
- Updated Excel Performance Dashboard description to be more specific about its functionality
- Updated Excel Performance Dashboard technologies to reflect actual Excel functions used (VLOOKUP, Concatenate)
- Updated Excel Performance Dashboard impact metrics with sales-focused KPIs and efficiency improvements
- Changed Hold My Brain impact text from past to present tense to reflect ongoing project status
- Added Upwork link to the Company section in the footer for additional visibility
- Updated Twitter link to use @DegeneRussAI handle instead of @russgardner
- Removed LinkedIn link from the Connect section in the footer

## Testing
- Verified that all links in the footer Solutions section point to the correct sections
- Confirmed that section IDs are properly added to solution cards
- Validated social media links open in new tabs with proper accessibility attributes
- Tested navigation to the different solution sections from the footer links
- Verified Upwork profile link opens correctly with proper icon
- Confirmed YouTube case study link opens correctly in a new tab
- Verified Upwork case study link for Excel Performance Dashboard works properly
- Checked the updated Excel Performance Dashboard description for accuracy
- Confirmed Excel technologies display correctly with the new Excel functions
- Verified new impact metrics display properly in the Excel Performance Dashboard section
- Confirmed Hold My Brain impact text now displays in present tense
- Verified Upwork link in Company section opens correctly in a new tab
- Confirmed Twitter link now correctly points to @DegeneRussAI profile
- Verified LinkedIn link no longer appears in the Connect section

## Notes
- Using squash and merge to maintain clean git history
- No structural changes to the footer, only link updates and section anchoring
- Only updated placeholder links, maintained existing styling and layout 