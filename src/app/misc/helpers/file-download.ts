export function downloadFile(document: Document, url: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = url.match(/\/([^/]+)\?/)?.[1] || 'Resume_' + new Date().toISOString();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
