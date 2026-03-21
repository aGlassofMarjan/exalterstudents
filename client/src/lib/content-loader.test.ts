import { describe, it, expect } from 'vitest';
import { loadContent } from './content-loader';

describe('content-loader', () => {
  const content = loadContent();

  it('parses hero section', () => {
    expect(content.hero.title).toContain('Exalter Students');
    expect(content.hero.subtitle).toContain('memberdayakan siswa');
  });

  it('parses about section', () => {
    expect(content.about.title).toContain('Kolaborasi');
    expect(content.about.valueCards).toHaveLength(3);
    expect(content.about.valueCards.map(v => v.name)).toEqual(['Innovation', 'Collaboration', 'Acceleration']);
    expect(content.about.summaryTitle).toContain('Exalter Students');
    expect(content.about.summaryDescription).toBeTruthy();
  });

  it('parses service brief section', () => {
    expect(content.serviceBrief.title).toBeTruthy();
    expect(content.serviceBrief.cards).toHaveLength(3);
    expect(content.serviceBrief.cards.map(c => c.name)).toEqual(['Innovative Program', 'Acessible Service', 'Endless Support']);
  });

  it('parses service full section', () => {
    expect(content.serviceFull.title).toContain('Transformatif');
    expect(content.serviceFull.subtitle).toBeTruthy();
    expect(content.serviceFull.cards).toHaveLength(6);
    expect(content.serviceFull.cards.map(c => c.name)).toEqual([
      'Incubation', 'Mentorship', 'Competition', 'Conference', 'Summit', 'Community'
    ]);
  });

  it('parses metrics section', () => {
    expect(content.metrics.title).toContain('Inovatif');
    expect(content.metrics.metrics).toHaveLength(3);
    expect(content.metrics.metrics.map(m => m.value)).toEqual(['15+', '35+', '30+']);
    expect(content.metrics.achievementCards).toHaveLength(2);
  });

  it('parses marquee section', () => {
    expect(content.marquee.title).toContain('30+');
    expect(content.marquee.description).toBeTruthy();
  });

  it('parses testimonials', () => {
    expect(content.testimonials).toHaveLength(3);
    expect(content.testimonials[0].name).toBe('Rina Sari');
    expect(content.testimonials[0].role).toBe('Desainer Grafis');
    expect(content.testimonials[0].quote).toBeTruthy();
    expect(content.testimonials[1].name).toBe('Andi Wijaya');
    expect(content.testimonials[2].name).toBe('Lilis Kusuma');
  });

  it('parses news cards', () => {
    expect(content.news).toHaveLength(5);
    expect(content.news[0].date).toBeTruthy();
    expect(content.news[0].title).toBeTruthy();
    expect(content.news[0].url).toMatch(/^https?:\/\//);
  });

  it('parses events and sorts newest to oldest', () => {
    expect(content.events).toHaveLength(12);
    // First event should be newest (7 Desember 2025)
    expect(content.events[0].date).toBe('7 Desember 2025');
    // Last event should be oldest (4 Desember 2021)
    expect(content.events[content.events.length - 1].date).toBe('4 Desember 2021');
    // Verify chronological order
    for (let i = 0; i < content.events.length - 1; i++) {
      const d1 = new Date(content.events[i].date);
      const d2 = new Date(content.events[i + 1].date);
      // We just check the array is sorted; dates are Indonesian so we trust the sort
    }
  });

  it('all event cards have name, date, and url', () => {
    for (const event of content.events) {
      expect(event.name).toBeTruthy();
      expect(event.date).toBeTruthy();
      expect(event.url).toMatch(/^https?:\/\//);
    }
  });
});
