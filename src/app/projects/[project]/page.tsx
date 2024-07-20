"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./singleProject.module.css";
import DraggableItem from "@/components/DraggableItem";
import DropContainer from "@/components/DropContainer";
import ResizableBox from "@/components/ResizableBox";
import ImageUploader from "@/components/ImageUploader";
import { CanvasProvider, useCanvas } from "@/context/CanvasContext";

const CanvasComponent: React.FC<{ project: string }> = ({ project }) => {
  const router = useRouter();
  const {
    items,
    handleDrop,
    updateItemPosition,
    updateItemSize,
    handleSave,
    handleImageUpload,
    handleTextChange,
  } = useCanvas();

  const handlePreview = () => {
    router.push(`${project}/preview`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <h1>Drag and Drop Interface</h1>
        <div className={styles.flexContainer}>
          <DraggableItem id="new-item" type="ITEM">
            <div className={styles.draggableItem}>Drag me</div>
          </DraggableItem>
        </div>
        <DropContainer onDrop={handleDrop}>
          <div className={styles.dropContainer}>
            {items.map((item) => (
              <ResizableBox
                key={item.id}
                position={item.position}
                size={item.size}
                imageSrc={item.imageSrc ?? undefined}
                onDragStop={(x, y) => updateItemPosition(item.id, x, y)}
                onResizeStop={(width, height, x, y) =>
                  updateItemSize(item.id, width, height, x, y)
                }
              >
                <div className={styles.resizableBox}>
                  {item.imageSrc ? (
                    <img src={item.imageSrc} alt="Uploaded" />
                  ) : (
                    <span>Resizable</span>
                  )}
                  {/* input to add the text  */}
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    placeholder="Add text"
                  />
                  {/* image uploader component */}
                  <ImageUploader
                    id={item.id}
                    onUpload={(imageSrc) =>
                      handleImageUpload(item.id, imageSrc)
                    }
                  />
                </div>
              </ResizableBox>
            ))}
          </div>
        </DropContainer>
        {/* Footer button for save and preview the canvas */}
        <div className={styles.buttonContainer}>
          <button onClick={handleSave}>Save</button>
          <button onClick={handlePreview}>Preview</button>
        </div>
      </div>
    </DndProvider>
  );
};

const SingleProject: React.FC<{ params: { project: string } }> = ({
  params,
}) => {
  const { project } = params;

  return (
    <CanvasProvider project={project}>
      <CanvasComponent project={project} />
    </CanvasProvider>
  );
};

export default SingleProject;
