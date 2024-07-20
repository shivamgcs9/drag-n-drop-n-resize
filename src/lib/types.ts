export interface CanvasItem {
  id: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  imageSrc: string | null;
  text: string;
}

export interface CanvasContextType {
  items: CanvasItem[];
  handleDrop: (item: any, offset: { x: number; y: number }) => void;
  updateItemPosition: (id: number, x: number, y: number) => void;
  updateItemSize: (id: number, width: number | string, height: number | string, x: number, y: number) => void;
  handleSave: () => void;
  handleImageUpload: (id: number, imageSrc: string) => void;
  handleTextChange: (id: number, text: string) => void;
}

export interface CanvasProviderProps {
  project: string;
  children: React.ReactNode;
}
