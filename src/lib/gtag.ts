export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Initialize gtag if it doesn't exist
export const initializeGtag = () => {
  if (typeof window === 'undefined') return
  
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function() {
      window.dataLayer?.push(arguments)
    }
  }
  window.gtag('js', new Date())
  if (GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID)
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) {
    console.warn('GA4: No tracking ID configured')
    return
  }
  
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('GA4: gtag not initialized')
    return
  }
  
  try {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  } catch (error) {
    console.error('GA4: Error tracking pageview', error)
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (!GA_TRACKING_ID) {
    console.warn('GA4: No tracking ID configured')
    return
  }
  
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('GA4: gtag not initialized. Event not tracked:', { action, category, label, value })
    return
  }
  
  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  } catch (error) {
    console.error('GA4: Error tracking event', error)
  }
}

// Contact form submission event
export const trackContactFormSubmission = (packageType: string) => {
  event({
    action: 'submit_form',
    category: 'engagement',
    label: `contact_form_${packageType}`,
  })
}

// Package selection event
export const trackPackageSelection = (packageName: string) => {
  event({
    action: 'select_package',
    category: 'engagement',
    label: packageName,
  })
}

// CTA button click event
export const trackCTAClick = (buttonName: string, location: string) => {
  event({
    action: 'click_cta',
    category: 'engagement',
    label: `${buttonName}_${location}`,
  })
}

// Scroll depth tracking
export const trackScrollDepth = (percentage: number) => {
  event({
    action: 'scroll',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}

// External link click
export const trackExternalLink = (url: string) => {
  event({
    action: 'click',
    category: 'outbound',
    label: url,
  })
}