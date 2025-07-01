/**
 * Utility functions for device detection
 */

/**
 * Detects if the current device supports touch events
 * @returns true if the device has touch capabilities
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - Legacy API
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Detects if the event is from a touch interaction
 * @param event - The event to check
 * @returns true if the event originated from touch
 */
export function isTouchEvent(event: React.MouseEvent | React.TouchEvent): boolean {
  if ('touches' in event || 'changedTouches' in event) {
    return true;
  }
  
  // Check if it's a mouse event triggered by touch
  const mouseEvent = event as React.MouseEvent;
  return mouseEvent.nativeEvent && 'sourceCapabilities' in mouseEvent.nativeEvent
    ? (mouseEvent.nativeEvent as any).sourceCapabilities?.firesTouchEvents === true
    : false;
}