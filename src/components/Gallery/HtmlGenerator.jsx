import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import AudioSelector from "./AudioSelector";
import QuestionTitle from "./QuestionTitle";
import SectionInput from "./SectionInput";

export default function HtmlGenerator() {
  const [audioData, setAudioData] = useState(null);
  const [titleData, setTitleData] = useState(null);
  const [sectionData, setSectionData] = useState([]);

  const [previewHtmlUrl, setPreviewHtmlUrl] = useState(null);

  // 👉 Fungsi reusable untuk membuat isi HTML
  const generateHtmlContent = () => {
    if (!audioData) return null;

    const audioSrc =
      audioData.type === "file" ? audioData.base64 : audioData.url;

    const serializedSectionData = JSON.stringify(
      (sectionData || []).map(({ image, ...rest }) => rest)
    );

    const mainTitle = titleData?.title || "Buat Kamu";

    return `
  <!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${mainTitle}</title>
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
        }

        body {
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
            background: radial-gradient(1200px 600px at 70% -10%, #d1d8ff, #fafaff 40%, #e9ecff 75%, #dee3ff 100%);
            color: #0f172a;
        }

        #app {
            position: fixed;
            inset: 0;
        }

        .ui {
            position: fixed;
            left: 16px;
            top: 16px;
            right: 16px;
            display: flex;
            gap: 12px;
            align-items: center;
            z-index: 10;
            pointer-events: none;
        }

        .badge {
            pointer-events: auto;
            user-select: none;
            backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, .75);
            border: 1px solid rgba(15, 23, 42, .08);
            box-shadow: 0 10px 30px rgba(2, 6, 23, .1);
            border-radius: 999px;
            padding: 10px 14px;
            display: inline-flex;
            gap: 10px;
            align-items: center;
        }

        .badge h1 {
            margin: 0;
            font-size: 14px;
            letter-spacing: .2px;
            font-weight: 700;
        }

        .badge small {
            opacity: .7;
            font-weight: 500;
        }

        .help {
            margin-left: auto;
            pointer-events: auto;
            border-radius: 14px;
            padding: 10px 14px;
            line-height: 1.4;
            background: rgba(15, 23, 42, .75);
            color: #e5e7eb;
            border: 1px solid rgba(255, 255, 255, .08);
            box-shadow: 0 10px 30px rgba(2, 6, 23, .2);
            max-width: min(520px, 70vw);
            font-size: 12.5px;
        }

        .help kbd {
            background: rgba(255, 255, 255, .12);
            padding: 1px 6px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, .14);
            font-size: 11px;
        }

        .bar {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            bottom: 16px;
            display: flex;
            gap: 10px;
            z-index: 10;
            pointer-events: none;
        }

        .btn {
            pointer-events: auto;
            cursor: pointer;
            border: 0;
            border-radius: 12px;
            padding: 10px 14px;
            font-weight: 700;
            background: white;
            color: #0f172a;
            border: 1px solid rgba(15, 23, 42, .08);
            box-shadow: 0 10px 30px rgba(2, 6, 23, .12);
            transition: transform .15s ease, box-shadow .15s ease, background .2s ease;
        }

        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 34px rgba(2, 6, 23, .16);
        }

        .btn:active {
            transform: translateY(0);
        }

        @media (max-width: 640px) {
            .help {
                display: none;
            }
        }
    </style>
</head>

<body>
    <div id="app"></div>

    <div class="ui">
        <div class="badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21 21L15.8 15.8M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 14.6421 14.6421 18 10.5 18Z"
                    stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
            </svg>
            <h1>${mainTitle}</h1>
            <small>putar • zoom • klik foto untuk mendekat</small>
        </div>
        <div class="help">
            <strong>Kontrol:</strong>
            <div>
                <kbd>drag</kbd> putar • <kbd>scroll</kbd> zoom • <kbd>right-drag</kbd> geser • <kbd>klik</kbd> fokus
                foto • <kbd>double‑click</kbd> reset/fokus cepat
            </div>
        </div>
    </div>

    <div class="bar">
        <button id="resetBtn" class="btn" title="Kembali ke tampilan awal">Reset Kamera</button>
        <button id="tourBtn" class="btn" title="Tur otomatis">Tur Otomatis</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

    <script>
        const sectionData = ${serializedSectionData};
        const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const lerp = (a, b, t) => a + (b - a) * t;

        const app = document.getElementById('app');
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.setSize(innerWidth, innerHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        app.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xe9ecff, 22, 60);

        const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 200);
        camera.position.set(0, 4.2, 5);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; controls.dampingFactor = 0.06; controls.target.set(0, 2, 0);
        controls.maxPolarAngle = Math.PI * 0.49; 
        controls.minDistance = 2; controls.maxDistance = 40;

        const hemi = new THREE.HemisphereLight(0xffffff, 0xb8c1ff, 0.8);
        scene.add(hemi);
        const key = new THREE.DirectionalLight(0xffffff, 1.0);
        key.position.set(5, 10, 7);
        key.castShadow = true;
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.4);
        fill.position.set(-6, 4, -3); scene.add(fill);

        const floorGeo = new THREE.PlaneGeometry(200, 200);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0xf1f5ff, roughness: .95, metalness: 0 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2; floor.position.y = 0;
        floor.receiveShadow = true; scene.add(floor);

        const frameMat = new THREE.MeshStandardMaterial({
            color: 0x111827, metalness: 0.6, roughness: 0.4, emissive: 0x000000
        });


        const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .9 });
        const makeWall = (w, h, depthZ, z) => {
            const wall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
            wall.position.set(0, h / 2, z);
            scene.add(wall); return wall;
        };
        makeWall(80, 8, 0.1, -18);


        let audioCtx, analyser, dataArray, source;
        let notesGroup = new THREE.Group();
        scene.add(notesGroup);

        function initMusic() {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const audio = new Audio("${audioSrc}");
            audio.crossOrigin = "anonymous";
            audio.loop = true;
            audio.volume = 0.7;

            source = audioCtx.createMediaElementSource(audio);
            analyser = audioCtx.createAnalyser();
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            analyser.fftSize = 128;

            dataArray = new Uint8Array(analyser.frequencyBinCount);
            audio.play();

            createNotes();
        }

        function createNotes() {
            const geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
            const count = 64;

            for (let i = 0; i < count; i++) {
                const material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(\`hsl(\${i * 5}, 80%, 60%)\`),
                    emissive: new THREE.Color(\`hsl(\${i * 5}, 100%, 50%)\`),
                    emissiveIntensity: 0.8,
                    shininess: 120
                });

                const line = new THREE.Mesh(geometry, material);

                line.position.set((i - count / 2) * 0.15, 10, 0);
                line.scale.set(0.5, 0.5, 0.5);

                notesGroup.add(line);
            }
        }

        function updateNotes() {
            if (!analyser) return;
            analyser.getByteFrequencyData(dataArray);

            notesGroup.children.forEach((line, i) => {
                let height = 0.3 + dataArray[i] / 60;
                line.scale.y = height * 0.5;
                line.position.y = 4 + (height * 0.25);
            });
        }





        function updateSceneByMusic() {
            if (!analyser) return;
            analyser.getByteFrequencyData(dataArray);
            let bass = dataArray.slice(0, 8).reduce((a, b) => a + b, 0) / 8;
            camera.position.y = 5 + bass / 50;
            key.intensity = 0.8 + bass / 300;
        }


        function tick2() {
            t += 0.005;
            key.intensity = 0.9 + Math.sin(t) * 0.05;
            fill.intensity = 0.35 + Math.cos(t * 0.8) * 0.03;

            group.rotation.y += 0.0003;
            controls.update();

            updateNotes(); 

            renderer.render(scene, camera);
            requestAnimationFrame(tick2); 
        }




        Swal.fire({
            title: '🎵 Hidupkan Musik?',
            text: 'Musik akan membuat galeri lebih hidup.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, hidupkan',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                initMusic();
                tick2();
            }
        });

        

        const imageList = sectionData.map(({ preview }) => preview);

        const loader = new THREE.TextureLoader();
        loader.crossOrigin = '';

        const group = new THREE.Group();
        scene.add(group);

        const frames = [];
        const RADIUS = 10;
        const ANGLE_STEP = (Math.PI * 2) / imageList.length;

        imageList.forEach((url, i) => {
            const tex = loader.load(url);
            tex.colorSpace = THREE.SRGBColorSpace;

            const aspect = 3 / 2; 
            const imgH = 3.2; const imgW = imgH * aspect;

            const frameDepth = 0.15;
            const frame = new THREE.Mesh(
                new THREE.BoxGeometry(imgW + 0.35, imgH + 0.35, frameDepth),
                new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.6, roughness: 0.4 })
            );

            const photo = new THREE.Mesh(
                new THREE.PlaneGeometry(imgW, imgH),
                new THREE.MeshStandardMaterial({ map: tex, roughness: .95, metalness: 0, side: THREE.FrontSide })
            );
            photo.position.z = frameDepth / 2 + 0.01;

            const pivot = new THREE.Group();
            pivot.add(frame);
            pivot.add(photo);

            const angle = i * ANGLE_STEP;
            const x = Math.cos(angle) * RADIUS;
            const z = Math.sin(angle) * RADIUS;
            pivot.position.set(x, 2.2, z);
            pivot.lookAt(new THREE.Vector3(0, 2.2, 0)); 
            photo.material.side = THREE.DoubleSide;


            const spot = new THREE.SpotLight(0xffffff, 0.7, 12, Math.PI / 6, 0.5, 1.5);
            spot.position.set(0, 2.8, 1.2);
            spot.target = photo;
            const spotHolder = new THREE.Group();
            spotHolder.add(spot); spotHolder.position.copy(pivot.position);
            spotHolder.quaternion.copy(pivot.quaternion);

            group.add(pivot);
            scene.add(spotHolder);

            frames.push({ pivot, frame, photo, spot, index: i });
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let currentFocus = null; // { pivot, index }
        let anim = null; // animation handle



        function animateTo(targetPos, targetLook, dur = 1.2) {
            const fromPos = camera.position.clone();
            const fromLook = controls.target.clone();
            let t = 0; cancelAnimationFrame(anim);
            function step() {
                t += 1 / 60 / dur; const k = easeInOut(Math.min(1, t));
                camera.position.set(
                    lerp(fromPos.x, targetPos.x, k),
                    lerp(fromPos.y, targetPos.y, k),
                    lerp(fromPos.z, targetPos.z, k)
                );
                controls.target.set(
                    lerp(fromLook.x, targetLook.x, k),
                    lerp(fromLook.y, targetLook.y, k),
                    lerp(fromLook.z, targetLook.z, k)
                );
                if (k < 1) anim = requestAnimationFrame(step);
            }
            anim = requestAnimationFrame(step);
        }



        function focusOn(pivot) {
            const dir = new THREE.Vector3();
            pivot.getWorldDirection(dir);
            const focusPoint = pivot.position.clone();
            const camPos = focusPoint.clone()
                .addScaledVector(dir, 4.0)
                .add(new THREE.Vector3(0, 0.3, 0));

            animateTo(camPos, focusPoint, 1.0);
            currentFocus = { pivot };
        }

        function resetView() {
            animateTo(new THREE.Vector3(0, 4.0, 5), new THREE.Vector3(0, 2, 0), 1.0);
            currentFocus = null;
        }

        function onClick(e) {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const objs = frames.flatMap(f => [f.photo, f.frame]);
            const hits = raycaster.intersectObjects(objs, false);

            frames.forEach(f => f.frame.material.emissive.setHex(0x000000));

            if (hits.length) {
                const hit = hits[0].object;
                const f = frames.find(F => F.photo === hit || F.frame === hit);
                if (f) focusOn(f.pivot);
            }
        }

        function onDblClick() {
            if (currentFocus) resetView(); else {
                
                let best = null; let bestDot = -Infinity;
                const viewDir = new THREE.Vector3(); camera.getWorldDirection(viewDir);
                frames.forEach(f => {
                    const to = f.pivot.position.clone().sub(camera.position).normalize();
                    const d = viewDir.dot(to);
                    if (d > bestDot) { bestDot = d; best = f; }
                });
                if (best) focusOn(best.pivot);
            }
        }

        renderer.domElement.addEventListener('click', onClick);
        renderer.domElement.addEventListener('dblclick', onDblClick);
        document.getElementById('resetBtn').addEventListener('click', resetView);

        let touring = false; let tourId = 0;
        document.getElementById('tourBtn').addEventListener('click', () => {
            touring = !touring; tourId++;
            document.getElementById('tourBtn').textContent = touring ? 'Stop Tur' : 'Tur Otomatis';
            if (touring) { startTour(tourId); }
        });

        async function startTour(id) {
            let i = 0;
            while (touring && id === tourId) {
                focusOn(frames[i % frames.length].pivot);
                await waitMs(1700);
                i++;
            }
        }
        function waitMs(ms) { return new Promise(r => setTimeout(r, ms)); }

        let t = 0;
        function tick() {
            t += 0.005;
            key.intensity = 0.9 + Math.sin(t) * 0.05;
            fill.intensity = 0.35 + Math.cos(t * 0.8) * 0.03;

            group.rotation.y += 0.0003;
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        }
        tick();

        addEventListener('resize', () => {
            camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
            renderer.setSize(innerWidth, innerHeight);
        });

        console.log('%cMuseum Foto 3D — dibuat dengan Three.js', 'padding:6px 10px; background:#111827; color:#fff; border-radius:6px');
    </script>
</body>

</html>
  `;
  };

  const handlePreview = () => {
    if (!audioData) {
      toast.error("Lengkapi audio dulu ya!");
      return;
    }

    const html = generateHtmlContent();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewHtmlUrl(url);
  };

  const handleGenerate = () => {
    if (!audioData) {
      toast.error("Lengkapi audio dulu ya!");
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
        <AudioSelector onChange={setAudioData} />
      </div>
      <div>
        <QuestionTitle onChange={setTitleData} />
      </div>
      <div className="md:col-span-2">
        <SectionInput onChange={setSectionData} />
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
