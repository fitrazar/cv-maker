import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Font bawaan (bisa custom import Google Font jika perlu)
Font.register({
  family: "Helvetica",
  fonts: [{ src: "https://fonts.gstatic.com/s/helvetica.ttf" }],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 30,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  header: { textAlign: "center", marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  role: { fontSize: 12, marginBottom: 4, marginTop: 6, fontWeight: "bold" },
  contact: { fontSize: 10, color: "gray" },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    borderBottom: "1 solid black",
    paddingBottom: 2,
  },
  //   listItem: { marginLeft: 12, marginBottom: 2 },
  //   experienceBlock: { marginBottom: 8 },
  //   expTitle: { fontSize: 12, fontWeight: "bold" },
  //   //   expMeta: { fontSize: 10, color: "gray", marginBottom: 2 },
  //   expMeta: { fontSize: 12, textDecoration: "underline", marginBottom: 2 },

  experienceBlock: { marginBottom: 10 },
  expTitle: { fontSize: 12, fontWeight: "bold" },
  expLocation: { fontSize: 11, fontStyle: "italic" },
  expCategory: { fontSize: 10, color: "gray" },
  expDate: { fontSize: 10, color: "gray" },

  eduInstitution: {
    fontSize: 12,
    fontWeight: "bold",
  },
  eduLocation: {
    fontSize: 11,
    fontStyle: "italic",
  },
  eduTitle: {
    fontSize: 10,
    color: "gray",
  },
  eduDate: {
    fontSize: 10,
    color: "gray",
  },

  skillBlock: { marginBottom: 4 },
  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: (percent) => ({
    height: "100%",
    width: `${percent}%`,
    backgroundColor: "#3b82f6",
  }),
});

const Template1 = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.role}>{data.role}</Text>
        <Text style={styles.contact}>
          {data.address} • {data.email} • {data.phone} • {data.linkedin} •{" "}
          {data.github}
        </Text>
      </View>

      {/* PROFILE */}
      <Text style={styles.sectionTitle}>PROFILE</Text>
      <Text
        style={{
          textAlign: "justify",
          fontSize: 12,
          lineHeight: 1.2, // agak rapat, bisa disesuaikan
          marginBottom: 6,
        }}
      >
        {data.profile}
      </Text>

      {/* AREAS OF EXPERTISE */}
      <Text style={styles.sectionTitle}>AREAS OF EXPERTISE</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {Array.from({ length: Math.ceil(data.expertise.length / 3) }).map(
          (_, colIndex) => (
            <View
              key={colIndex}
              style={{ flexDirection: "column", marginRight: 50 }}
            >
              {data.expertise
                .slice(colIndex * 3, colIndex * 3 + 3)
                .map((item, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: -2,
                      paddingLeft: 14,
                    }}
                  >
                    <Text style={{ fontSize: 18, marginRight: 7 }}>•</Text>
                    <Text style={{ fontSize: 14 }}>{item}</Text>
                  </View>
                ))}
            </View>
          )
        )}
      </View>

      {/* EXPERIENCE */}
      <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
      {data.experience.map((exp, i) => (
        <View key={i} style={styles.experienceBlock}>
          {/* Baris 1: Title kiri - Location kanan */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.expTitle}>{exp.title}</Text>
            <Text style={styles.expLocation}>{exp.location}</Text>
          </View>

          {/* Baris 2: Category kiri - Date kanan */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Text style={styles.expCategory}>{exp.category}</Text>
            <Text style={styles.expDate}>
              {exp.from} - {exp.to}
            </Text>
          </View>

          {/* Descriptions as bullet list */}
          {exp.description.map((d, j) => (
            <View
              key={j}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: -2,
                paddingLeft: 14,
              }}
            >
              <Text style={{ fontSize: 16, marginRight: 7 }}>•</Text>
              <Text style={{ fontSize: 12, flex: 1 }}>{d}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* EDUCATION */}
      <Text style={styles.sectionTitle}>EDUCATION</Text>
      {data.education.map((edu, i) => (
        <View key={i} style={styles.experienceBlock}>
          {/* Baris 1: Institution kiri - Location kanan */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.eduInstitution}>{edu.institution}</Text>
            <Text style={styles.eduLocation}>{edu.location}</Text>
          </View>

          {/* Baris 2: Major/Title kiri - Date kanan */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.eduTitle}>{edu.title}</Text>
            <Text style={styles.eduDate}>
              {edu.from} - {edu.to}
            </Text>
          </View>
        </View>
      ))}

      {/* CERTIFICATIONS */}
      <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
      {data.certifications.map((cert, i) => (
        <View key={i} style={styles.experienceBlock}>
          <Text style={styles.expTitle}>{cert.title}</Text>
          <Text style={styles.expMeta}>
            {cert.note} ({cert.date})
          </Text>
        </View>
      ))}

      {/* SKILLS */}
      <Text style={styles.sectionTitle}>SKILLS</Text>
      {data.skills.map((skill, i) => (
        <View key={i} style={styles.skillBlock}>
          <Text>{skill.title}</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill(skill.percent)} />
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default Template1;
