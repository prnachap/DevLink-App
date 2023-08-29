import LinksDashboard from "@/components/LinksDashboard/LinksDashboard";
import Navbar from "@/components/Navbar/Navbar";

export default async function Home() {
  return (
    <main className="mt-0 max-w-[86rem] m-auto md:mt-4 mb-6">
      <Navbar />
      <LinksDashboard />
    </main>
  );
}
