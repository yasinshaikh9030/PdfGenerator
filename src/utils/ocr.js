import Tesseract from "tesseract.js";

export async function extractName(file) {
  try {
    const { data } = await Tesseract.recognize(file, "eng");
    if (!data || typeof data.text !== "string") {
      return "";
    }
    const tokens = data.text.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return "";
    }
    const raw = tokens[0];
    const cleaned = raw.replace(/[^\w-]/g, "");
    return cleaned;
  } catch (error) {
    return "";
  }
}
