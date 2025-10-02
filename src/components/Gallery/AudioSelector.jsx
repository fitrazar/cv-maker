import React, { useRef, useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { fileToBase64 } from "@utils/funtion";
import toast from "react-hot-toast";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AudioSelector = ({ onChange }) => {
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  const presetAudios = [1, 2].map((num) => `/audio/audio (${num}).mp3`);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [base64, setBase64] = useState(null);
  const [startAt, setStartAt] = useState(0);

  const isValidAudio = (file) => {
    const allowedTypes = ["audio/mpeg"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format audio harus MP3.");
      return false;
    }
    if (file.size > maxSize) {
      toast.error("Ukuran audio maksimal 2MB.");
      return false;
    }
    return true;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && isValidAudio(file)) {
      const encoded = await fetchAudioAsBase64(file);
      setBase64(encoded);
      setSelectedFile(file);
      setSelectedAudio(null);
      onChange?.({ type: "file", base64: encoded, startAt });
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isValidAudio(file)) {
      const encoded = await fetchAudioAsBase64(file);
      setBase64(encoded);
      setSelectedFile(file);
      setSelectedAudio(null);
      onChange?.({ type: "file", base64: encoded, startAt });
    }
  };

  const handleSelectAudio = async (src) => {
    setBase64(await fetchAudioAsBase64(src));
    setSelectedAudio(src);
    setSelectedFile(null);
    onChange?.({ type: "preset", url: base64, startAt });
  };

  const fetchAudioAsBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return await fileToBase64(blob);
  };

  useEffect(() => {
    onChange?.(
      selectedAudio || selectedFile
        ? {
            type: selectedAudio ? "preset" : "file",
            file: selectedFile,
            url: base64,
            startAt,
          }
        : null
    );
  }, [startAt]);

  const getAudioSrc = () => {
    if (selectedAudio) return selectedAudio;
    if (selectedFile) return URL.createObjectURL(selectedFile);
    return null;
  };

  // Mulai dari waktu tertentu
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startAt;
    }
  }, [startAt, selectedAudio, selectedFile]);

  return (
    <div className="max-w-xl mx-auto md:p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">🎵 Pilih Audio</h2>

      {/* Dropzone */}
      <div
        className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center transition-all duration-200 hover:border-indigo-400 bg-white shadow-md cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
      >
        <p className="text-gray-600">
          🎧 Drag & Drop atau Klik untuk Upload Audio
        </p>
        {selectedFile && (
          <p className="mt-2 text-sm text-green-600">
            File dipilih: {selectedFile.name}
          </p>
        )}
        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Preset Audios */}
      <div className="text-center text-gray-400 text-sm">
        atau pilih dari audio yang tersedia 👇
      </div>
      <div className="grid grid-cols-2 gap-4">
        {presetAudios.map((src, idx) => (
          <div
            key={idx}
            className={`relative border-2 bg-pink-200 text-red-300 rounded-xl p-3 text-center cursor-pointer hover:border-indigo-300 transition-all ${
              selectedAudio === src ? "border-indigo-500" : "border-transparent"
            }`}
            onClick={() => handleSelectAudio(src)}
          >
            <p className="text-sm font-medium text-gray-700">Audio {idx + 1}</p>
            {selectedAudio === src && (
              <CheckCircle2 className="absolute top-2 right-2 text-indigo-500 bg-white rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Waktu mulai */}
      {(selectedFile || selectedAudio) && (
        <div className="space-y-2 text-center">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-600"
          >
            Mulai dari detik keberapa?
          </label>
          <input
            id="startTime"
            type="number"
            min={0}
            value={startAt}
            onChange={(e) => setStartAt(Number(e.target.value))}
            className="input px-3 py-2 rounded-lg border border-gray-300 w-32 text-center shadow-sm"
          />

          <input type="hidden" name="start_time" value={startAt} />
        </div>
      )}

      {/* Preview Audio */}
      {getAudioSrc() && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Preview Audio</h3>
          <AudioPlayer
            ref={audioRef}
            src={getAudioSrc()}
            onPlay={() => console.log("Playing")}
            onLoadedMetadata={(e) => {
              console.log(e.target);
              e.target.currentTime = startAt;
            }}
            style={{ borderRadius: "1rem", width: "250px", margin: "0 auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default AudioSelector;
