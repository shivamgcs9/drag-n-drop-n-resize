"use client";
import { useDrop, DropTargetMonitor } from "react-dnd";
import styles from "@/app/projects/[project]/singleProject.module.css";
import { useRef } from "react";

interface DropContainerProps {
  onDrop: (item: any, offset: { x: number; y: number }) => void;
  children: React.ReactNode;
}

const DropContainer: React.FC<DropContainerProps> = ({ onDrop, children }) => {
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item: any, monitor: DropTargetMonitor) => {
      const canvasRect = dropRef.current?.getBoundingClientRect();
      const offset = monitor.getClientOffset();
      if (canvasRect && offset) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        onDrop(item, { x, y });
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        drop(node);
        dropRef.current = node;
      }}
      className={styles.dropContainer}
      style={{
        backgroundColor: isOver ? "lightgray" : "white",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default DropContainer;
