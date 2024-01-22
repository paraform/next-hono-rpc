import Link from "next/link";

export default async function Home() {
  return (
    <main className="text-xl font-bold flex flex-col gap-8">
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}
