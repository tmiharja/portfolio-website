import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import Beyond from "@/components/Beyond";
import Footer from "@/components/Footer";
import { getBeyond, getExperience, getPosts, getProjects, getSite } from "@/lib/content";

export default function Home() {
  const site = getSite();
  const roles = getExperience();
  const projects = getProjects();
  const posts = getPosts();
  const beyond = getBeyond();

  return (
    <>
      <Header name={site.name} />
      <main id="main" className="flex-1 pb-24">
        <Hero site={site} />
        <div className="mx-auto w-full max-w-[680px] px-6 pt-12 sm:pt-16">
          <Summary bio={site.bio} />
          <Experience roles={roles} />
          <Projects projects={projects} />
          <Writing posts={posts} />
          <Beyond content={beyond} />
        </div>
      </main>
      <Footer linkedin={site.linkedin} name={site.name} />
    </>
  );
}
