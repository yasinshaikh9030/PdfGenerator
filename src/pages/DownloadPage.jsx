import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PdfPreview from "../components/PdfPreview.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import { loadPdf } from "../utils/storage.js";

function DownloadPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [{ pdfSrc, suggestedName, pdfSizeBytes }] = useState(() => {
        const saved = loadPdf();
        if (saved && saved.dataUrl) {
            return {
                pdfSrc: saved.dataUrl,
                suggestedName: saved.name || "output.pdf",
                pdfSizeBytes:
                    typeof saved.sizeBytes === "number" ? saved.sizeBytes : null,
            };
        }

        const stateDataUrl = location.state?.pdfDataUrl || "";
        if (stateDataUrl) {
            return {
                pdfSrc: stateDataUrl,
                suggestedName: location.state?.suggestedName || "output.pdf",
                pdfSizeBytes: location.state?.pdfSizeBytes ?? null,
            };
        }

        const stateBlobUrl = location.state?.pdfBlobUrl || "";
        return {
            pdfSrc: stateBlobUrl,
            suggestedName: location.state?.suggestedName || "output.pdf",
            pdfSizeBytes: location.state?.pdfSizeBytes ?? null,
        };
    });

    const [fileName, setFileName] = useState(suggestedName);
    const [hasDownloaded, setHasDownloaded] = useState(false);

    if (!pdfSrc) {
        return (
            <div className="space-y-4 text-center">
                <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                    No PDF ready yet
                </h1>
                <p className="text-sm text-neutral-500">
                    Start from the upload page, add images, and build your PDF.
                </p>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-red-200 hover:bg-red-50"
                    >
                        Go to upload
                    </button>
                </div>
            </div>
        );
    }

    const handleDownload = () => {
        if (!pdfSrc) return;

        const link = document.createElement("a");
        link.href = pdfSrc;
        link.download = (fileName || "output.pdf").trim();
        document.body.appendChild(link);
        link.click();
        link.remove();
        setHasDownloaded(true);
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                    Your PDF is ready
                </h1>
                <p className="text-sm text-neutral-500 sm:text-base">
                    Rename it, download, and then share the link to this tool with your friends.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                    <PdfPreview src={pdfSrc} />
                </div>
                <div className="space-y-4 md:col-span-2">
                    <div className="space-y-2">
                        <label
                            htmlFor="file-name"
                            className="block text-xs font-medium uppercase tracking-wide text-neutral-500"
                        >
                            File name
                        </label>
                        <input
                            id="file-name"
                            type="text"
                            value={fileName}
                            onChange={(event) => setFileName(event.target.value)}
                            className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                        />
                        <p className="text-[11px] text-neutral-500">
                            Extension <span className="font-mono">.pdf</span> is included automatically.
                        </p>
                        {pdfSizeBytes !== null && (
                            <p className="text-[11px] text-neutral-500">
                                Approx. size: {(pdfSizeBytes / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={handleDownload}
                            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark"
                        >
                            Download PDF
                        </button>

                        <div className="h-2 w-full overflow-hidden rounded-full bg-red-100">
                            <div
                                className={`h-full rounded-full bg-primary transition-all ${hasDownloaded ? "w-full" : "w-2/3"
                                    }`}
                            />
                        </div>
                        <p className="text-[11px] text-neutral-500">
                            {hasDownloaded
                                ? "Download complete. You can safely close this tab or create another PDF."
                                : "Almost there. Click download to finish the process."}
                        </p>
                    </div>

                    <ShareButtons url={window.location.origin} />
                </div>
            </div>

            {hasDownloaded && (
                <div className="mt-4 rounded-xl border border-dashed border-red-200 bg-red-50/60 px-4 py-3 text-center text-sm text-neutral-700 sm:text-base">
                    <p className="font-semibold text-primary">
                        Thanks 🩷 for using the application
                    </p>
                    <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                        Scroll down to start again with new images.
                    </p>
                </div>
            )}

            <div className="mt-4 border-t border-red-100 pt-4 text-center text-sm text-neutral-600">
                <p className="mb-2 font-semibold">Create another PDF</p>
                <p className="mb-3 text-xs text-neutral-500">
                    Upload new images and repeat the flow. It works well on both mobiles and laptops.
                </p>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-red-200 hover:bg-red-50"
                >
                    Back to home
                </button>
            </div>
        </div>
    );
}

export default DownloadPage;
