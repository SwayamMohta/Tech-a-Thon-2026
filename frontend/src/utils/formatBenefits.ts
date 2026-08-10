/**
 * Cleans raw benefits text that may contain markdown-like formatting
 * from scraped data (e.g., **bold**, numbered lists with 1., \n etc.)
 * Returns a clean, readable first bullet or short sentence.
 */
export function cleanBenefitsText(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // Remove **bold** markers
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');

  // Remove remaining lone asterisks
  text = text.replace(/\*/g, '');

  // Remove surrounding quotes
  text = text.replace(/^["'""]+|["'""]+$/g, '');

  // Replace escaped newlines with real newlines
  text = text.replace(/\\n/g, '\n');

  // Split into bullet lines: numbered list items "1. ..." or newlines
  const lines = text
    .split(/\n/)
    .map(l => l.trim())
    .filter(Boolean);

  // Re-split on inline numbered list pattern "1. ... 1. ..."
  const expanded: string[] = [];
  for (const line of lines) {
    // Split inline numbered items like "1. Foo 1. Bar"
    const parts = line.split(/(?<!\d)\d+\.\s+/).filter(Boolean);
    expanded.push(...parts);
  }

  const cleaned = expanded.map(l => l.trim()).filter(Boolean);

  // Return just the first meaningful sentence for card preview
  if (cleaned.length === 0) return '';
  return cleaned[0].replace(/[:\s]+$/, '').trim();
}

/**
 * Returns all bullet points from the benefits text as a string array.
 */
export function parseBenefitsBullets(raw: string): string[] {
  if (!raw) return [];

  let text = raw;

  // Strip markdown bold
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*/g, '');
  text = text.replace(/^["'""]+|["'""]+$/g, '');
  text = text.replace(/\\n/g, '\n');

  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);

  const expanded: string[] = [];
  for (const line of lines) {
    const parts = line.split(/(?<!\d)\d+\.\s+/).filter(Boolean);
    expanded.push(...parts.map(p => p.trim()).filter(Boolean));
  }

  return expanded.map(l => l.replace(/[:\s]+$/, '').trim()).filter(Boolean);
}
