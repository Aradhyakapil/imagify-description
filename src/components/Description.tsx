import { Card } from "@/components/ui/card";

interface DescriptionProps {
  text: string;
}

export const Description = ({ text }: DescriptionProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 p-6">
      <h2 className="text-xl font-semibold mb-4">Image Description</h2>
      <p className="text-muted-foreground leading-relaxed">{text}</p>
    </Card>
  );
};