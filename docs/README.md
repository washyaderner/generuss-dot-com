# Project Documentation

This directory contains important documentation for the Generuss.com website project. These documents provide essential information for developers working on the project, helping to prevent common issues and maintain consistency.

## Available Documentation

### [MERGE_CHECKLIST.md](./MERGE_CHECKLIST.md)
A comprehensive checklist to follow before creating pull requests, during PR reviews, and after merging changes. Includes specific guidance for critical files that often cause conflicts and best practices for the Git workflow.

### [DEPENDENCIES.md](./DEPENDENCIES.md)
Detailed information about project dependencies, version compatibility requirements, and guidelines for safely updating dependencies. Includes specific information about content rendering libraries and their compatibility.

### [MARKDOWN_GUIDE.md](./MARKDOWN_GUIDE.md)
The official Markdown style guide for all content creation in this project. Contains syntax guides, best practices, and implementation examples. This document supports our decision to standardize on Markdown as the exclusive content format for the project.

## Purpose of This Documentation

These documents were created after encountering several issues during development, including:

1. **Merge Conflicts**: Particularly in configuration files like `next.config.js`
2. **Content Rendering Issues**: Challenges with handling different content formats, leading to our decision to standardize on Markdown
3. **Version Compatibility**: Problems with Node.js versions and Next.js compatibility

By following the guidelines in these documents, developers can avoid these common pitfalls and maintain a more stable codebase.

## Best Practices

In addition to the specific documents, here are some general best practices for this project:

1. **Always read documentation before modifying configuration files**
2. **Use Markdown exclusively for all content creation**
3. **Use the content validation utilities in `lib/contentValidation.ts` to handle legacy content**
4. **Follow the branch management workflow described in `.cursorrules`**
5. **Clean up temporary files after use**
6. **Add clear, explanatory comments for complex code**

## Keeping Documentation Updated

This documentation should be treated as a living resource. When you encounter new issues or develop better solutions:

1. Update the relevant document
2. Add new documentation as needed
3. Reference the documentation in code comments
4. Make sure new team members are aware of these resources 