import { jsPDF } from "jspdf";

export async function generatePDF(files) {
  if (!Array.isArray(files) || files.length === 0) {
    return null;
  }

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d");

    if (!context) {
      continue;
    }

    context.drawImage(bitmap, 0, 0);
    const imgData = canvas.toDataURL("image/jpeg", 0.9);

    const widthScale = pageWidth / bitmap.width;
    const heightScale = pageHeight / bitmap.height;
    const scale = Math.min(widthScale, heightScale);
    const renderWidth = bitmap.width * scale;
    const renderHeight = bitmap.height * scale;
    const x = (pageWidth - renderWidth) / 2;
    const y = (pageHeight - renderHeight) / 2;

    if (index !== 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "JPEG", x, y, renderWidth, renderHeight);
  }

  return pdf.output("blob");
}
