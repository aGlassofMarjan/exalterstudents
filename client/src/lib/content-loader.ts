import fs from 'fs';
import path from 'path';

// --- Interfaces ---

export interface HeroContent {
  title: string;
  subtitle: string;
}

export interface ValueCard {
  name: string;
  description: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  valueCards: ValueCard[];
  summaryTitle: string;
  summaryDescription: string;
}

export interface ServiceCard {
  name: string;
  description: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface AchievementCard {
  title: string;
  description: string;
}

export interface MetricsContent {
  title: string;
  description: string;
  metrics: MetricItem[];
  achievementCards: AchievementCard[];
}

export interface TestimonialCard {
  name: string;
  role: string;
  quote: string;
}

export interface NewsCard {
  date: string;
  title: string;
  url: string;
}

export interface EventCard {
  name: string;
  date: string;
  url: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  serviceBrief: { title: string; cards: ServiceCard[] };
  serviceFull: { title: string; subtitle: string; cards: ServiceCard[] };
  metrics: MetricsContent;
  marquee: { title: string; description: string };
  testimonials: TestimonialCard[];
  news: NewsCard[];
  events: EventCard[];
}

// --- Indonesian month mapping for date parsing ---

const BULAN: Record<string, number> = {
  Januari: 0, Februari: 1, Maret: 2, April: 3,
  Mei: 4, Juni: 5, Juli: 6, Agustus: 7,
  September: 8, Oktober: 9, November: 10, Desember: 11
};

function parseIndonesianDate(dateStr: string): Date {
  // Format: "D Bulan YYYY" e.g. "7 Desember 2025"
  const parts = dateStr.trim().split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = BULAN[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return new Date(0);
}

// --- Helpers ---

function t(s: string): string {
  return s.trim();
}

/** Extract value after "Key: value" pattern from a heading string */
function extractAfterColon(heading: string): string {
  const idx = heading.indexOf(':');
  if (idx === -1) return t(heading);
  return t(heading.slice(idx + 1));
}

/**
 * Split raw markdown into a map of section name → section body.
 * Splits on lines starting with "## " (level-2 headings).
 */
function splitSections(raw: string): Map<string, string> {
  const map = new Map<string, string>();
  const parts = raw.split(/^## /m);
  for (const part of parts) {
    if (!part.trim()) continue;
    const newlineIdx = part.indexOf('\n');
    if (newlineIdx === -1) continue;
    const heading = t(part.slice(0, newlineIdx));
    const body = part.slice(newlineIdx + 1);
    map.set(heading, body);
  }
  return map;
}

/**
 * Split a section body into a flat map of all headings (### and ####) → body.
 * This handles the nested structure where #### headings appear between ### headings.
 */
function splitAllSubsections(body: string): Map<string, string> {
  const map = new Map<string, string>();
  // Split on ### or #### headings
  const parts = body.split(/^#{3,4} /m);
  for (const part of parts) {
    if (!part.trim()) continue;
    const newlineIdx = part.indexOf('\n');
    if (newlineIdx === -1) {
      map.set(t(part), '');
      continue;
    }
    const heading = t(part.slice(0, newlineIdx));
    const body2 = part.slice(newlineIdx + 1);
    map.set(heading, body2);
  }
  return map;
}

/**
 * Parse bullet list items of the form:
 *   * *Name*, description
 */
function parseBulletCards(text: string): Array<{ name: string; description: string }> {
  const results: Array<{ name: string; description: string }> = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*\*\s+\*([^*]+)\*,\s*(.*)/);
    if (m) results.push({ name: t(m[1]), description: t(m[2]) });
  }
  return results;
}

/**
 * Parse numbered list items of the form:
 *   1. *Name*, description
 */
function parseNumberedCards(text: string): Array<{ name: string; description: string }> {
  const results: Array<{ name: string; description: string }> = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*\d+\.\s+\*([^*]+)\*,\s*(.*)/);
    if (m) results.push({ name: t(m[1]), description: t(m[2]) });
  }
  return results;
}

/**
 * Parse metric bullets of the form:
 *   * **value** label
 */
function parseMetrics(text: string): MetricItem[] {
  const results: MetricItem[] = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*\*\s+\*\*([^*]+)\*\*\s+(.*)/);
    if (m) results.push({ value: t(m[1]), label: t(m[2]) });
  }
  return results;
}

/**
 * Parse testimonial cards (numbered list):
 *   1. *Name, Role*; quote  OR  1. *Name. Role*; quote
 */
function parseTestimonials(text: string): TestimonialCard[] {
  const results: TestimonialCard[] = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*\d+\.\s+\*([^*]+)\*;\s*(.*)/);
    if (m) {
      const nameRole = m[1];
      const quote = t(m[2]);
      // Split on first comma or period separating name from role
      // e.g. "Rina Sari, Desainer Grafis" → name="Rina Sari", role="Desainer Grafis"
      const sepMatch = nameRole.match(/^([^,\.]+)[,\.]\s+(.*)/);
      let name: string;
      let role: string;
      if (sepMatch) {
        name = t(sepMatch[1]);
        role = t(sepMatch[2]);
      } else {
        name = t(nameRole);
        role = '';
      }
      results.push({ name, role, quote });
    }
  }
  return results;
}

/**
 * Parse news cards (numbered list):
 *   1. *date*, **title**, url
 */
function parseNewsCards(text: string): NewsCard[] {
  const results: NewsCard[] = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*\d+\.\s+\*([^*]+)\*,\s+\*\*([^*]+)\*\*,\s+(https?:\/\/\S+)/);
    if (m) results.push({ date: t(m[1]), title: t(m[2]), url: t(m[3]) });
  }
  return results;
}

/**
 * Parse event cards (numbered list):
 *   1. *name*, **date**, url
 * Handles invisible Unicode characters (e.g. U+2063) after the name.
 */
function parseEventCards(text: string): EventCard[] {
  const results: EventCard[] = [];
  for (const line of text.split('\n')) {
    // Strip invisible Unicode chars before the comma
    const cleaned = line.replace(/[\u2063\u200B\u200C\u200D\uFEFF]/g, '');
    const m = cleaned.match(/^\s*\d+\.\s+\*([^*]+)\*,\s+\*\*([^*]+)\*\*,\s+(https?:\/\/\S+)/);
    if (m) results.push({ name: t(m[1]), date: t(m[2]), url: t(m[3]) });
  }
  return results;
}

// --- Main parser ---

export function loadContent(): SiteContent {
  const filePath = path.join(process.cwd(), 'public/contents/Beranda-page.md');
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    throw new Error(`content-loader: cannot read ${filePath}: ${err}`);
  }

  const sections = splitSections(raw);

  // --- Hero ---
  const heroBody = sections.get('Hero section') ?? '';
  const heroSubs = splitAllSubsections(heroBody);
  let heroTitle = '';
  let heroSubtitle = '';
  for (const [key] of heroSubs) {
    if (key.startsWith('Hero title:')) heroTitle = extractAfterColon(key);
    else if (key.startsWith('Hero subtitle:')) heroSubtitle = extractAfterColon(key);
  }

  // --- About ---
  const aboutBody = sections.get('About section') ?? '';
  const aboutSubs = splitAllSubsections(aboutBody);
  let aboutTitle = '';
  let aboutSubtitle = '';
  let valueCards: ValueCard[] = [];
  let summaryTitle = '';
  let summaryDescription = '';
  for (const [key, val] of aboutSubs) {
    if (key.startsWith('About title:')) {
      aboutTitle = extractAfterColon(key);
    } else if (key.startsWith('About subtitle:')) {
      aboutSubtitle = extractAfterColon(key);
    } else if (key.startsWith('Card bits')) {
      valueCards = parseBulletCards(val);
    } else if (key.startsWith('Brief summary title:')) {
      summaryTitle = extractAfterColon(key);
    } else if (key.startsWith('Brief summary subtitle:')) {
      summaryDescription = extractAfterColon(key);
    }
  }

  // --- Service Brief ---
  const svcBriefBody = sections.get('Service section (brief info)') ?? '';
  const svcBriefSubs = splitAllSubsections(svcBriefBody);
  let serviceBriefTitle = '';
  let serviceBriefCards: ServiceCard[] = [];
  for (const [key, val] of svcBriefSubs) {
    if (key.startsWith('Service section title:')) {
      serviceBriefTitle = extractAfterColon(key);
    } else if (key.startsWith('Service section cards')) {
      serviceBriefCards = parseBulletCards(val);
    }
  }

  // --- Service Full ---
  const svcFullBody = sections.get('Service section (complete info)') ?? '';
  const svcFullSubs = splitAllSubsections(svcFullBody);
  let serviceFull_title = '';
  let serviceFull_subtitle = '';
  let serviceFullCards: ServiceCard[] = [];
  let metricsTitle = '';
  let metricsDescription = '';
  let metricItems: MetricItem[] = [];
  let achievementCards: AchievementCard[] = [];
  for (const [key, val] of svcFullSubs) {
    if (key.startsWith('Service section title:')) {
      serviceFull_title = extractAfterColon(key);
    } else if (key.startsWith('Service section subtitle:')) {
      serviceFull_subtitle = extractAfterColon(key);
    } else if (key.startsWith('Service info cards')) {
      serviceFullCards = parseNumberedCards(val);
    } else if (key.startsWith('Second service section title:')) {
      metricsTitle = extractAfterColon(key);
    } else if (key.startsWith('Second service section description:')) {
      metricsDescription = extractAfterColon(key);
    } else if (key.startsWith('achievment metric card') || key.startsWith('achievement metric card')) {
      metricItems = parseMetrics(val);
    } else if (key.startsWith('achievement news card bits')) {
      achievementCards = parseNumberedCards(val).map(c => ({ title: c.name, description: c.description }));
    }
  }

  // --- Client page (marquee, testimonials, news) ---
  const clientBody = sections.get('Client page') ?? '';
  const clientSubs = splitAllSubsections(clientBody);
  let marqueeTitle = '';
  let marqueeDescription = '';
  let testimonials: TestimonialCard[] = [];
  let news: NewsCard[] = [];
  for (const [key, val] of clientSubs) {
    if (key.startsWith('Client page title:')) {
      marqueeTitle = extractAfterColon(key);
    } else if (key.startsWith('Client page description:')) {
      marqueeDescription = extractAfterColon(key);
    } else if (key.startsWith('User review cards')) {
      testimonials = parseTestimonials(val);
    } else if (key.startsWith('News section cards')) {
      news = parseNewsCards(val);
    }
  }

  // --- Events ---
  const eventsBody = sections.get('list of events section') ?? '';
  const eventsSubs = splitAllSubsections(eventsBody);
  let events: EventCard[] = [];
  for (const [key, val] of eventsSubs) {
    if (key.startsWith('event cards')) {
      events = parseEventCards(val);
    }
  }

  // Sort events newest to oldest
  events.sort((a, b) => {
    const da = parseIndonesianDate(a.date);
    const db = parseIndonesianDate(b.date);
    return db.getTime() - da.getTime();
  });

  return {
    hero: { title: heroTitle, subtitle: heroSubtitle },
    about: {
      title: aboutTitle,
      subtitle: aboutSubtitle,
      valueCards,
      summaryTitle,
      summaryDescription,
    },
    serviceBrief: { title: serviceBriefTitle, cards: serviceBriefCards },
    serviceFull: { title: serviceFull_title, subtitle: serviceFull_subtitle, cards: serviceFullCards },
    metrics: {
      title: metricsTitle,
      description: metricsDescription,
      metrics: metricItems,
      achievementCards,
    },
    marquee: { title: marqueeTitle, description: marqueeDescription },
    testimonials,
    news,
    events,
  };
}

export default loadContent();
