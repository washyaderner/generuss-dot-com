# Markdown Style Guide

This document serves as the official style guide for all content creation in this project. We have standardized on Markdown as our exclusive content format to ensure consistency, simplicity, and reliability across the entire website.

## Why Markdown?

We've chosen Markdown for its:
- **Simplicity**: Easy to learn and use
- **Readability**: Clear and readable even in raw format
- **Portability**: Works across many platforms and tools
- **Stability**: Reliable rendering with fewer bugs
- **Maintainability**: Easier to debug and fix rendering issues

## Markdown Syntax Guide

### Headers

Use headers to create a clear hierarchy:

```markdown
# Primary Heading (H1)
## Secondary Heading (H2)
### Tertiary Heading (H3)
#### Fourth Level (H4)
```

### Emphasis

```markdown
*Italic text* or _Italic text_
**Bold text** or __Bold text__
***Bold and italic text*** or ___Bold and italic text___
```

### Lists

Unordered lists:
```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
```

Ordered lists:
```markdown
1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
```

### Links

```markdown
[Link text](https://www.example.com)
[Link with title](https://www.example.com "Title text")
```

### Images

```markdown
![Alt text](path/to/image.jpg)
![Alt text](path/to/image.jpg "Optional title")
```

### Code

Inline code:
```markdown
Use the `useState` hook for component state
```

Code blocks:
````markdown
```javascript
function example() {
  return "Hello, world!";
}
```
````

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
>
> And have multiple paragraphs
```

### Horizontal Rules

```markdown
---
```

## Best Practices

1. **Maintain Hierarchy**: Use headers in proper order (H1, H2, H3...) without skipping levels
2. **Be Consistent**: Use the same style for similar elements
3. **Use Alt Text**: Always include descriptive alt text for images
4. **Link Appropriately**: Use descriptive link text rather than generic phrases like "click here"
5. **Keep It Simple**: Avoid complex nested structures when possible

## Implementation in Components

When implementing Markdown content in components:

1. Use the `markdown-to-jsx` library for rendering:
```jsx
import Markdown from 'markdown-to-jsx';

function ContentComponent({ markdownContent }) {
  return <Markdown>{markdownContent}</Markdown>;
}
```

2. For custom styling, use the options prop:
```jsx
<Markdown
  options={{
    overrides: {
      h1: {
        component: Typography,
        props: { variant: 'h1', className: 'my-heading' },
      },
    },
  }}
>
  {markdownContent}
</Markdown>
```

## Content Creation Workflow

1. Create all content in Markdown format
2. Test rendering in the development environment
3. Use the provided validation utilities to ensure content is properly formatted
4. Store content in our CMS as Markdown strings
5. For content migrations, ensure all Rich Text content is converted to Markdown

## Legacy Content Handling

For existing Rich Text content that needs to be converted to Markdown:

1. Use the content validation utilities to detect content format
2. For Rich Text content, convert to Markdown using appropriate tools
3. Update the content in the CMS to use Markdown exclusively
4. Test the rendering to ensure the conversion was successful 