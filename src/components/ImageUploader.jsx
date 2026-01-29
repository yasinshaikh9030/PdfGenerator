import { useCallback, useEffect, useState } from "react";

function ImageUploader({ images, onChange }) {
    const [previews, setPreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const next = images.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setPreviews(next);

        return () => {
            next.forEach((item) => URL.revokeObjectURL(item.url));
        };
    }, [images]);

    const handleFiles = useCallback(
        (fileList) => {
            const incoming = Array.from(fileList || []).filter((file) =>
                file.type.startsWith("image/")
            );
            if (!incoming.length) return;
            onChange([...images, ...incoming]);
        },
        [images, onChange]
    );

    const handleInputChange = (event) => {
        if (!event.target.files) return;
        handleFiles(event.target.files);
        event.target.value = "";
    };

    const preventDefault = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        preventDefault(event);
        setIsDragging(false);
        if (event.dataTransfer?.files) {
            handleFiles(event.dataTransfer.files);
        }
    };

    return (
        <div className="space-y-4">
            <label
                htmlFor="image-input"
                onDragEnter={(event) => {
                    preventDefault(event);
                    setIsDragging(true);
                }}
                onDragOver={preventDefault}
                onDragLeave={(event) => {
                    preventDefault(event);
                    setIsDragging(false);
                }}
                onDrop={handleDrop}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition ${isDragging
                        ? "border-primary bg-red-50"
                        : "border-red-200 bg-red-50/40 hover:border-primary hover:bg-red-50"
                    }`}
            >
                <p className="text-sm font-medium text-neutral-800">
                    Drop your images here
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                    or click to <span className="font-semibold text-primary">browse</span> JPG / PNG files
                </p>
                <input
                    id="image-input"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    className="hidden"
                    onChange={handleInputChange}
                />
            </label>

            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {previews.map((item, index) => (
                        <button
                            type="button"
                            key={`${item.file.name}-${index}`}
                            onClick={() => {
                                const next = images.filter((_, idx) => idx !== index);
                                onChange(next);
                            }}
                            className="group relative overflow-hidden rounded-lg border border-red-100 bg-white shadow-sm"
                        >
                            <img
                                src={item.url}
                                alt={item.file.name}
                                className="h-24 w-full object-cover transition group-hover:opacity-80 sm:h-28"
                            />
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/40 px-1 py-0.5 text-[10px] text-white">
                                <span className="truncate">{item.file.name}</span>
                                <span className="rounded bg-red-500 px-1 text-[9px] uppercase tracking-wide">
                                    remove
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
