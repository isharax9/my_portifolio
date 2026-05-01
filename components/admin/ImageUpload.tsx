"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Data = reader.result as string;

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: base64Data }),
        });

        if (res.ok) {
          const { url } = await res.json();
          onChange(url);
        } else {
          alert("Failed to upload image");
        }
        setLoading(false);
      };
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[var(--border)] group">
          <Image src={value} alt="Upload preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <button
              type="button"
              onClick={() => onChange("")}
              className="px-4 py-2 bg-red-500/80 text-white text-sm font-mono rounded-lg hover:bg-red-500 transition-colors"
            >
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative flex flex-col items-center justify-center w-full h-48 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
            dragActive
              ? "border-[var(--accent-green)] bg-[rgba(29,158,117,0.05)]"
              : "border-[var(--border)] bg-[var(--bg-tertiary)] hover:border-[var(--border-accent)]"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-[var(--accent-green)] border-t-transparent rounded-full animate-spin" />
              <p className="font-mono text-sm text-[var(--text-muted)]">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg
                className="w-8 h-8 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="font-mono text-sm text-[var(--text-secondary)]">
                Click or drag image here
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
