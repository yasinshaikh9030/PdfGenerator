const STORAGE_KEY = "savedImages";
const PDF_STORAGE_KEY = "savedPdf";

export const saveImages = (images) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    // Ignore write errors (e.g., private mode, quota exceeded)
  }
};

export const loadImages = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const clearImages = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // Ignore removal errors
  }
};

export const savePdf = (payload) => {
  try {
    localStorage.setItem(PDF_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    // Ignore write errors
  }
};

export const loadPdf = () => {
  try {
    const data = localStorage.getItem(PDF_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const clearPdf = () => {
  try {
    localStorage.removeItem(PDF_STORAGE_KEY);
  } catch (error) {
    // Ignore removal errors
  }
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to convert file to Base64"));
    reader.readAsDataURL(file);
  });
