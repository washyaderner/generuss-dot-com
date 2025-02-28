/**
 * Content Validation Utilities
 * 
 * This file contains utilities for validating and safely handling
 * different content formats (Markdown, Rich Text) in the application.
 * 
 * These utilities help prevent rendering errors when content types
 * don't match the expected format in components.
 */

import { Document } from '@contentful/rich-text-types';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

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
  const { preferredFormat = 'richtext', fallbackText = '' } = options;
  
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