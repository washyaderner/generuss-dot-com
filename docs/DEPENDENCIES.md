# Project Dependencies Documentation

This document provides detailed information about the project's dependencies, compatibility requirements, and guidelines for managing dependencies safely.

## Environment Requirements

This project requires the following environment:
- **Node.js**: >= 18.17.0 (Next.js 14 requirement)
- **npm**: >= 9.6.0

These requirements are specified in the `engines` field of package.json.

## Critical Dependencies

### Core Framework
- **Next.js 14.x**: 
  - Requires Node.js >= 18.17.0
  - Core framework for the application
  - Version 14.2.16 is currently used

### UI Library
- **React 18.x**:
  - Must be compatible with the Next.js version
  - Core UI library (18.2.0)
  - react-dom must match react version exactly

### CMS Integration
- **Contentful**:
  - Core Contentful SDK for fetching content (11.5.0)
  - @contentful/rich-text-react-renderer: For rendering Contentful Rich Text content
  - @contentful/rich-text-types: Types for Contentful Rich Text format

### Content Rendering
- **markdown-to-jsx**: For rendering legacy Markdown content
- **react-markdown**: Alternative Markdown renderer
- **remark & remark-html**: Processing Markdown and converting to HTML

### Content Format Decision

**IMPORTANT:** After evaluating both content formats, this project has standardized on **Markdown exclusively** for all content. This decision was made for the following reasons:
- Simplifies content creation and rendering
- Reduces complexity in components
- Eliminates format-related bugs and inconsistencies
- Provides a more maintainable codebase

While the codebase retains the ability to handle Rich Text content for backward compatibility, all new content should be created in Markdown format only.

### Form Handling
- **react-hook-form**: Form state management and validation
- **zod**: Schema validation
- **@hookform/resolvers**: Connects zod with react-hook-form

### Email Service
- **resend**: Email service API

## Dependency Update Guidelines

### When updating dependencies:

1. **Group Related Updates**: 
   - Always update related packages together
   - Example: All React packages should be updated at the same time

2. **Testing Requirements**:
   - Test thoroughly after updates, especially content rendering
   - Check both Markdown and Rich Text content rendering
   - Verify form validation still works as expected

3. **Version Compatibility**:
   - Keep dependencies in sync with Node.js version requirements
   - Check Next.js compatibility with React versions
   - Ensure type packages match their implementation versions

4. **Breaking Changes**:
   - Research potential breaking changes before updating
   - Check compatibility between Contentful SDK and renderer packages
   - Test across different browsers and devices after updates

## Package.json Guidelines

### JSON Format Requirements

JSON files (including package.json) have strict formatting requirements:

1. **No Comments Allowed**: 
   - Unlike JavaScript, JSON does not support comments
   - Do not use `/* */` or `//` comment syntax in package.json
   - For documentation, use README files or separate documentation files

2. **Double Quotes Required**:
   - All property names and string values must use double quotes (`"`)
   - Single quotes (`'`) are not valid in JSON

3. **No Trailing Commas**:
   - Do not add commas after the last property in an object or array
   - Example: `{"name": "value",}` is invalid; use `{"name": "value"}`

4. **Valid Property Values**:
   - Only strings, numbers, objects, arrays, boolean (true/false), or null
   - No functions, undefined, or other JavaScript-specific values

Violation of these rules will cause build and deployment failures, as seen in our deployment error when comments were added to package.json.

## Common Issues and Solutions

### Content Rendering Issues

If content fails to render correctly after dependency updates:

1. Check for format inconsistencies between Markdown and Rich Text
2. Verify that the content type matches the expected format in components
3. Ensure the correct renderer is being used for each content type
4. Test with both simple and complex content examples

### Next.js Version Compatibility

When updating Next.js:

1. Review the Node.js version requirements
2. Update the `engines` field in package.json
3. Check for breaking changes in the routing system
4. Test image optimization and static generation

### React Dependencies

React packages have strict compatibility requirements:

1. react-dom must match the exact same version as react
2. @types/react should match the major version of react
3. When updating React, also update all components that depend on specific React features

## Maintenance Checklist

Before deploying after dependency updates:

- [ ] Verify Node.js version compatibility
- [ ] Test content rendering with both Markdown and Rich Text
- [ ] Check form validation and submission
- [ ] Test image loading and optimization
- [ ] Verify email functionality
- [ ] Run a full build process
- [ ] Test on multiple browsers and devices 