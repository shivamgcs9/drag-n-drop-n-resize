import { Rnd } from "react-rnd";
import styles from "@/app/projects/[project]/singleProject.module.css";
import React from "react";

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface ResizableBoxProps {
  children: React.ReactNode;
  position: Position;
  size: Size;
  imageSrc?: string; // Optional, adjust if you use it
  onDragStop: (x: number, y: number) => void;
  onResizeStop: (
    width: string | number,
    height: string | number,
    x: number,
    y: number
  ) => void;
  previewMode?: boolean;
}

const ResizableBox: React.FC<ResizableBoxProps> = ({
  children,
  position,
  size,
  imageSrc,
  onDragStop,
  onResizeStop,
  previewMode = false,
}) => {
  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      disableDragging={previewMode}
      enableResizing={!previewMode}
      onDragStop={(e, d) => onDragStop(d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResizeStop(ref.style.width, ref.style.height, position.x, position.y);
      }}
    >
      <div className={styles.resizableBox}>{children}</div>
    </Rnd>
  );
};

export default ResizableBox;
