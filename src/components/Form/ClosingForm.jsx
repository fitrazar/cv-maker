import { fileToBase64 } from "@utils/funtion";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";

const ClosingForm = ({ onChange }) => {
  const [useWhatsapp, setUseWhatsapp] = useState(false);
  const [useCustom, setUseCustom] = useState(false);

  const [whatsappContact, setWhatsappContact] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  const [customMessage, setCustomMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

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

  const emitChange = (extra = {}) => {
    onChange?.({
      useWhatsapp,
      useCustom,
      whatsappContact: useWhatsapp ? whatsappContact : null,
      whatsappMessage: useWhatsapp ? whatsappMessage : null,
      customMessage: useCustom ? customMessage : null,
      image: selectedImage
        ? { type: "preset", url: selectedImage }
        : selectedFile
        ? { type: "file", name: selectedFile.name }
        : null,
      ...extra,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && isValidImage(file)) {
      const base64 = await fileToBase64(file);
      setSelectedFile(file);
      setSelectedImage(null);
      emitChange({ image: { type: "file", base64 } });
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isValidImage(file)) {
      const base64 = await fileToBase64(file);
      setSelectedFile(file);
      setSelectedImage(null);
      emitChange({ image: { type: "file", base64 } });
    }
  };

  const handleImageSelect = async (image) => {
    const base64 = await fetchImageAsBase64(image);
    setSelectedImage(image);
    setSelectedFile(null);
    emitChange({ image: { type: "preset", url: image, base64 } });
  };

  const fetchImageAsBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return await fileToBase64(blob);
  };

  // Automatically emit data on input toggle/change
  useEffect(() => {
    // Reset input saat tidak digunakan
    if (!useWhatsapp) {
      setWhatsappContact("");
      setWhatsappMessage("");
    }

    if (!useCustom) {
      setCustomMessage("");
      setSelectedFile(null);
      setSelectedImage(null);
    }

    emitChange();
  }, [useWhatsapp, useCustom]);

  // Validasi nomor WhatsApp
  useEffect(() => {
    if (useWhatsapp && whatsappContact && !/^628\d+$/.test(whatsappContact)) {
      toast.error("Nomor WhatsApp harus diawali dengan 628 dan hanya angka.");
    }
  }, [whatsappContact, useWhatsapp]);

  // Emit saat input diubah (selain useWhatsapp/useCustom toggle)
  useEffect(() => {
    emitChange();
  }, [whatsappContact, whatsappMessage, customMessage]);

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📝 Penutup</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={useWhatsapp}
            onChange={() => setUseWhatsapp(!useWhatsapp)}
            className="accent-green-500"
          />
          <span className="text-gray-700 font-medium">Tambahkan WhatsApp</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={useCustom}
            onChange={() => setUseCustom(!useCustom)}
            className="accent-blue-500"
          />
          <span className="text-gray-700 font-medium">Kustom</span>
        </label>
      </div>

      {useWhatsapp && (
        <div className="space-y-4 bg-green-50 p-4 rounded-xl border border-green-300">
          <h3 className="text-lg font-semibold text-green-700">
            📱 WhatsApp Kontak
          </h3>
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Kontak WhatsApp
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              value={whatsappContact}
              onChange={(e) => setWhatsappContact(e.target.value)}
              placeholder="628xxxxxxxxx"
            />
          </div>
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Pesan WhatsApp
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              rows={3}
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              placeholder="Makasih Sayang...."
            />
          </div>
        </div>
      )}

      {useCustom && (
        <div className="space-y-4 bg-blue-50 p-4 rounded-xl border border-blue-300">
          <h3 className="text-lg font-semibold text-blue-700">
            🎨 Kustom Pesan
          </h3>
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              Pesan
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Cepet sembuh ya..."
            />
          </div>

          <div
            className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center hover:border-indigo-400 bg-white shadow-md cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current.click()}
          >
            <p className="text-gray-600">
              🚀 Drag & Drop atau Klik untuk Upload
            </p>
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

          <div className="text-center text-gray-400 text-sm">
            atau pilih dari gambar yang tersedia 👇
          </div>

          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 mt-3">
            {images.map((src, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl overflow-hidden border-2 cursor-pointer ${
                  selectedImage === src
                    ? "border-indigo-500"
                    : "border-transparent"
                }`}
                onClick={() => handleImageSelect(src)}
              >
                <img
                  src={src}
                  alt={`pentol ${idx + 1}`}
                  className="object-cover w-full h-auto hover:scale-105 transition-transform"
                />
                {selectedImage === src && (
                  <CheckCircle2 className="absolute top-2 right-2 text-indigo-500 bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>

          {(selectedFile || selectedImage) && (
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <img
                src={
                  selectedImage
                    ? selectedImage
                    : selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : ""
                }
                alt="Preview"
                className="rounded-xl mx-auto w-48 h-48 object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClosingForm;
