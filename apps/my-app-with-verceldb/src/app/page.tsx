//! add this to void horrible next cache ):
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          This app uses the{" "}
          <span className="text-[hsl(280,100%,70%)]">public DB</span>{" "}
          (postgreSQL)
        </h1>
      </div>
    </main>
  );
}
