import Banner from "@/lib/components/Banner";
import FeaturedProjects from "@/lib/components/FeaturedProjects";
import Skills from "@/lib/components/Skills";

export default function Home() {
  return (
    <div className="mb-2">
      <Banner />
      <Skills />
      <FeaturedProjects />
    </div>
  );
}
