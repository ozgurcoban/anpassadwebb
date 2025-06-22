export interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface DragState {
  x: number;
  y: number;
  startX: number;
  startY: number;
}

export interface ZoomSettings {
  minScale: number;
  maxScale: number;
  scaleStep: number;
}

export interface UseImageZoomResult {
  scale: number;
  position: Position;
  zoomIn: () => void;
  zoomOut: () => void;
  fitToScreen: () => void;
  handleWheel: (e: React.WheelEvent) => void;
  updateImageTransform: (x: number, y: number, currentScale: number) => void;
}

export interface UseImageDragResult {
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
  handleMouseMoveOnContainer: () => void;
}

export interface UseToolbarVisibilityResult {
  isToolbarVisible: boolean;
  showToolbar: () => void;
}