export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
export const GA_DEBUG_MODE = process.env.NEXT_PUBLIC_GA_DEBUG === 'true'

// Check if analytics cookies are allowed
const isAnalyticsAllowed = () => {
  if (typeof window === 'undefined') return false
  
  try {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) return false
    
    const parsed = JSON.parse(consent)
    return parsed?.hasConsented && parsed?.preferences?.analytics === true
  } catch (error) {
    console.error('Error checking cookie consent:', error)
    return false
  }
}

// Initialize gtag if it doesn't exist and consent is given
export const initializeGtag = () => {
  if (typeof window === 'undefined') return
  
  // Check for analytics consent
  if (!isAnalyticsAllowed()) {
    console.log('GA4: Analytics cookies not allowed')
    return
  }
  
  // Only initialize the gtag function if it doesn't exist
  // The actual config is handled by the Script tag in GoogleAnalyticsConsent
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function() {
      window.dataLayer?.push(arguments)
    }
  }
  
  if (GA_DEBUG_MODE) {
    console.log('GA4: Initialized gtag function (config handled by Script tag)')
    console.log('GA4: Using tracking ID:', GA_TRACKING_ID)
  }
}

// Disable GA4 (when consent is revoked)
export const disableGtag = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return
  
  // Set the disable flag
  (window as any)[`ga-disable-${GA_TRACKING_ID}`] = true
  
  // Clear existing data
  window.dataLayer = []
  
  console.log('GA4: Disabled')
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) {
    console.warn('GA4: No tracking ID configured')
    return
  }
  
  if (!isAnalyticsAllowed()) {
    if (GA_DEBUG_MODE) {
      console.log('GA4 Debug: Pageview blocked (no consent):', url)
    }
    return // Silently skip if no consent
  }
  
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('GA4: gtag not initialized')
    return
  }
  
  try {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
    if (GA_DEBUG_MODE) {
      console.log('GA4 Debug: Pageview tracked:', {
        tracking_id: GA_TRACKING_ID,
        page_path: url,
        dataLayer_length: window.dataLayer?.length
      })
    }
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
  
  if (!isAnalyticsAllowed()) {
    if (GA_DEBUG_MODE) {
      console.log('GA4 Debug: Event blocked (no consent):', { action, category, label, value })
    }
    return // Silently skip if no consent
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
    if (GA_DEBUG_MODE) {
      console.log('GA4 Debug: Event tracked:', {
        tracking_id: GA_TRACKING_ID,
        action,
        category,
        label,
        value,
        dataLayer_length: window.dataLayer?.length
      })
    }
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