import React, { useState, useEffect } from "react";
import SectionForm from "./SectionForm";

const SectionInput = ({ onChange }) => {
  const [sectionCount, setSectionCount] = useState(3);
  const [data, setData] = useState([]);

  useEffect(() => {
    onChange?.(data);
  }, [data, onChange]);

  const handleSectionChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 8) value = 8;
    if (value < 1) value = 1;
    setSectionCount(value);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <label className="block mb-2 font-medium">Jumlah Section</label>
        <input
          type="number"
          min={1}
          max={8}
          value={sectionCount}
          onChange={handleSectionChange}
          className="input px-4 py-2 border rounded-md"
        />
        <p className="text-sm text-gray-500 mt-1">Maksimal 8 section.</p>
      </div>

      <SectionForm count={sectionCount} onChange={setData} />
    </div>
  );
};

export default SectionInput;
