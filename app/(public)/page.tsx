// * Home page ("/")
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { TextRevealCardPreview } from "@/lib/components/TextRevealCardPreview";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <TextAnimate animation="slideUp" by="word">
        Slide up by word
      </TextAnimate>
      <TextRevealCardPreview />
    </div>
  );
}
