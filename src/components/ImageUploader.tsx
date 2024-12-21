import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ImageUploaderProps {
  onImageProcessed: (description: string) => void;
}

export const ImageUploader = ({ onImageProcessed }: ImageUploaderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const processImage = async (file: File) => {
    try {
      setIsProcessing(true);
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockDescription = "A beautiful image containing nature and landscapes.";
      onImageProcessed(mockDescription);
      toast.success("Image processed successfully!");
    } catch (error) {
      toast.error("Failed to process image. Please try again.");
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Process the image
    await processImage(file);

    // Cleanup
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    multiple: false,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`upload-zone ${isDragActive ? "dragging" : ""} ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg object-contain"
            />
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            {isDragActive ? (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-upload" />
                <p className="text-lg">Drop your image here...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="text-lg">
                  Drag & drop an image here, or click to select
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};