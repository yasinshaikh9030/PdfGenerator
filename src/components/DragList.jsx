import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DragList({ items, onReorder }) {
    if (!items || !items.length) {
        return (
            <div className="rounded-xl border border-dashed border-red-200 bg-red-50/40 px-4 py-10 text-center text-sm text-neutral-500">
                No images yet. Go back and add some, then drag them here to reorder.
            </div>
        );
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        const next = arrayMove(items, oldIndex, newIndex);
        onReorder(next);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul className="flex flex-col gap-3">
                    {items.map((item, index) => (
                        <SortableRow
                            key={item.id}
                            id={item.id}
                            index={index}
                            file={item.file}
                        />
                    ))}
                </ul>
            </SortableContext>
        </DndContext>
    );
}

function SortableRow({ id, index, file }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm shadow-sm sm:px-4 sm:py-3 ${isDragging
                ? "border-primary bg-red-50 shadow-lg"
                : "border-red-100 bg-white"
                }`}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-primary">
                {index + 1}
            </div>
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt={file.name}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover sm:h-16 sm:w-16"
                />
            )}
            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-neutral-800 sm:text-sm">
                    {file.name}
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-500 sm:text-xs">
                    Drag to change order
                </p>
            </div>
            <div className="hidden text-xs text-neutral-400 sm:block">
                {(file.size / 1024).toFixed(2)} KB
            </div>
        </li>
    );
}

export default DragList;
