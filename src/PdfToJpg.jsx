

//corrcect version
// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";

// // ✅ Fix for Vite worker
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// export default function PdfToJpg() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setLoading(true);
//     setImages([]);

//     let imageUrls = [];

//     for (let file of files) {
//       // Read PDF file
//       const reader = new FileReader();
//       const result = await new Promise((resolve) => {
//         reader.onload = () => resolve(reader.result);
//         reader.readAsArrayBuffer(file);
//       });

//       // Load PDF
//       const pdfData = new Uint8Array(result);
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//       const page = await pdf.getPage(1); // only 1st page

//       // Render to canvas
//       const viewport = page.getViewport({ scale: 2 });
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;
//       await page.render({ canvasContext: context, viewport }).promise;

//       // ✅ Generate two versions: normal & small
//       const imgNormal = canvas.toDataURL("image/jpeg", 0.6);   // full quality
//       const imgSmall = canvas.toDataURL("image/jpeg", 0.3);   // lower quality

//       const baseName = file.name.replace(/\.pdf$/i, "");

//       imageUrls.push({
//         name: baseName + ".jpg",
//         data: imgNormal,
//       });
//       imageUrls.push({
//         name: baseName + "-small.jpg",
//         data: imgSmall,
//       });
//     }

//     setImages(imageUrls);
//     setLoading(false);
//   };

//   const handleDownload = (img) => {
//     const link = document.createElement("a");
//     link.href = img.data;
//     link.download = img.name;
//     link.click();
//   };

//   const handleDownloadAll = () => {
//     images.forEach((img) => handleDownload(img));
//   };

//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-2xl bg-blue-400 rounded-2xl m-4 p-6 font-bold mb-4">
//         PDF → JPG Converter
//       </h2>

//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         onChange={handleFileChange}
//         className="mb-6 text-xl font-bold"
//       />

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center my-8">
//           <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//           <span className="ml-3 text-blue-600 font-medium">Converting...</span>
//         </div>
//       )}

//       {!loading && images.length > 0 && (
//         <>
//           <button
//             onClick={handleDownloadAll}
//             className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mb-6"
//           >
//             Download All JPGs
//           </button>

//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//             {images.map((img, i) => (
//               <div
//                 key={i}
//                 className="border p-4 shadow rounded bg-white flex flex-col items-center"
//               >
//                 <img src={img.data} alt={img.name} className="mb-2 w-full" />
//                 <p className="text-sm mb-2">{img.name}</p>
//                 <button
//                   onClick={() => handleDownload(img)}
//                   className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700"
//                 >
//                   Download
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

//testing with folder selection 
// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";

// // ✅ Fix for Vite worker
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// export default function PdfToJpg() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [dirHandle, setDirHandle] = useState(null);

//   // ✅ ONLY NEW: select output folder
//   const selectOutputFolder = async () => {
//     if (!window.showDirectoryPicker) {
//       alert("Folder selection not supported in this browser");
//       return;
//     }
//     const handle = await window.showDirectoryPicker();
//     setDirHandle(handle);
//   };

//   // ✅ ONLY NEW: base64 → blob (no image processing)
//   const dataURLtoBlob = (dataUrl) => {
//     const arr = dataUrl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new Blob([u8arr], { type: mime });
//   };

//   // ✅ ONLY NEW: save file to selected folder
//   const saveToFolder = async (fileName, dataUrl) => {
//     if (!dirHandle) return;

//     const fileHandle = await dirHandle.getFileHandle(fileName, {
//       create: true,
//     });
//     const writable = await fileHandle.createWritable();
//     await writable.write(dataURLtoBlob(dataUrl));
//     await writable.close();
//   };

//   // ⛔ CONVERSION LOGIC — UNCHANGED
//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setLoading(true);
//     setImages([]);

//     let imageUrls = [];

//     for (let file of files) {
//       // Read PDF file
//       const reader = new FileReader();
//       const result = await new Promise((resolve) => {
//         reader.onload = () => resolve(reader.result);
//         reader.readAsArrayBuffer(file);
//       });

//       // Load PDF
//       const pdfData = new Uint8Array(result);
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//       const page = await pdf.getPage(1); // only 1st page

//       // Render to canvas
//       const viewport = page.getViewport({ scale: 2 });
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;
//       await page.render({ canvasContext: context, viewport }).promise;

//       // ✅ SAME image generation
//       const imgNormal = canvas.toDataURL("image/jpeg", 0.6);
//       const imgSmall = canvas.toDataURL("image/jpeg", 0.3);

//       const baseName = file.name.replace(/\.pdf$/i, "");

//       const normalName = baseName + ".jpg";
//       const smallName = baseName + "-small.jpg";

//       // ✅ ONLY ADDITION: save to selected folder
//       if (dirHandle) {
//         await saveToFolder(normalName, imgNormal);
//         await saveToFolder(smallName, imgSmall);
//       }

//       imageUrls.push(
//         { name: normalName, data: imgNormal },
//         { name: smallName, data: imgSmall }
//       );
//     }

//     setImages(imageUrls);
//     setLoading(false);
//   };

//   // ⛔ ORIGINAL DOWNLOAD LOGIC — UNCHANGED
//   const handleDownload = (img) => {
//     const link = document.createElement("a");
//     link.href = img.data;
//     link.download = img.name;
//     link.click();
//   };

//   const handleDownloadAll = () => {
//     images.forEach((img) => handleDownload(img));
//   };

//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-2xl bg-blue-400 rounded-2xl m-4 p-6 font-bold mb-4">
//         PDF → JPG Converter
//       </h2>

//       {/* ✅ ONLY NEW UI */}
//       <button
//         onClick={selectOutputFolder}
//         className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 mb-4"
//       >
//         {dirHandle ? "Output Folder Selected ✓" : "Select Output Folder"}
//       </button>

//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         onChange={handleFileChange}
//         className="mb-6 text-xl font-bold block mx-auto"
//       />

//       {loading && (
//         <div className="flex justify-center items-center my-8">
//           <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//           <span className="ml-3 text-blue-600 font-medium">Converting...</span>
//         </div>
//       )}

//       {!loading && images.length > 0 && !dirHandle && (
//         <>
//           <button
//             onClick={handleDownloadAll}
//             className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mb-6"
//           >
//             Download All JPGs
//           </button>

//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//             {images.map((img, i) => (
//               <div
//                 key={i}
//                 className="border p-4 shadow rounded bg-white flex flex-col items-center"
//               >
//                 <img src={img.data} alt={img.name} className="mb-2 w-full" />
//                 <p className="text-sm mb-2">{img.name}</p>
//                 <button
//                   onClick={() => handleDownload(img)}
//                   className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700"
//                 >
//                   Download
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {dirHandle && (
//         <p className="text-green-700 font-medium mt-6">
//           Files saved directly to selected folder ✔
//         </p>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// export default function PdfToJpg() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [dirHandle, setDirHandle] = useState(null);
//   const [hasPermission, setHasPermission] = useState(false);

//   // ✅ SELECT FOLDER + REQUEST PERMISSION ONCE
//   const selectOutputFolder = async () => {
//     if (!window.showDirectoryPicker) {
//       alert("Folder selection not supported in this browser");
//       return;
//     }

//     const handle = await window.showDirectoryPicker();

//     const permission = await handle.requestPermission({
//       mode: "readwrite",
//     });

//     if (permission !== "granted") {
//       alert("Write permission denied");
//       return;
//     }

//     setDirHandle(handle);
//     setHasPermission(true);
//   };

//   // ✅ base64 → blob (NO conversion change)
//   const dataURLtoBlob = (dataUrl) => {
//     const arr = dataUrl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new Blob([u8arr], { type: mime });
//   };

//   // ✅ SAFE SAVE (NO permission logic here)
//   const saveToFolder = async (fileName, dataUrl) => {
//     if (!dirHandle || !hasPermission) return;

//     const fileHandle = await dirHandle.getFileHandle(fileName, {
//       create: true,
//     });

//     const writable = await fileHandle.createWritable();
//     await writable.write(dataURLtoBlob(dataUrl));
//     await writable.close();
//   };

//   // ⛔ CONVERSION LOGIC — COMPLETELY UNCHANGED
//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setLoading(true);
//     setImages([]);

//     let imageUrls = [];

//     for (let file of files) {
//       const reader = new FileReader();
//       const result = await new Promise((resolve) => {
//         reader.onload = () => resolve(reader.result);
//         reader.readAsArrayBuffer(file);
//       });

//       const pdfData = new Uint8Array(result);
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//       const page = await pdf.getPage(1);

//       const viewport = page.getViewport({ scale: 2 });
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       await page.render({ canvasContext: context, viewport }).promise;

//       const imgNormal = canvas.toDataURL("image/jpeg", 0.6);
//       const imgSmall = canvas.toDataURL("image/jpeg", 0.3);

//       const baseName = file.name.replace(/\.pdf$/i, "");
//       const normalName = baseName + ".jpg";
//       const smallName = baseName + "-small.jpg";

//       // ✅ SAVE ONLY IF FOLDER IS READY
//       if (dirHandle && hasPermission) {
//         await saveToFolder(normalName, imgNormal);
//         await saveToFolder(smallName, imgSmall);
//       }

//       imageUrls.push(
//         { name: normalName, data: imgNormal },
//         { name: smallName, data: imgSmall }
//       );
//     }

//     setImages(imageUrls);
//     setLoading(false);
//   };

//   // ⛔ ORIGINAL DOWNLOAD LOGIC — UNCHANGED
//   const handleDownload = (img) => {
//     const link = document.createElement("a");
//     link.href = img.data;
//     link.download = img.name;
//     link.click();
//   };

//   const handleDownloadAll = () => {
//     images.forEach((img) => handleDownload(img));
//   };

//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-2xl bg-blue-400 rounded-2xl m-4 p-6 font-bold mb-4">
//         PDF → JPG Converter
//       </h2>

//       <button
//         onClick={selectOutputFolder}
//         className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 mb-4"
//       >
//         {dirHandle ? "Output Folder Selected ✓" : "Select Output Folder"}
//       </button>

//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         onChange={handleFileChange}
//         className="mb-6 text-xl font-bold block mx-auto"
//       />

//       {loading && (
//         <div className="flex justify-center items-center my-8">
//           <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//           <span className="ml-3 text-blue-600 font-medium">Converting...</span>
//         </div>
//       )}

//       {!loading && images.length > 0 && (

//         <>
//           <button
//             onClick={handleDownloadAll}
//             className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mb-6"
//           >
//             Download All JPGs
//           </button>
//         </>
//       )}

//       {dirHandle && (
//         <p className="text-green-700 font-medium mt-6">
//           Files saved directly to selected folder ✔
//         </p>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// export default function PdfToJpg() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [dirHandle, setDirHandle] = useState(null);
//   const [hasPermission, setHasPermission] = useState(false);

//   // ✅ SELECT FOLDER + REQUEST PERMISSION ONCE
//   const selectOutputFolder = async () => {
//     if (!window.showDirectoryPicker) {
//       alert("Folder selection not supported in this browser");
//       return;
//     }

//     const handle = await window.showDirectoryPicker();
//     const permission = await handle.requestPermission({ mode: "readwrite" });

//     if (permission !== "granted") {
//       alert("Write permission denied");
//       return;
//     }

//     setDirHandle(handle);
//     setHasPermission(true);
//   };

//   // ✅ base64 → blob
//   const dataURLtoBlob = (dataUrl) => {
//     const arr = dataUrl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new Blob([u8arr], { type: mime });
//   };

//   // ✅ SAVE TO FOLDER
//   const saveToFolder = async (fileName, dataUrl) => {
//     if (!dirHandle || !hasPermission) return;

//     const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
//     const writable = await fileHandle.createWritable();
//     await writable.write(dataURLtoBlob(dataUrl));
//     await writable.close();
//   };

//   // ⛔ CONVERSION LOGIC — UNCHANGED
//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setLoading(true);
//     setImages([]);

//     let imageUrls = [];

//     for (let file of files) {
//       const reader = new FileReader();
//       const result = await new Promise((resolve) => {
//         reader.onload = () => resolve(reader.result);
//         reader.readAsArrayBuffer(file);
//       });

//       const pdfData = new Uint8Array(result);
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//       const page = await pdf.getPage(1);

//       const viewport = page.getViewport({ scale: 2 });
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       await page.render({ canvasContext: context, viewport }).promise;

//       const imgNormal = canvas.toDataURL("image/jpeg", 0.6);
//       const imgSmall = canvas.toDataURL("image/jpeg", 0.3);

//       const baseName = file.name.replace(/\.pdf$/i, "");
//       const normalName = baseName + ".jpg";
//       const smallName = baseName + "-small.jpg";

//       if (dirHandle && hasPermission) {
//         await saveToFolder(normalName, imgNormal);
//         await saveToFolder(smallName, imgSmall);
//       }

//       imageUrls.push(
//         { name: normalName, data: imgNormal },
//         { name: smallName, data: imgSmall }
//       );
//     }

//     setImages(imageUrls);
//     setLoading(false);
//   };

//   // ⛔ ORIGINAL DOWNLOAD LOGIC
//   const handleDownload = (img) => {
//     const link = document.createElement("a");
//     link.href = img.data;
//     link.download = img.name;
//     link.click();
//   };

//   const handleDownloadAll = () => {
//     images.forEach((img) => handleDownload(img));
//   };

//   // return (
//   //   <div className="p-6 text-center">
//   //     <h2 className="text-2xl bg-blue-400 rounded-2xl m-4 p-6 font-bold mb-4">
//   //       PDF → JPG Converter
//   //     </h2>

//   //     <button
//   //       onClick={selectOutputFolder}
//   //       className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 mb-4"
//   //     >
//   //       {dirHandle ? "Output Folder Selected ✓" : "Select Output Folder"}
//   //     </button>

//   //     <input
//   //       type="file"
//   //       accept="application/pdf"
//   //       multiple
//   //       onChange={handleFileChange}
//   //       className="mb-6 text-xl font-bold block mx-auto"
//   //     />

//   //     {loading && (
//   //       <div className="flex justify-center items-center my-8">
//   //         <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//   //         <span className="ml-3 text-blue-600 font-medium">Converting...</span>
//   //       </div>
//   //     )}

//   //     {/* ✅ DOWNLOAD ALL ONLY WHEN FOLDER NOT SELECTED */}
//   //     {!loading && images.length > 0 && !dirHandle && (
//   //       <button
//   //         onClick={handleDownloadAll}
//   //         className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mb-6"
//   //       >
//   //         Download All JPGs
//   //       </button>
//   //     )}

//   //     {/* ✅ PREVIEW GRID — ALWAYS VISIBLE */}
//   //     {!loading && images.length > 0 && (
//   //       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//   //         {images.map((img, i) => (
//   //           <div
//   //             key={i}
//   //             className="border p-4 shadow rounded bg-white flex flex-col items-center"
//   //           >
//   //             <img
//   //               src={img.data}
//   //               alt={img.name}
//   //               className="mb-2 w-full object-contain"
//   //             />
//   //             <p className="text-sm mb-2">{img.name}</p>

//   //             {!dirHandle && (
//   //               <button
//   //                 onClick={() => handleDownload(img)}
//   //                 className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700"
//   //               >
//   //                 Download
//   //               </button>
//   //             )}
//   //           </div>
//   //         ))}
//   //       </div>
//   //     )}

//   //     {dirHandle && (
//   //       <p className="text-green-700 font-medium mt-6">
//   //         Files saved directly to selected folder ✔
//   //       </p>
//   //     )}
//   //   </div>
//   // );
//   return (
//   <div className="min-h-screen bg-slate-100 flex justify-center py-12 px-4">
//     <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-slate-200">

//       {/* Header */}
//       <div className="border-b px-8 py-6">
//         <h2 className="text-2xl font-semibold text-slate-900">
//           PDF to JPG Converter
//         </h2>
//         <p className="text-sm text-slate-500 mt-1">
//           Convert PDF files into high-quality JPG and optimized small JPG images
//         </p>
//       </div>

//       {/* Controls */}
//       <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Folder Selection */}
//         <div className="border rounded-lg p-6 bg-slate-50">
//           <p className="text-sm font-medium text-slate-700 mb-3">
//             Output Folder
//           </p>
//           <button
//             onClick={selectOutputFolder}
//             className={`w-full px-4 py-2 rounded-md text-sm font-medium transition ${
//               dirHandle
//                 ? "bg-emerald-600 text-white"
//                 : "bg-slate-900 text-white hover:bg-slate-800"
//             }`}
//           >
//             {dirHandle ? "Folder Selected" : "Select Output Folder"}
//           </button>
//           <p className="text-xs text-slate-500 mt-2">
//             Converted images will be saved to this location
//           </p>
//         </div>

//         {/* File Upload */}
//         <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center bg-white">
//           <input
//             type="file"
//             accept="application/pdf"
//             multiple
//             onChange={handleFileChange}
//             className="hidden"
//             id="pdf-upload"
//           />
//           <label
//             htmlFor="pdf-upload"
//             className="cursor-pointer flex flex-col items-center"
//           >
//             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M7 16V12M12 16V8M17 16V4"
//                 />
//               </svg>
//             </div>
//             <p className="text-sm font-medium text-slate-700">
//               Upload PDF files
//             </p>
//             <p className="text-xs text-slate-500 mt-1">
//               Select one or multiple PDFs
//             </p>
//           </label>
//         </div>
//       </div>

//       {/* Loader */}
//       {loading && (
//         <div className="flex items-center justify-center py-10 border-t">
//           <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-3"></div>
//           <span className="text-sm text-slate-600">
//             Converting files…
//           </span>
//         </div>
//       )}

//       {/* Download All */}
//       {!loading && images.length > 0 && !dirHandle && (
//         <div className="px-8 py-4 border-t">
//           <button
//             onClick={handleDownloadAll}
//             className="px-6 py-2 bg-slate-900 text-white rounded-md text-sm hover:bg-slate-800 transition"
//           >
//             Download All Images
//           </button>
//         </div>
//       )}

//       {/* Preview Grid */}
//       {!loading && images.length > 0 && (
//         <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {images.map((img, i) => (
//             <div
//               key={i}
//               className="border rounded-lg overflow-hidden bg-white hover:shadow transition"
//             >
//               <div className="h-48 bg-slate-50 flex items-center justify-center">
//                 <img
//                   src={img.data}
//                   alt={img.name}
//                   className="max-h-full max-w-full object-contain"
//                 />
//               </div>

//               <div className="p-4">
//                 <p className="text-xs text-slate-600 truncate">
//                   {img.name}
//                 </p>

//                 {!dirHandle && (
//                   <button
//                     onClick={() => handleDownload(img)}
//                     className="mt-3 w-full text-sm px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100 transition"
//                   >
//                     Download
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Success Message */}
//       {dirHandle && images.length > 0 && (
//         <div className="px-8 py-4 border-t text-sm text-emerald-700">
//           Files have been saved successfully to the selected folder.
//         </div>
//       )}
//     </div>
//   </div>
// );

// }

import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PdfToJpg() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dirHandle, setDirHandle] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // SELECT FOLDER
  const selectOutputFolder = async () => {
    if (!window.showDirectoryPicker) {
      alert("Folder selection not supported in this browser");
      return;
    }

    const handle = await window.showDirectoryPicker();
    const permission = await handle.requestPermission({ mode: "readwrite" });

    if (permission !== "granted") {
      alert("Write permission denied");
      return;
    }

    setDirHandle(handle);
    setHasPermission(true);
  };

  // base64 → blob
  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  // save to folder
  const saveToFolder = async (fileName, dataUrl) => {
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(dataURLtoBlob(dataUrl));
    await writable.close();
  };

  // ⛔ CONVERSION LOGIC — UNCHANGED
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setLoading(true);
    setImages([]);

    let imageUrls = [];

    for (let file of files) {
      const reader = new FileReader();
      const result = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsArrayBuffer(file);
      });

      const pdfData = new Uint8Array(result);
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      const imgNormal = canvas.toDataURL("image/jpeg", 0.6);
      const imgSmall = canvas.toDataURL("image/jpeg", 0.3);

      const baseName = file.name.replace(/\.pdf$/i, "");

      imageUrls.push(
        { name: baseName + ".jpg", data: imgNormal },
        { name: baseName + "-small.jpg", data: imgSmall }
      );
    }

    setImages(imageUrls);
    setLoading(false);
  };

  // browser download
  const handleDownload = (img) => {
    const link = document.createElement("a");
    link.href = img.data;
    link.download = img.name;
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach(handleDownload);
  };

  // ✅ MANUAL SAVE
  const handleSaveAllToFolder = async () => {
    if (!dirHandle || !hasPermission) {
      alert("Please select an output folder first");
      return;
    }

    for (let img of images) {
      await saveToFolder(img.name, img.data);
    }

    alert("Files saved to selected folder");
  };

  return (
    <div className="min-h-screen bg-blue-200 flex justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-slate-200">

        {/* Header */}
        <div className="border-b px-8 py-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            PDF to JPG Converter
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Convert PDF files into high-quality JPG and optimized small JPG images
          </p>
        </div>

        {/* Controls */}
        <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Folder */}
          <div className="border rounded-lg p-6 bg-slate-50">
            <p className="text-sm font-medium text-slate-700 mb-3">
              Output Folder
            </p>
            <button
              onClick={selectOutputFolder}
              className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                dirHandle
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {dirHandle ? "Folder Selected" : "Select Output Folder"}
            </button>
          </div>

          {/* Upload */}
          <label className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-sm font-medium text-slate-700">
              Upload PDF files
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Multiple files supported
            </p>
          </label>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center py-10 border-t">
            <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-sm text-slate-600">Converting…</span>
          </div>
        )}

        {/* ACTION BUTTON */}
        {!loading && images.length > 0 && (
          <div className="px-8 py-4 border-t">
            {!dirHandle ? (
              <button
                onClick={handleDownloadAll}
                className="px-6 py-2 bg-slate-900 text-white rounded-md text-sm"
              >
                Download All Images
              </button>
            ) : (
              <button
                onClick={handleSaveAllToFolder}
                className="px-6 py-2 bg-green-600 text-white rounded-md text-sm"
              >
                Save to Selected Folder
              </button>
            )}
          </div>
        )}

        {/* Preview */}
        {!loading && images.length > 0 && (
          <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-slate-50 flex items-center justify-center">
                  <img src={img.data} alt={img.name} className="object-contain h-full" />
                </div>
                <div className="p-4 text-xs text-slate-600 truncate">
                  {img.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
