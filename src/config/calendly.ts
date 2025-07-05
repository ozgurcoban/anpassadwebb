// Calendly Configuration
// Update this file with your actual Calendly details

export const calendlyConfig = {
  // Your Calendly event URL
  // Find this in your Calendly dashboard under "Event Types"
  // Example: https://calendly.com/your-username/30min
  eventUrl: 'https://calendly.com/your-calendly-link',
  
  // Optional: Customize the appearance
  pageSettings: {
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: '9333ea', // Purple to match your brand
    textColor: '1f2937'
  },
  
  // Optional: Default prefill values
  prefill: {
    // email: '',
    // firstName: '',
    // lastName: '',
    // customAnswers: {}
  }
};

// Export for use in components
export const CALENDLY_URL = calendlyConfig.eventUrl;