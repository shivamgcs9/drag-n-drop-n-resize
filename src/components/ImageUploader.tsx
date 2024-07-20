import React, { useState, ChangeEvent } from "react";

interface ImageUploaderProps {
  id: number;
  onUpload: (imageSrc: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, onUpload }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;
        setImage(imageSrc);
        onUpload(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label htmlFor={`img-${id}`}>Click to Add image</label>
      <input
        type="file"
        id={`img-${id}`}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImageUploader;
