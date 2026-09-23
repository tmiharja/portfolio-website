import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";
import { getExperience, getPosts, getProjects, getSite } from "@/lib/content";

export default function Home() {
  const site = getSite();
  const roles = getExperience();
  const projects = getProjects();
  const posts = getPosts();

  return (
    <>
      <Header name={site.name} />
      <main
        id="main"
        className="mx-auto w-full max-w-[680px] flex-1 px-6 pb-24 pt-16 sm:pt-24"
      >
        <Hero site={site} />
        <Experience roles={roles} />
        <Projects projects={projects} />
        <Writing posts={posts} />
      </main>
      <Footer email={site.email} linkedin={site.linkedin} name={site.name} />
    </>
  );
}
