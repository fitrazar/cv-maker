import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

// 🔧 Fungsi konversi file ke base64
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const SectionForm = ({ count = 1, onChange }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const initial = Array.from({ length: count }, () => ({
      word: "",
      image: null,
      imageType: null,
      preview: "",
    }));
    setSections(initial);
  }, [count]);

  const handleWordChange = (i, value) => {
    const limitedValue = value.slice(0, 30);
    const newSections = [...sections];
    newSections[i].word = limitedValue;
    setSections(newSections);
    onChange?.(newSections);
  };

  const handleImageChange = async (i, { type, file, url }) => {
    const newSections = [...sections];
    let base64 = "";

    if (type === "file" && file) {
      base64 = await fileToBase64(file);
      newSections[i].image = file;
    } else if (type === "preset" && url) {
      const res = await fetch(url);
      const blob = await res.blob();
      base64 = await fileToBase64(blob);
      newSections[i].image = url;
    }

    newSections[i].imageType = type;
    newSections[i].preview = base64;
    setSections(newSections);
    onChange?.(newSections);
  };

  return (
    <div className="space-y-6">
      {sections.map((section, i) => (
        <div
          key={i}
          className="p-5 border rounded-xl shadow-md bg-white space-y-4 transition-all hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-indigo-600">
            Section {i + 1}
          </h3>

          <input
            type="text"
            placeholder="Masukkan kata atau kalimat (30 karakter)"
            value={section.word}
            maxLength={30}
            onChange={(e) => handleWordChange(i, e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* <ImageSelector
            onSelect={(data) => handleImageChange(i, data)}
            selectedImage={
              section.imageType === "preset" ? section.image : null
            }
          /> */}
          <ImageSelector
            onSelect={(data) => handleImageChange(i, data)}
            selectedImage={section.image}
            imageType={section.imageType}
          />

          {section.preview && (
            <img
              src={section.preview}
              alt={`Preview ${i}`}
              className="w-28 h-28 rounded-xl object-cover border mx-auto"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const ImageSelector = ({ onSelect, selectedImage, imageType }) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const images = Array.from(
    { length: 53 },
    (_, i) => `/pentol/pentol (${i + 1}).gif`
  );

  const isValidImage = (file) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    const maxSize = 1 * 1024 * 1024;
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
      setFileName(file.name);
      onSelect({ type: "file", file });
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isValidImage(file)) {
      setFileName(file.name);
      onSelect({ type: "file", file });
    }
  };

  const handleImageClick = (img) => {
    setFileName(null); // reset filename
    onSelect({ type: "preset", url: img });
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-gray-300 p-4 rounded-xl text-center transition hover:border-indigo-400 bg-white shadow-sm cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current.click()}
      >
        <p className="text-sm text-gray-500">
          Drag & drop atau klik untuk upload
        </p>
        {imageType === "file" && fileName && (
          <p className="mt-2 text-green-600 text-sm">📁 {fileName}</p>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>

      <div className="text-center text-gray-400 text-sm mt-2">
        atau pilih dari gambar dibawah ini 👇
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 mt-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl overflow-hidden border-2 cursor-pointer ${
              imageType === "preset" && selectedImage === img
                ? "border-indigo-500"
                : "border-transparent"
            }`}
            onClick={() => handleImageClick(img)}
          >
            <img
              src={img}
              alt={`Pentol ${idx + 1}`}
              className="object-cover w-full h-auto hover:scale-105 transition-transform"
            />
            {imageType === "preset" && selectedImage === img && (
              <CheckCircle2 className="absolute top-2 right-2 text-indigo-500 bg-white rounded-full" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionForm;
