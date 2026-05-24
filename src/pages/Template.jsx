import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Template1 from "@components/Templates/Template1";

const STORAGE_KEY = "cv-maker-data";

const defaultData = {
  name: "",
  role: "",
  address: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  profile: "",
  expertise: [""],
  experience: [
    {
      title: "",
      category: "",
      location: "",
      from: "",
      to: "",
      description: [""],
    },
  ],
  education: [{ title: "", institution: "", location: "", from: "", to: "" }],
  certifications: [{ title: "", note: "", date: "" }],
  skills: [{ title: "", percent: 0 }],
};

const Template = () => {
  const { id } = useParams();

  // Load from localStorage on mount, fallback to defaultData
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultData;
    } catch {
      return defaultData;
    }
  });

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage full or unavailable — silently ignore
    }
  }, [data]);

  // ── basic field ──────────────────────────────────────────────────────────
  const handleChange = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // ── array of objects (experience, education, etc.) ───────────────────────
  const handleArrayChange = useCallback((section, index, field, value) => {
    setData((prev) => {
      const newArr = [...prev[section]];
      newArr[index] = { ...newArr[index], [field]: value };
      return { ...prev, [section]: newArr };
    });
  }, []);

  // ── nested array (description inside experience) ─────────────────────────
  const handleNestedArrayChange = useCallback(
    (section, index, subfield, subIndex, value) => {
      setData((prev) => {
        const newArr = prev[section].map((item, i) => {
          if (i !== index) return item;
          const newSub = [...item[subfield]];
          newSub[subIndex] = value;
          return { ...item, [subfield]: newSub };
        });
        return { ...prev, [section]: newArr };
      });
    },
    []
  );

  // ── add item ─────────────────────────────────────────────────────────────
  const addItem = useCallback((section, templateObj) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...templateObj }],
    }));
  }, []);

  // ── remove item (array of objects) ───────────────────────────────────────
  const removeItem = useCallback((section, index) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  }, []);

  // ── expertise (plain string array) ───────────────────────────────────────
  const handleExpertiseChange = useCallback((index, value) => {
    setData((prev) => {
      const newArr = [...prev.expertise];
      newArr[index] = value;
      return { ...prev, expertise: newArr };
    });
  }, []);

  const removeExpertise = useCallback((index) => {
    setData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index),
    }));
  }, []);

  // ── add description line inside experience ────────────────────────────────
  const addDescriptionLine = useCallback((expIndex) => {
    setData((prev) => {
      const newExp = prev.experience.map((item, i) => {
        if (i !== expIndex) return item;
        return { ...item, description: [...item.description, ""] };
      });
      return { ...prev, experience: newExp };
    });
  }, []);

  const removeDescriptionLine = useCallback((expIndex, descIndex) => {
    setData((prev) => {
      const newExp = prev.experience.map((item, i) => {
        if (i !== expIndex) return item;
        return {
          ...item,
          description: item.description.filter((_, j) => j !== descIndex),
        };
      });
      return { ...prev, experience: newExp };
    });
  }, []);

  // ── reset all ─────────────────────────────────────────────────────────────
  const handleReset = () => {
    if (window.confirm("Reset semua data? Tindakan ini tidak bisa dibatalkan.")) {
      localStorage.removeItem(STORAGE_KEY);
      setData(defaultData);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ════════════════════════════════ FORM ════════════════════════════════ */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Isi Data CV</h1>
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={handleReset}
          >
            Reset Data
          </button>
        </div>

        {/* ── Basic Info ── */}
        <div className="space-y-2">
          {[
            ["name", "Name"],
            ["role", "Role"],
            ["address", "Address"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["linkedin", "LinkedIn"],
            ["github", "GitHub"],
          ].map(([field, placeholder]) => (
            <input
              key={field}
              className="input input-bordered w-full"
              placeholder={placeholder}
              value={data[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          ))}
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Profile"
            value={data.profile}
            onChange={(e) => handleChange("profile", e.target.value)}
          />
        </div>

        {/* ── Expertise ── */}
        <Section title="Expertise">
          {data.expertise.map((exp, i) => (
            <div key={i} className="flex gap-2 my-1">
              <input
                className="input input-bordered flex-1"
                placeholder="Expertise"
                value={exp}
                onChange={(e) => handleExpertiseChange(i, e.target.value)}
              />
              {data.expertise.length > 1 && (
                <DeleteButton onClick={() => removeExpertise(i)} />
              )}
            </div>
          ))}
          <AddButton
            label="+ Add Expertise"
            onClick={() =>
              setData((prev) => ({
                ...prev,
                expertise: [...prev.expertise, ""],
              }))
            }
          />
        </Section>

        {/* ── Experience ── */}
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <div key={i} className="border p-3 mb-3 rounded relative">
              <SectionItemHeader
                label={`Experience ${i + 1}`}
                canDelete={data.experience.length > 1}
                onDelete={() => removeItem("experience", i)}
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Title"
                value={exp.title}
                onChange={(e) =>
                  handleArrayChange("experience", i, "title", e.target.value)
                }
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Category"
                value={exp.category}
                onChange={(e) =>
                  handleArrayChange("experience", i, "category", e.target.value)
                }
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Location"
                value={exp.location}
                onChange={(e) =>
                  handleArrayChange("experience", i, "location", e.target.value)
                }
              />
              <div className="flex gap-2">
                <input
                  className="input input-bordered w-full my-1"
                  placeholder="From"
                  value={exp.from}
                  onChange={(e) =>
                    handleArrayChange("experience", i, "from", e.target.value)
                  }
                />
                <input
                  className="input input-bordered w-full my-1"
                  placeholder="To"
                  value={exp.to}
                  onChange={(e) =>
                    handleArrayChange("experience", i, "to", e.target.value)
                  }
                />
              </div>
              <p className="text-sm font-semibold mt-2 mb-1">Description</p>
              {exp.description.map((d, j) => (
                <div key={j} className="flex gap-2 my-1">
                  <input
                    className="input input-bordered flex-1"
                    placeholder="Description item"
                    value={d}
                    onChange={(e) =>
                      handleNestedArrayChange(
                        "experience",
                        i,
                        "description",
                        j,
                        e.target.value
                      )
                    }
                  />
                  {exp.description.length > 1 && (
                    <DeleteButton
                      onClick={() => removeDescriptionLine(i, j)}
                    />
                  )}
                </div>
              ))}
              <AddButton
                label="+ Add Description"
                size="xs"
                onClick={() => addDescriptionLine(i)}
              />
            </div>
          ))}
          <AddButton
            label="+ Add Experience"
            onClick={() =>
              addItem("experience", {
                title: "",
                category: "",
                location: "",
                from: "",
                to: "",
                description: [""],
              })
            }
          />
        </Section>

        {/* ── Education ── */}
        <Section title="Education">
          {data.education.map((edu, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <SectionItemHeader
                label={`Education ${i + 1}`}
                canDelete={data.education.length > 1}
                onDelete={() => removeItem("education", i)}
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Title"
                value={edu.title}
                onChange={(e) =>
                  handleArrayChange("education", i, "title", e.target.value)
                }
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleArrayChange(
                    "education",
                    i,
                    "institution",
                    e.target.value
                  )
                }
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Location"
                value={edu.location}
                onChange={(e) =>
                  handleArrayChange("education", i, "location", e.target.value)
                }
              />
              <div className="flex gap-2">
                <input
                  className="input input-bordered w-full my-1"
                  placeholder="From"
                  value={edu.from}
                  onChange={(e) =>
                    handleArrayChange("education", i, "from", e.target.value)
                  }
                />
                <input
                  className="input input-bordered w-full my-1"
                  placeholder="To"
                  value={edu.to}
                  onChange={(e) =>
                    handleArrayChange("education", i, "to", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            label="+ Add Education"
            onClick={() =>
              addItem("education", {
                title: "",
                institution: "",
                location: "",
                from: "",
                to: "",
              })
            }
          />
        </Section>

        {/* ── Certifications ── */}
        <Section title="Certifications">
          {data.certifications.map((cert, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <SectionItemHeader
                label={`Certification ${i + 1}`}
                canDelete={data.certifications.length > 1}
                onDelete={() => removeItem("certifications", i)}
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Title"
                value={cert.title}
                onChange={(e) =>
                  handleArrayChange(
                    "certifications",
                    i,
                    "title",
                    e.target.value
                  )
                }
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Note"
                value={cert.note}
                onChange={(e) =>
                  handleArrayChange("certifications", i, "note", e.target.value)
                }
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Date"
                value={cert.date}
                onChange={(e) =>
                  handleArrayChange("certifications", i, "date", e.target.value)
                }
              />
            </div>
          ))}
          <AddButton
            label="+ Add Certification"
            onClick={() =>
              addItem("certifications", { title: "", note: "", date: "" })
            }
          />
        </Section>

        {/* ── Skills ── */}
        <Section title="Skills">
          {data.skills.map((skill, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <SectionItemHeader
                label={`Skill ${i + 1}`}
                canDelete={data.skills.length > 1}
                onDelete={() => removeItem("skills", i)}
              />
              <input
                className="input input-bordered w-full my-1"
                placeholder="Skill Name"
                value={skill.title}
                onChange={(e) =>
                  handleArrayChange("skills", i, "title", e.target.value)
                }
              />
              <input
                type="number"
                min={0}
                max={100}
                className="input input-bordered w-full my-1"
                placeholder="Percent (0-100)"
                value={skill.percent}
                onChange={(e) =>
                  handleArrayChange(
                    "skills",
                    i,
                    "percent",
                    Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0))
                  )
                }
              />
            </div>
          ))}
          <AddButton
            label="+ Add Skill"
            onClick={() => addItem("skills", { title: "", percent: 0 })}
          />
        </Section>
      </div>

      {/* ════════════════════════════ PDF PREVIEW ════════════════════════════ */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Preview & Download</h2>
        {id === "1" ? (
          <>
            <PDFViewer width="100%" height="600px" className="mb-3">
              <Template1 data={data} />
            </PDFViewer>
            <PDFDownloadLink
              document={<Template1 data={data} />}
              fileName="cv-template1.pdf"
              className="btn btn-primary mt-2"
            >
              {({ loading }) =>
                loading ? "Generating PDF..." : "Download CV (PDF)"
              }
            </PDFDownloadLink>
          </>
        ) : (
          <p>Template belum tersedia.</p>
        )}
      </div>
    </div>
  );
};

// ── Shared small components ────────────────────────────────────────────────

const Section = ({ title, children }) => (
  <div>
    <h2 className="font-bold text-base mb-2">{title}</h2>
    {children}
  </div>
);

const SectionItemHeader = ({ label, canDelete, onDelete }) => (
  <div className="flex items-center justify-between mb-1">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    {canDelete && (
      <button
        type="button"
        className="btn btn-xs btn-error btn-outline"
        onClick={onDelete}
      >
        Hapus
      </button>
    )}
  </div>
);

const DeleteButton = ({ onClick }) => (
  <button
    type="button"
    className="btn btn-sm btn-error btn-outline px-2"
    onClick={onClick}
    aria-label="Hapus"
  >
    ✕
  </button>
);

const AddButton = ({ label, onClick, size = "sm" }) => (
  <button
    type="button"
    className={`btn btn-${size} btn-outline mt-2`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Template;