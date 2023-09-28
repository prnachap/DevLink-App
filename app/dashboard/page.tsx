import LinksDashboard from "@/components/LinksDashboard/LinksDashboard";
import { END_POINTS } from "@/constants/endpoints";
import { PlatformType } from "@/global";

export default async function Home() {
  const data = await fetch(`${END_POINTS.PLATFORM}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const response = (await data.json()) as { platform: PlatformType[] };

  return (
    <main>
      <LinksDashboard platformOptions={response?.platform ?? []} />
    </main>
  );
}
