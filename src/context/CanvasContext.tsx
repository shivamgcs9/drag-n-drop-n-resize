// CanvasContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  CanvasItem,
  CanvasContextType,
  CanvasProviderProps,
} from "@/lib/types";

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider: React.FC<CanvasProviderProps> = ({
  project,
  children,
}) => {
  const [items, setItems] = useState<CanvasItem[]>([]);

  useEffect(() => {
    const savedItems = JSON.parse(
      localStorage.getItem(`canvas-${project}`) || "[]"
    );
    setItems(savedItems);
  }, [project]);

  const handleDrop = (item: any, offset: { x: number; y: number }) => {
    const newItem: CanvasItem = {
      id: Date.now(),
      position: { x: offset.x, y: offset.y },
      size: { width: 200, height: 200 },
      imageSrc: null,
      text: "",
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const updateItemPosition = (id: number, x: number, y: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, position: { x, y } } : item
      )
    );
  };

  const updateItemSize = (
    id: number,
    width: number,
    height: number,
    x: number,
    y: number
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, size: { width, height }, position: { x, y } }
          : item
      )
    );
  };

  const handleSave = () => {
    localStorage.setItem(`canvas-${project}`, JSON.stringify(items));
  };

  const handleImageUpload = (id: number, imageSrc: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, imageSrc } : item))
    );
  };

  const handleTextChange = (id: number, text: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  return (
    <CanvasContext.Provider
      value={{
        items,
        handleDrop,
        updateItemPosition,
        updateItemSize,
        handleSave,
        handleImageUpload,
        handleTextChange,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = (): CanvasContextType => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
