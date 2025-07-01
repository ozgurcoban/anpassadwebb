import { ZoomSettings } from './types';

export const ZOOM_SETTINGS: ZoomSettings = {
  minScale: 0.5,
  maxScale: 4,
  scaleStep: 0.25,
};

export const ANIMATION_DURATIONS = {
  toolbarHideDelay: 4000,
  imageLoadDelay: 100,
} as const;

export const INTERACTION_THRESHOLDS = {
  minWheelDelta: 10,
  clickDetectionThreshold: 10, // Increased for better mobile touch detection
  dragDetectionThreshold: 8, // Increased for mobile
  doubleTapDelay: 400, // Increased for better mobile UX
  minPinchDistance: 10,
  touchInteractionCooldown: 500, // Cooldown after touch interactions
  zoomActionCooldown: 300, // General zoom action cooldown
  zoomAnimationDuration: 300, // Duration of zoom animation - must match CSS transition
} as const;

export const UI_TEXT = {
  close: 'Stäng (Esc)',
  zoomOut: 'Zooma ut (-)',
  zoomIn: 'Zooma in (+)',
  fitToScreen: 'Anpassa till skärm (F)',
  keyboardShortcuts: 'Tangentbordsgenvägar:',
  scrollZoom: 'Scroll/+/- för zoom',
  dragToMove: 'Dra för att flytta',
  fitToScreenShortcut: 'F/R för anpassa till skärm',
  defaultTitle: 'Image Zoom Modal',
} as const;