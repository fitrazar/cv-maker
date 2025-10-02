import { useState } from "react";
import FileSelector from "./FileSelector";
import AudioSelector from "./AudioSelector";
import toast from "react-hot-toast";
import QuestionTitle from "./QuestionTitle";
import SectionInput from "./SectionInput";
import { Link } from "react-router";
import ClosingForm from "./ClosingForm";

export default function HtmlGenerator() {
  const [imageData, setImageData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [titleData, setTitleData] = useState(null);
  const [sectionData, setSectionData] = useState([]);

  const [useWhatsapp, setUseWhatsapp] = useState(false);
  const [useCustom, setUseCustom] = useState(false);
  const [whatsappContact, setWhatsappContact] = useState(null);
  const [whatsappMessage, setWhatsappMessage] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const [customImage, setCustomImage] = useState("");

  const [previewHtmlUrl, setPreviewHtmlUrl] = useState(null);

  // 👉 Fungsi reusable untuk membuat isi HTML
  const generateHtmlContent = () => {
    if (!imageData || !audioData) return null;

    const imageSrc =
      imageData.type === "file" ? imageData.base64 : imageData.url;
    const audioSrc =
      audioData.type === "file" ? audioData.base64 : audioData.url;

    const serializedSectionData = JSON.stringify(
      (sectionData || []).map(({ image, ...rest }) => rest)
    );

    const questionTitle = JSON.stringify(titleData?.question || null);
    const mainTitle = titleData?.title || "Buat Kamu";

    const customImageHtml = customImage
      ? `<img src="${customImage}" style="max-width:100%; border-radius: 10px; margin-bottom: 16px;" />`
      : "";
    const customTextHtml = customMessage
      ? `<p style="font-size: 18px; margin-bottom: 16px;">${customMessage}</p>`
      : "";

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${mainTitle}</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- 
    Terinspirasi dari: Rayya R
    Instagram: rayyarrr
  -->
    <style>
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
      }

      body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image: url('${imageSrc}');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        background-repeat: no-repeat;
        filter: blur(1px) brightness(0.7);
        z-index: -2;
      }

      body::after {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4); /* warna gelap transparan */
        z-index: -1;
      }

      #finalMessage {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.8);
        padding: 24px 32px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      }
      #finalMessage button {
        background: #25D366;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s;
      }
      #finalMessage button:hover {
        background: #128C7E;
      }
    </style>
  </head>
  <body>
    <audio id="bgm" src="${audioSrc}"></audio>
    <div id="finalMessage">
    ${useCustom ? `${customImageHtml}${customTextHtml}` : ""}
    ${
      useWhatsapp
        ? `<p>Yuk kirim pesan ke WhatsApp</p>
           <button onclick="kirimPesan()">Kirim WhatsApp</button>`
        : ""
    }
    ${!useCustom && !useWhatsapp ? "<p>udah gitu aja.</p>" : ""}
    </div>
  
    <script>
      const titleData = {
        title: ${JSON.stringify(mainTitle)},
        question: ${questionTitle}
      };
      const sectionData = ${serializedSectionData};
  
      const audio = document.getElementById("bgm");
      const swals = Swal.mixin({ allowOutsideClick: false, cancelButtonColor: '#FF0040' });
      const swalst = Swal.mixin({ allowOutsideClick: false, showConfirmButton: false, timer: 3000, timerProgressBar: true });
  
      audio.addEventListener('loadedmetadata', () => {
        audio.currentTime = ${audioData.startAt || 0};
      });
  
      async function mainkanLagu() {
        try {
          await audio.play();
        } catch (e) {
          console.error("Gagal memutar audio:", e);
        }
      }
  
      async function mulaiKuis() {
        if (!titleData.question) {
          await swals.fire({
            title: titleData.title,
            confirmButtonText: 'Lanjut',
            showCancelButton: false
          });
        } else {
          const { isConfirmed } = await swals.fire({
            title: titleData.question,
            confirmButtonText: 'Isi Dulu',
            cancelButtonText: 'Langsung Aja',
            showCancelButton: true
          });
  
          if (isConfirmed) {
            const { value: val } = await swals.fire({
              title: 'Diisi ya',
              input: 'text',
            });
  
            if (!val || val.length > 10) {
              await swals.fire('Ups!', 'Input tidak boleh kosong atau lebih dari 10 karakter!');
              return mulaiKuis();
            }
            window.val = val;
          } else {
            window.val = 'Kamu';
          }
        }
  
        mainkanLagu();
        await jalankanSection();
      }
  
      async function jalankanSection() {
        for (let i = 0; i < sectionData.length; i++) {
          const kalimat = sectionData[i].word.replace(/\{val\}/g, window.val);
          await swalst.fire({
            title: kalimat,
            imageUrl: sectionData[i].preview,
            imageWidth: 150,
            imageHeight: 150
          });
        }
        document.getElementById("finalMessage").style.display = "block";
      }

  
      function kirimPesan() {
        const pesan = encodeURIComponent('${whatsappMessage}');
        const nomor = '${whatsappContact}';
        const url = \`https://wa.me/\${nomor}?text=\${pesan}\`;
        window.open(url, '_blank');
      }
  
      mulaiKuis();
    </script>
  </body>
  </html>
  `;
  };

  const handlePreview = () => {
    if (!imageData || !audioData) {
      toast.error("Lengkapi gambar dan audio dulu ya!");
      return;
    }

    const html = generateHtmlContent();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewHtmlUrl(url);
  };

  const handleGenerate = () => {
    if (!imageData || !audioData) {
      toast.error("Lengkapi gambar dan audio dulu ya!");
      return;
    }

    const html = generateHtmlContent();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewHtmlUrl(url);

    const link = document.createElement("a");
    let title = titleData?.title || "Buat Kamu";
    link.download = `${title}.html`;
    link.href = url;
    link.click();
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
      <div className="md:col-span-2 flex justify-start mb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-pink-600 hover:to-purple-700 transition-all"
        >
          <span>🔙</span> Kembali
        </Link>
      </div>
      <div>
        <FileSelector onChange={setImageData} />
      </div>
      <div>
        <AudioSelector onChange={setAudioData} />
      </div>
      <div className="md:col-span-2">
        <QuestionTitle onChange={setTitleData} />
      </div>
      <div className="md:col-span-2">
        <SectionInput onChange={setSectionData} />
      </div>
      <div className="md:col-span-2">
        <ClosingForm
          onChange={({
            useWhatsapp,
            useCustom,
            whatsappContact,
            whatsappMessage,
            customMessage,
            image,
          }) => {
            setUseWhatsapp(useWhatsapp);
            setUseCustom(useCustom);
            setWhatsappContact(whatsappContact);
            setWhatsappMessage(whatsappMessage);
            setCustomMessage(customMessage);
            setCustomImage(image?.base64);
          }}
        />
      </div>

      <div className="flex gap-4 justify-center md:col-span-2 mt-4">
        <button
          onClick={handlePreview}
          className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-yellow-600 transition"
        >
          👀 Preview HTML
        </button>
        <button
          onClick={handleGenerate}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition"
        >
          🎁 Generate HTML
        </button>
      </div>

      {previewHtmlUrl && (
        <div className="md:col-span-2 mt-6">
          <h3 className="text-xl font-semibold mb-2 text-center text-gray-700">
            👇 Preview HTML Kamu
          </h3>
          <div className="border rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={previewHtmlUrl}
              title="HTML Preview"
              className="w-full h-[400px] rounded-xl border-none"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
