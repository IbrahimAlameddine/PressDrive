import BrowseClient from "@/components/BrowseClient";


export default async function BrowsePage({ searchParams }: { searchParams: Promise<{ provider?: string }> }) {
  const { provider } = await searchParams;
  const initialProvider = provider === "office" || provider === "driver" ? provider : "all";

  return <BrowseClient initialProvider={initialProvider} />;
}

