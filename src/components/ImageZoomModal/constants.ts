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
  clickDetectionThreshold: 5,
  dragDetectionThreshold: 5,
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