import React, { useState } from "react";
import { useParams } from "react-router";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Template1 from "@components/Templates/Template1";

const Template = () => {
  const { id } = useParams();

  const [data, setData] = useState({
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
  });

  // helper untuk handle perubahan input biasa
  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  // helper untuk handle array field
  const handleArrayChange = (section, index, field, value) => {
    const newArr = [...data[section]];
    newArr[index][field] = value;
    setData({ ...data, [section]: newArr });
  };

  // handle list dalam list (contoh: description di experience)
  const handleNestedArrayChange = (
    section,
    index,
    subfield,
    subIndex,
    value
  ) => {
    const newArr = [...data[section]];
    newArr[index][subfield][subIndex] = value;
    setData({ ...data, [section]: newArr });
  };

  // tambah item baru
  const addItem = (section, templateObj) => {
    setData({ ...data, [section]: [...data[section], templateObj] });
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* === FORM BUILDER === */}
      <div className="space-y-6">
        <h1 className="text-xl font-bold mb-4">Isi Data CV</h1>

        {/* Basic Info */}
        <div className="space-y-2">
          <input
            className="input input-bordered w-full"
            placeholder="Name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Role"
            value={data.role}
            onChange={(e) => handleChange("role", e.target.value)}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Address"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Github"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Profile"
            value={data.profile}
            onChange={(e) => handleChange("profile", e.target.value)}
          />
        </div>

        {/* Expertise */}
        <div>
          <h2 className="font-bold">Expertise</h2>
          {data.expertise.map((exp, i) => (
            <input
              key={i}
              className="input input-bordered w-full my-1"
              placeholder="Expertise"
              value={exp}
              onChange={(e) => {
                const newArr = [...data.expertise];
                newArr[i] = e.target.value;
                setData({ ...data, expertise: newArr });
              }}
            />
          ))}
          <button
            className="btn btn-sm btn-outline mt-2"
            onClick={() =>
              setData({ ...data, expertise: [...data.expertise, ""] })
            }
          >
            + Add Expertise
          </button>
        </div>

        {/* Experience */}
        <div>
          <h2 className="font-bold">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="border p-2 mb-2 rounded">
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
              <h3 className="text-sm font-semibold mt-2">Description</h3>
              {exp.description.map((d, j) => (
                <input
                  key={j}
                  className="input input-bordered w-full my-1"
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
              ))}
              <button
                className="btn btn-xs btn-outline mt-1"
                onClick={() =>
                  handleArrayChange("experience", i, "description", [
                    ...exp.description,
                    "",
                  ])
                }
              >
                + Add Description
              </button>
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline"
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
          >
            + Add Experience
          </button>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-bold">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="border p-2 mb-2 rounded">
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
          <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              addItem("education", {
                title: "",
                institution: "",
                location: "",
                from: "",
                to: "",
              })
            }
          >
            + Add Education
          </button>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="font-bold">Certifications</h2>
          {data.certifications.map((cert, i) => (
            <div key={i} className="border p-2 mb-2 rounded">
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
          <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              addItem("certifications", { title: "", note: "", date: "" })
            }
          >
            + Add Certification
          </button>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-bold">Skills</h2>
          {data.skills.map((skill, i) => (
            <div key={i} className="border p-2 mb-2 rounded">
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
                className="input input-bordered w-full my-1"
                placeholder="Percent"
                value={skill.percent}
                onChange={(e) =>
                  handleArrayChange(
                    "skills",
                    i,
                    "percent",
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline"
            onClick={() => addItem("skills", { title: "", percent: 0 })}
          >
            + Add Skill
          </button>
        </div>
      </div>

      {/* === PDF PREVIEW + DOWNLOAD === */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Preview & Download</h2>
        {id === "1" ? (
          <>
            <PDFViewer width="100%" height="60%" className="mb-3">
              <Template1 data={data} />
            </PDFViewer>
            <PDFDownloadLink
              document={<Template1 data={data} />}
              fileName="cv-template1.pdf"
              className="btn btn-primary"
            >
              Download CV (PDF)
            </PDFDownloadLink>
          </>
        ) : (
          <p>Template belum tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default Template;
