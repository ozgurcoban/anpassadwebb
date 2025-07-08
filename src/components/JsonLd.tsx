import Script from 'next/script';

interface ArticleJsonLdProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  keywords?: string[];
}

export function ArticleJsonLd({
  title,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
  keywords,
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'Anpassad Webb',
      logo: {
        '@type': 'ImageObject',
        url: 'https://anpassadwebb.se/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://anpassadwebb.se${url}`,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: `https://anpassadwebb.se${image}`,
      },
    }),
    ...(keywords && { keywords: keywords.join(', ') }),
  };

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}

interface WebSiteJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function WebSiteJsonLd({ name, description, url }: WebSiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blogg?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}

interface OrganizationJsonLdProps {
  name: string;
  description: string;
  url: string;
  email: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
}

export function OrganizationJsonLd({
  name,
  description,
  url,
  email,
  address,
}: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    description,
    url,
    email,
    image: 'https://anpassadwebb.se/logo.png',
    logo: 'https://anpassadwebb.se/logo.png',
    priceRange: '$$',
    areaServed: [
      {
        '@type': 'City',
        name: 'Uppsala',
      },
      {
        '@type': 'State',
        name: 'Uppsala län',
      },
      {
        '@type': 'Country',
        name: 'Sverige',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email,
      contactType: 'customer service',
      availableLanguage: ['Swedish', 'English'],
    },
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    sameAs: [
      'https://www.linkedin.com/company/anpassadwebb',
      'https://www.facebook.com/anpassadwebb',
    ],
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}