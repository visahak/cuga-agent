/**
 * Utility functions for downloading content in various formats
 */

/**
 * Generate a timestamp-based filename
 */
function generateFilename(prefix: string, extension: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${prefix}_${timestamp}.${extension}`;
}

/**
 * Trigger browser download for a file
 */
function triggerDownload(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Download content as JSON
 */
export function downloadAsJSON(data: any, filenamePrefix: string = 'final_answer'): void {
  const content = JSON.stringify(data, null, 2);
  const filename = generateFilename(filenamePrefix, 'json');
  triggerDownload(content, filename, 'application/json');
}

/**
 * Download content as Markdown
 */
export function downloadAsMarkdown(content: string, filenamePrefix: string = 'final_answer'): void {
  const timestamp = new Date().toISOString();
  const markdown = `# Final Answer\n\nGenerated: ${timestamp}\n\n---\n\n${content}`;
  const filename = generateFilename(filenamePrefix, 'md');
  triggerDownload(markdown, filename, 'text/markdown');
}

/**
 * Download content as plain text
 */
export function downloadAsText(content: string, filenamePrefix: string = 'final_answer'): void {
  const timestamp = new Date().toISOString();
  // Strip HTML if present
  const plainText = stripHtml(content);
  const text = `FINAL ANSWER\n\nGenerated: ${timestamp}\n\n${'='.repeat(60)}\n\n${plainText}`;
  const filename = generateFilename(filenamePrefix, 'txt');
  triggerDownload(text, filename, 'text/plain');
}

/**
 * Download content as standalone HTML
 */
export function downloadAsHTML(content: string, filenamePrefix: string = 'final_answer'): void {
  const timestamp = new Date().toISOString();
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Final Answer - ${timestamp}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      color: #1e293b;
      background-color: #f8fafc;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    .timestamp {
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    pre {
      background: #f1f5f9;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.9em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 15px 0;
    }
    th, td {
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #f8fafc;
      font-weight: 600;
    }
    a {
      color: #0ea5e9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 Final Answer</h1>
    <div class="timestamp">Generated: ${timestamp}</div>
  </div>
  <div class="content">
    ${content}
  </div>
</body>
</html>`;
  const filename = generateFilename(filenamePrefix, 'html');
  triggerDownload(html, filename, 'text/html');
}

/**
 * Download structured data (for innovation evaluations)
 */
export function downloadStructuredData(
  data: any,
  format: 'json' | 'markdown' | 'text' | 'html',
  filenamePrefix: string = 'innovation_evaluation'
): void {
  switch (format) {
    case 'json':
      downloadAsJSON(data, filenamePrefix);
      break;
    case 'markdown':
      // Convert structured data to markdown
      const markdown = convertStructuredToMarkdown(data);
      downloadAsMarkdown(markdown, filenamePrefix);
      break;
    case 'text':
      const text = convertStructuredToText(data);
      downloadAsText(text, filenamePrefix);
      break;
    case 'html':
      const html = convertStructuredToHTML(data);
      downloadAsHTML(html, filenamePrefix);
      break;
  }
}

/**
 * Convert structured data to markdown format
 */
function convertStructuredToMarkdown(data: any): string {
  if (typeof data === 'string') return data;
  
  let markdown = '';
  
  // Handle innovation evaluation format
  if (data.innovation_understanding) {
    markdown += `## Innovation Understanding\n\n${data.innovation_understanding}\n\n`;
  }
  if (data.clarity_and_enablement) {
    markdown += `## Clarity and Enablement\n\n${data.clarity_and_enablement}\n\n`;
  }
  if (data.novelty_and_nonobviousness) {
    markdown += `## Novelty and Non-Obviousness\n\n${data.novelty_and_nonobviousness}\n\n`;
  }
  if (data.novelty_score) {
    markdown += `## Novelty Score\n\n**${data.novelty_score}**\n\n`;
  }
  if (data.ibm_business_value) {
    markdown += `## IBM Business Value\n\n${data.ibm_business_value}\n\n`;
  }
  if (data.scores) {
    markdown += `## Scores\n\n`;
    Object.entries(data.scores).forEach(([key, value]) => {
      markdown += `- **${key}**: ${value}\n`;
    });
    markdown += '\n';
  }
  
  // Fallback: stringify the entire object
  if (!markdown) {
    markdown = JSON.stringify(data, null, 2);
  }
  
  return markdown;
}

/**
 * Convert structured data to plain text format
 */
function convertStructuredToText(data: any): string {
  if (typeof data === 'string') return stripHtml(data);
  
  return stripHtml(convertStructuredToMarkdown(data));
}

/**
 * Convert structured data to HTML format
 */
function convertStructuredToHTML(data: any): string {
  if (typeof data === 'string') return data;
  
  const markdown = convertStructuredToMarkdown(data);
  // Note: In production, you'd use a markdown-to-html converter here
  // For now, we'll wrap it in pre tags
  return `<pre style="white-space: pre-wrap; font-family: inherit;">${markdown}</pre>`;
}

// Made with Bob
