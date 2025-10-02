import React, { useState } from "react";

const MAX_CHARS = 25;

const QuestionTitle = ({ onChange }) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const trimToCharLimit = (str) => str.slice(0, MAX_CHARS);

  const handleTitleChange = (e) => {
    const input = e.target.value;
    const trimmed = trimToCharLimit(input);
    setTitle(trimmed);
    onChange?.({ title: trimmed, question });
  };

  const handleQuestionChange = (e) => {
    const input = e.target.value;
    const trimmed = trimToCharLimit(input);
    setQuestion(trimmed);
    onChange?.({ title, question: trimmed });
  };

  return (
    <div className="mx-auto md:p-20 p-6 space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-indigo-600 tracking-tight">
        🧠 Tentukan Judul & Pertanyaan untuk seseorang yang akan kamu kirimkan
      </h2>

      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul 📌 (maks. {MAX_CHARS} huruf)
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Untuk Kamu"
            className="input w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg placeholder-gray-400 shadow-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pertanyaan 💬 (maks. {MAX_CHARS} huruf)
          </label>
          <input
            name="question"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Mau isi nama dulu atau langsung aja?"
            className="input w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 text-base shadow-sm transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionTitle;
