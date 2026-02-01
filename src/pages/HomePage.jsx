import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader.jsx";
import { loadImages, saveImages, clearImages, toBase64 } from "../utils/storage.js";

const dataUrlToFile = (dataUrl, fileName) => {
    const parts = dataUrl.split(",");
    if (parts.length < 2) return null;
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const binaryStr = atob(parts[1]);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
        bytes[i] = binaryStr.charCodeAt(i);
    }
    try {
        return new File([bytes], fileName, { type: mime });
    } catch (error) {
        return new Blob([bytes], { type: mime });
    }
};

function HomePage() {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = loadImages();
        if (!saved || !saved.length) return;

        const restored = saved
            .map((item) => {
                if (!item || !item.dataUrl) {
                    return null;
                }
                const name = item.name || "image.jpg";
                return dataUrlToFile(item.dataUrl, name);
            })
            .filter(Boolean);

        if (restored.length) {
            setImages(restored);
        }
    }, []);

    useEffect(() => {
        if (!images.length) {
            clearImages();
            return;
        }

        let isCancelled = false;

        const persist = async () => {
            const serialized = await Promise.all(
                images.map(async (file) => ({
                    name: file.name,
                    dataUrl: await toBase64(file),
                }))
            );

            if (!isCancelled) {
                saveImages(serialized);
            }
        };

        persist();

        return () => {
            isCancelled = true;
        };
    }, [images]);

    const handleNext = () => {
        if (!images.length) return;
        navigate("/preview", { state: { images } });
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                    Create a clean PDF from your images
                </h1>
                <p className="text-sm text-neutral-500 sm:text-base">
                    Upload JPG or PNG files, reorder them, then download a high-quality PDF.
                </p>
            </div>

            <ImageUploader images={images} onChange={setImages} />

            <div className="flex flex-col items-center justify-between gap-3 border-t border-red-100 pt-4 sm:flex-row">
                <p className="text-xs text-neutral-500">
                    Fully frontend. Your images never leave this browser.
                </p>
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={!images.length}
                    className={`w-full rounded-lg px-4 py-2 text-sm font-semibold sm:w-auto ${images.length
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "cursor-not-allowed bg-neutral-200 text-neutral-500"
                        }`}
                >
                    Arrange pages
                </button>
            </div>
        </div>
    );
}

export default HomePage;
