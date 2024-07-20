import { useDrag, DragSourceMonitor } from "react-dnd";
import styles from "@/app/projects/[project]/singleProject.module.css";
import { useRef } from "react";

interface DraggableItemProps {
  id: string;
  type: string;
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  type,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const dragRef = useRef<HTMLDivElement>(null);
  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className={styles.draggableItem}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
