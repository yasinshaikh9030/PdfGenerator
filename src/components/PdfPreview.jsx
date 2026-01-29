function PdfPreview({ src }) {
    if (!src) return null;

    return (
        <div className="overflow-hidden rounded-xl border border-red-100 bg-red-50/40">
            <div className="flex items-center justify-between border-b border-red-100 bg-red-50 px-3 py-2 text-[11px] text-neutral-600 sm:text-xs">
                <span className="font-medium text-neutral-800">PDF preview</span>
                <span>First page • zoomable in your browser</span>
            </div>
            <div className="h-64 w-full bg-white sm:h-80 md:h-96">
                <iframe
                    title="PDF preview"
                    src={src}
                    className="h-full w-full border-0"
                />
            </div>
        </div>
    );
}

export default PdfPreview;
