"use client";
import { useEffect, useState } from "react";
import ResizableBox from "@/components/ResizableBox";
import styles from "@/app/projects/[project]/singleProject.module.css";
import { CanvasItem } from "@/lib/types";

interface PreviewPageProps {
  params: { project: string };
}

const PreviewPage: React.FC<PreviewPageProps> = ({ params }) => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const { project } = params;

  // get the items from the localStorage if found any
  useEffect(() => {
    const savedItems = JSON.parse(
      localStorage.getItem(`canvas-${project}`) || "[]"
    );
    setItems(savedItems);
  }, [project]);

  return (
    <div className={styles.container}>
      <h1>Preview</h1>
      <div className={styles.dropContainer}>
        {items.map((item) => (
          <ResizableBox
            key={item.id}
            position={item.position}
            size={item.size}
            imageSrc={item.imageSrc}
            onDragStop={() => {}}
            onResizeStop={() => {}}
            previewMode={true} // identify the mode of the canvas
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "lightblue",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.imageSrc ? (
                <img
                  src={item.imageSrc}
                  alt="Uploaded"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>Resizable</span>
              )}
              <p>{item.text}</p>
            </div>
          </ResizableBox>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;
