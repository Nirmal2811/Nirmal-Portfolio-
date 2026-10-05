import { Footer } from "@/components/footer";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Terminal } from "@/components/sections/terminal";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Terminal />
      <Contact />
      <Footer />
    </>
  );
}
