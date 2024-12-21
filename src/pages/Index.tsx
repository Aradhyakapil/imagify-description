import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { Description } from "@/components/Description";

const Index = () => {
  const [description, setDescription] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-6 bg-gradient-radial from-accent to-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Image Analyzer</h1>
          <p className="text-lg text-muted-foreground">
            Upload an image to get an AI-powered description of its contents
          </p>
        </div>

        <ImageUploader onImageProcessed={setDescription} />
        
        {description && <Description text={description} />}
      </div>
    </div>
  );
};

export default Index;