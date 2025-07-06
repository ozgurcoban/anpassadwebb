declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: Array<any>
  }
}

export {}