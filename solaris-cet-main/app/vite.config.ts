/**
 * SOLARIS CET - SEO Optimizer
 * Optimizare pentru motoarele de căutare și descoperire AI
 */

import { t } from '@/i18n/translations';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  url: string;
  image: string;
  language: string;
  type: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export class SEOOptimizer {
  private config: SEOConfig;
  private structuredData: StructuredData[] = [];

  constructor(config: Partial<SEOConfig> = {}) {
    this.config = {
      title: 'SOLARIS CET | Quantum AI Platform & CET Token',
      description: 'The first quantum-powered AI ecosystem on blockchain. Build, deploy, and monetize high-intelligence agents with CET tokens.',
      keywords: ['quantum AI', 'blockchain', 'CET token', 'artificial intelligence', 'machine learning', 'cryptocurrency', 'TON'],
      author: 'SOLARIS CET Team',
      url: 'https://solariscet.io',
      image: 'https://solariscet.io/og-image.png',
      language: 'en',
      type: 'website',
      ...config
    };
    
    this.initializeStructuredData();
  }

  private initializeStructuredData(): void {
    // Organization Schema
    this.structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SOLARIS CET',
      description: 'Quantum-powered AI platform on blockchain',
      url: this.config.url,
      logo: `${this.config.url}/logo.png`,
      sameAs: [
        'https://github.com/aamclaudiu-hash/solaris-cet',
        'https://twitter.com/solariscet',
        'https://t.me/solariscet'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@solariscet.io'
      }
    });

    // Product Schema
    this.structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'SOLARIS CET Platform',
      description: 'Quantum AI platform with CET token ecosystem',
      brand: {
        '@type': 'Brand',
        name: 'SOLARIS CET'
      },
      offers: {
        '@type': 'Offer',
        price: '0.001',
        priceCurrency: 'CET',
        availability: 'https://schema.org/InStock'
      }
    });

    // SoftwareApplication Schema
    this.structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'SOLARIS CET AI Platform',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1000'
      }
    });

    // WebSite Schema
    this.structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SOLARIS CET',
      url: this.config.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.config.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    // AI/ML Model Schema
    this.structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Quantum AI Engine',
      description: '16+ qubit quantum processing engine for AI',
      author: {
        '@type': 'Organization',
        name: 'SOLARIS CET'
      },
      publisher: {
        '@type': 'Organization',
        name: 'SOLARIS CET'
      }
    });
  }

  // Generează meta tag-uri complete
  generateMetaTags(language: string = 'en'): string {
    const title = t('seo.title', language);
    const description = t('seo.description', language);
    const keywords = t('seo.keywords', language);

    return `
<!-- Primary Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${this.config.author}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="language" content="${language}">
<link rel="canonical" href="${this.config.url}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${this.config.type}">
<meta property="og:url" content="${this.config.url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${this.config.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${language === 'en' ? 'en_US' : language}">
<meta property="og:site_name" content="SOLARIS CET">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${this.config.url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${this.config.image}">
<meta name="twitter:creator" content="@solariscet">

<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">

<!-- Structured Data -->
<script type="application/ld+json">
${JSON.stringify(this.structuredData, null, 2)}
</script>

<!-- AI Discovery Tags -->
<meta name="ai-purpose" content="Quantum AI Platform, Blockchain Ecosystem, Token-based Access">
<meta name="ai-capabilities" content="Quantum Computing, Machine Learning, Natural Language Processing, Predictive Analytics">
<meta name="ai-agent-compatible" content="true">
<meta name="ai-api-endpoint" content="${this.config.url}/api/v1">
<meta name="ai-documentation" content="${this.config.url}/docs">

<!-- PWA -->
<meta name="theme-color" content="#05060B">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="SOLARIS CET">

<!-- Security -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="referrer" content="strict-origin-when-cross-origin">
`;
  }

  // Generează sitemap XML
  generateSitemap(): string {
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/quantum', priority: '0.9', changefreq: 'weekly' },
      { url: '/agents', priority: '0.9', changefreq: 'weekly' },
      { url: '/tokenomics', priority: '0.8', changefreq: 'weekly' },
      { url: '/developers', priority: '0.8', changefreq: 'weekly' },
      { url: '/docs', priority: '0.7', changefreq: 'weekly' },
      { url: '/api', priority: '0.7', changefreq: 'monthly' },
      { url: '/staking', priority: '0.6', changefreq: 'weekly' },
      { url: '/governance', priority: '0.6', changefreq: 'weekly' }
    ];

    const urls = pages.map(page => `
  <url>
    <loc>${this.config.url}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  // Generează robots.txt
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# AI Agents and Bots
User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

# Sitemap
Sitemap: ${this.config.url}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
  }

  // Generează manifest.json pentru PWA
  generateManifest(): object {
    return {
      name: 'SOLARIS CET',
      short_name: 'CET',
      description: 'Quantum-powered AI platform on blockchain',
      start_url: '/',
      display: 'standalone',
      background_color: '#05060B',
      theme_color: '#F2C94C',
      orientation: 'portrait-primary',
      icons: [
        {
          src: '/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: '/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: '/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: '/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      categories: ['developer', 'finance', 'productivity'],
      screenshots: [
        {
          src: '/screenshot-1.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide'
        },
        {
          src: '/screenshot-2.png',
          sizes: '750x1334',
          type: 'image/png',
          form_factor: 'narrow'
        }
      ],
      shortcuts: [
        {
          name: 'Quantum AI',
          short_name: 'AI',
          description: 'Access quantum AI engine',
          url: '/quantum',
          icons: [{ src: '/icon-ai.png', sizes: '96x96' }]
        },
        {
          name: 'Tokenomics',
          short_name: 'Tokens',
          description: 'View CET tokenomics',
          url: '/tokenomics',
          icons: [{ src: '/icon-token.png', sizes: '96x96' }]
        }
      ],
      related_applications: [],
      prefer_related_applications: false
    };
  }

  // Adaugă structured data pentru o pagină specifică
  addPageStructuredData(pageType: string, data: any): void {
    const pageData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': pageType,
      ...data
    };
    this.structuredData.push(pageData);
  }

  // Getters
  getConfig(): SEOConfig {
    return { ...this.config };
  }

  getStructuredData(): StructuredData[] {
    return [...this.structuredData];
  }

  // Update config
  updateConfig(updates: Partial<SEOConfig>): void {
    this.config = { ...this.config, ...updates };
  }
}

// Singleton instance
export const seoOptimizer = new SEOOptimizer();

export default SEOOptimizer;
