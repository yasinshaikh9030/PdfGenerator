import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DragList from "../components/DragList.jsx";
import { generatePDF } from "../utils/pdfGenerator.js";
import { extractName } from "../utils/ocr.js";
import { savePdf, toBase64 } from "../utils/storage.js";

function PreviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const incomingImages = useMemo(
        () => location.state?.images || [],
        [location.state]
    );

    const [items, setItems] = useState([]);
    const [isBuilding, setIsBuilding] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!incomingImages.length) return;
        setItems(
            incomingImages.map((file, index) => ({
                id: `${index}-${file.name}-${file.lastModified || index}`,
                file,
            }))
        );
    }, [incomingImages]);

    if (!incomingImages.length) {
        return (
            <div className="space-y-4 text-center">
                <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                    No images to reorder yet
                </h1>
                <p className="text-sm text-neutral-500">
                    Go back to the upload page, add some images, and then you can arrange
                    them here.
                </p>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-red-200 hover:bg-red-50"
                    >
                        Back to upload
                    </button>
                </div>
            </div>
        );
    }

    const handleReorder = (nextItems) => {
        setItems(nextItems);
    };

    const handleCreatePdf = async () => {
        if (!items.length || isBuilding) return;

        setIsBuilding(true);
        setError("");

        try {
            const files = items.map((item) => item.file);
            const [pdfBlob, nameFromOcr] = await Promise.all([
                generatePDF(files),
                extractName(files[0]).catch(() => ""),
            ]);

            if (!pdfBlob) {
                setError("Could not generate PDF. Please try again.");
                setIsBuilding(false);
                return;
            }

            const baseName =
                nameFromOcr && nameFromOcr.length > 2 ? nameFromOcr : "MyDocument";
            const suggestedName = `${baseName}_${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`;

            const pdfBlobUrl = URL.createObjectURL(pdfBlob);
            const pdfSizeBytes = pdfBlob.size;

            let dataUrl = "";
            try {
                dataUrl = await toBase64(pdfBlob);
                savePdf({
                    name: suggestedName,
                    sizeBytes: pdfSizeBytes,
                    dataUrl,
                });
            } catch (storageError) {
                // Ignore storage errors (e.g., private mode, quota issues)
            }

            navigate("/download", {
                state: {
                    pdfBlobUrl,
                    pdfDataUrl: dataUrl || "",
                    suggestedName,
                    pdfSizeBytes,
                },
            });
        } catch (err) {
            setError("Something went wrong while creating your PDF.");
        } finally {
            setIsBuilding(false);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                        Arrange your pages
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Drag and drop to set the exact order. The first item becomes page 1
                        in the PDF.
                    </p>
                </div>
                <div className="text-xs text-neutral-500">
                    {items.length} image{items.length === 1 ? "" : "s"} • A4 PDF • Frontend only
                </div>
            </div>

            <DragList items={items} onReorder={handleReorder} />

            {error && (
                <p className="text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}

            <div className="flex flex-col items-center justify-between gap-3 border-t border-red-100 pt-4 sm:flex-row">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-red-200 hover:bg-red-50 sm:w-auto"
                >
                    Back to upload
                </button>
                <button
                    type="button"
                    onClick={handleCreatePdf}
                    disabled={isBuilding || !items.length}
                    className={`w-full rounded-lg px-4 py-2 text-sm font-semibold sm:w-auto ${isBuilding
                        ? "cursor-wait bg-primary-light text-white"
                        : "bg-primary text-white hover:bg-primary-dark"
                        }`}
                >
                    {isBuilding ? "Building PDF…" : "Create PDF"}
                </button>
            </div>
        </div>
    );
}

export default PreviewPage;
