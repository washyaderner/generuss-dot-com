/**
 * Content Validation Utilities
 * 
 * This file contains utilities for validating and safely handling
 * different content formats (Markdown, Rich Text) in the application.
 * 
 * PROJECT STANDARD: We have standardized on using Markdown exclusively for all content
 * in this application. Rich Text support is maintained only for backward compatibility
 * with existing content or third-party integrations.
 * 
 * All new content should be created in Markdown format. The utilities in this file
 * help with validation, conversion, and safe handling of different content types.
 * 
 * See docs/MARKDOWN_GUIDE.md for content creation standards.
 */

import { Document, BLOCKS, INLINES, MARKS, Block, Inline, Text } from '@contentful/rich-text-types';

// Define a type for our rich text content nodes that includes the properties we access
interface ContentNode {
  nodeType: string;
  value?: string;
  marks?: Array<{ type: string }>;
  data?: { uri?: string };
  content?: ContentNode[];
}

/**
 * Checks if the provided content is a Contentful Rich Text document
 * 
 * @param content - Content to check
 * @returns boolean indicating if content is a Rich Text document
 */
export function isRichTextContent(content: any): content is Document {
  return (
    content && 
    typeof content === 'object' && 
    'nodeType' in content && 
    content.nodeType === BLOCKS.DOCUMENT &&
    'content' in content &&
    Array.isArray(content.content)
  );
}

/**
 * Checks if the provided content is Markdown format
 * 
 * @param content - Content to check
 * @returns boolean indicating if content is likely Markdown
 */
export function isMarkdownContent(content: any): boolean {
  return (
    content &&
    typeof content === 'string' &&
    // Simple heuristic to detect Markdown - look for common Markdown patterns
    (content.includes('#') || 
     content.includes('*') || 
     content.includes('`') || 
     content.includes('[') || 
     content.includes('---') ||
     content.includes('__'))
  );
}

/**
 * Safely get content as Markdown string
 * 
 * @param content - Content to convert to Markdown
 * @returns content as Markdown string or empty string if invalid
 */
export function getAsMarkdown(content: any): string {
  if (typeof content === 'string') {
    return content;
  }
  
  // If it's Rich Text, we return an empty string
  // In a real implementation, you might want to convert Rich Text to Markdown
  return '';
}

/**
 * Safely get content as Rich Text document
 * 
 * @param content - Content to get as Rich Text
 * @returns content as Rich Text Document or null if invalid
 */
export function getAsRichText(content: any): Document | null {
  if (isRichTextContent(content)) {
    return content;
  }
  
  // If it's not valid Rich Text, return null
  return null;
}

/**
 * Creates a simple fallback Rich Text document from a string
 * 
 * @param text - Text to convert to a simple Rich Text document
 * @returns A simple Rich Text document containing the text
 */
export function createFallbackRichTextFromString(text: string): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: text,
            marks: [],
            data: {}
          }
        ]
      }
    ]
  };
}

/**
 * Determines the optimal rendering strategy for content based on its type
 * 
 * @param content - The content to analyze
 * @returns 'richtext', 'markdown', or 'text' based on content type
 */
export function determineContentRenderType(content: any): 'richtext' | 'markdown' | 'text' {
  if (isRichTextContent(content)) {
    return 'richtext';
  }
  
  if (isMarkdownContent(content)) {
    return 'markdown';
  }
  
  return 'text';
}

/**
 * Safe content handler that works with different content types
 * 
 * @param content - The content to handle
 * @param options - Optional handling options
 * @returns Processed content ready for rendering
 */
export function safeContentHandler(
  content: any, 
  options: { 
    preferredFormat?: 'richtext' | 'markdown', 
    fallbackText?: string
  } = {}
): { type: 'richtext' | 'markdown' | 'text', content: any } {
  // Set default preferred format to markdown based on project standards
  const { preferredFormat = 'markdown', fallbackText = '' } = options;
  
  // First check if content matches preferred format
  if (preferredFormat === 'richtext' && isRichTextContent(content)) {
    return { type: 'richtext', content };
  }
  
  if (preferredFormat === 'markdown' && isMarkdownContent(content)) {
    return { type: 'markdown', content };
  }
  
  // If not, try to determine type automatically
  const contentType = determineContentRenderType(content);
  
  if (contentType === 'richtext') {
    // If we received Rich Text but prefer Markdown, convert it
    if (preferredFormat === 'markdown') {
      return { 
        type: 'markdown', 
        content: convertRichTextToMarkdown(content)
      };
    }
    return { type: 'richtext', content };
  }
  
  if (contentType === 'markdown') {
    return { type: 'markdown', content };
  }
  
  // If content is a string but not markdown, return as text
  if (typeof content === 'string') {
    return { type: 'text', content };
  }
  
  // Last resort fallback
  if (preferredFormat === 'richtext') {
    return { 
      type: 'richtext', 
      content: createFallbackRichTextFromString(fallbackText) 
    };
  }
  
  return { type: 'markdown', content: fallbackText };
}

/**
 * Converts Rich Text content to Markdown format
 * 
 * This utility helps transition from Rich Text to our standardized Markdown format.
 * Note: This is a simplified converter and may not capture all Rich Text features.
 * For complex Rich Text documents, manual review may be needed.
 * 
 * @param richTextDocument - The Rich Text document to convert
 * @returns Markdown string representation of the Rich Text document
 */
export function convertRichTextToMarkdown(richTextDocument: Document): string {
  if (!isRichTextContent(richTextDocument)) {
    return '';
  }

  let markdown = '';
  
  // Type assertion to ContentNode to give TS the right structure
  const document = richTextDocument as unknown as ContentNode;
  
  // Process each block in the document
  if (document.content) {
    document.content.forEach(block => {
      switch (block.nodeType) {
        case BLOCKS.PARAGRAPH:
          if (block.content) {
            markdown += processTextContent(block.content) + '\n\n';
          }
          break;
        
        case BLOCKS.HEADING_1:
          if (block.content) {
            markdown += '# ' + processTextContent(block.content) + '\n\n';
          }
          break;
        
        case BLOCKS.HEADING_2:
          if (block.content) {
            markdown += '## ' + processTextContent(block.content) + '\n\n';
          }
          break;
        
        case BLOCKS.HEADING_3:
          if (block.content) {
            markdown += '### ' + processTextContent(block.content) + '\n\n';
          }
          break;
        
        case BLOCKS.HEADING_4:
          if (block.content) {
            markdown += '#### ' + processTextContent(block.content) + '\n\n';
          }
          break;
        
        case BLOCKS.HEADING_5:
          if (block.content) {
            markdown += '##### ' + processTextContent(block.content) + '\n\n';
          }
          break;
        
        case BLOCKS.HEADING_6:
          if (block.content) {
            markdown += '###### ' + processTextContent(block.content) + '\n\n';
          }
          break;
        
        case BLOCKS.UL_LIST:
          if (block.content) {
            block.content.forEach(item => {
              if (item.nodeType === BLOCKS.LIST_ITEM && item.content) {
                markdown += '- ' + processTextContent(item.content) + '\n';
              }
            });
            markdown += '\n';
          }
          break;
        
        case BLOCKS.OL_LIST:
          if (block.content) {
            block.content.forEach((item, index) => {
              if (item.nodeType === BLOCKS.LIST_ITEM && item.content) {
                markdown += `${index + 1}. ` + processTextContent(item.content) + '\n';
              }
            });
            markdown += '\n';
          }
          break;
        
        case BLOCKS.QUOTE:
          if (block.content) {
            block.content.forEach(item => {
              if (item.content) {
                markdown += '> ' + processTextContent(item.content) + '\n';
              }
            });
            markdown += '\n';
          }
          break;
        
        case BLOCKS.HR:
          markdown += '---\n\n';
          break;
      }
    });
  }
  
  return markdown.trim();
}

/**
 * Helper function to process text content with marks
 * 
 * @param content - Array of content nodes to process
 * @returns Processed text with Markdown syntax
 */
function processTextContent(content: ContentNode[]): string {
  let result = '';
  
  if (!content || !Array.isArray(content)) {
    return result;
  }
  
  content.forEach(item => {
    if (!item) return;
    
    if (item.nodeType === 'text') {
      let text = item.value || '';
      
      // Apply marks if present
      if (item.marks && item.marks.length > 0) {
        item.marks.forEach(mark => {
          switch (mark.type) {
            case MARKS.BOLD:
              text = `**${text}**`;
              break;
            case MARKS.ITALIC:
              text = `*${text}*`;
              break;
            case MARKS.CODE:
              text = `\`${text}\``;
              break;
            case MARKS.UNDERLINE:
              // Markdown doesn't have underline, we use emphasis instead
              text = `_${text}_`;
              break;
          }
        });
      }
      
      result += text;
    } else if (item.nodeType === INLINES.HYPERLINK && item.data && item.content) {
      const linkText = processTextContent(item.content);
      result += `[${linkText}](${item.data.uri || '#'})`;
    } else if (item.nodeType === INLINES.ENTRY_HYPERLINK && item.content) {
      // For internal links, we'd need to resolve the entry
      // This is a simplified approach
      const linkText = processTextContent(item.content);
      result += `[${linkText}](internal-link)`;
    } else if (item.nodeType === INLINES.ASSET_HYPERLINK && item.content) {
      // For asset links, we'd need to resolve the asset
      const linkText = processTextContent(item.content);
      result += `[${linkText}](asset-link)`;
    } else if (item.content && Array.isArray(item.content)) {
      // Recursively process nested content
      result += processTextContent(item.content);
    }
  });
  
  return result;
} 