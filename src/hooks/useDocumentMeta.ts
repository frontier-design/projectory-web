import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, SITE_URL, type PageMeta } from '@/config/seo';

// Creates the tag on first use, then updates it in place. Reusing the same
// element on every navigation is what keeps repeated route changes from
// appending duplicate tags to <head>.
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${CSS.escape(key)}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * A small hook rather than a metadata library.
 */
export function useDocumentMeta({ title, description }: PageMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    // Canonical is the apex host. The trailing slash is dropped so that "/"
    // canonicalises to the bare origin rather than "https://projectory.live/".
    const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname.replace(/\/$/, '')}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertCanonical(canonical);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonical);

    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
  }, [title, description, pathname]);
}
