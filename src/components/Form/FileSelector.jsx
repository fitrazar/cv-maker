import React, { useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { fileToBase64 } from "@utils/funtion";
import toast from "react-hot-toast";

const FileSelector = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  const bgImages = [1, 2, 3, 4, 5].map((num) => `/bg/bg (${num}).jpg`);

  const isValidImage = (file) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format gambar harus PNG, JPG, JPEG, atau GIF.");
      return false;
    }
    if (file.size > maxSize) {
      toast.error("Ukuran gambar maksimal 1MB.");
      return false;
    }
    return true;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && isValidImage(file)) {
      const base64 = await fileToBase64(file);
      setSelectedFile(file);
      setSelectedImage(null); // reset selected image
      onChange?.({ type: "file", base64 });
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isValidImage(file)) {
      const base64 = await fileToBase64(file);
      setSelectedFile(file);
      setSelectedImage(null);
      onChange?.({ type: "file", base64 });
    }
  };

  const handleImageSelect = async (image) => {
    const base64 = await fetchImageAsBase64(image);
    setSelectedImage(image);
    setSelectedFile(null); // reset uploaded file
    onChange?.({ type: "preset", url: base64 });
  };

  const fetchImageAsBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return await fileToBase64(blob);
  };

  return (
    <div className="max-w-xl mx-auto md:p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">📁 Pilih Gambar</h2>

      {/* Drag & Drop Area */}
      <div
        className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center transition-all duration-200 hover:border-indigo-400 bg-white shadow-md cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current.click()}
      >
        <p className="text-gray-600">🚀 Drag & Drop atau Klik untuk Upload</p>
        {selectedFile && (
          <p className="mt-2 text-sm text-green-600">
            File dipilih: {selectedFile.name}
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Divider */}
      <div className="text-center text-gray-400 text-sm">
        atau pilih dari gambar yang tersedia 👇
      </div>

      {/* Preset Image Gallery */}
      <div className="grid grid-cols-3 gap-4">
        {bgImages.map((src, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer
              ${
                selectedImage === src
                  ? "border-indigo-500"
                  : "border-transparent"
              }
            `}
            onClick={() => handleImageSelect(src)}
          >
            <img
              src={src}
              alt={`bg ${idx + 1}`}
              className="object-cover w-full h-24 hover:scale-105 transition-transform duration-200"
            />
            {selectedImage === src && (
              <CheckCircle2 className="absolute top-2 right-2 text-indigo-500 bg-white rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Selected Preview */}
      <div className="mt-6 text-center">
        {(selectedFile || selectedImage) && (
          <>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <img
              src={
                selectedImage
                  ? selectedImage
                  : URL.createObjectURL(selectedFile)
              }
              alt="Preview"
              className="rounded-xl mx-auto w-48 h-48 object-cover shadow-lg"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FileSelector;
