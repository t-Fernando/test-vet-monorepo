import Link from "next/link";
import { db } from "@repo/drizzledb/db";
import { client, pet, petToClient } from "@repo/drizzledb/schema";
import { createClient } from "@tursodatabase/api";
import { env } from "~/env";

//! add this to void horrible next cache ):
export const dynamic = "force-dynamic";
export const revalidate = 0;

// const turso = createClient({
//   token: env.PLATFORM_TOKEN,
//   org: "tfernandog",
// });
export default async function HomePage() {
  // const instances = await turso.databases.list();
  // console.log(instances);

  await db.insert(pet).values({
    name: "Wacha",
    color: "black",
    gender: "female",
    race: "unknown",
    size: "small",
    species: "cat",
    state: ["rescued"],
    birthdate: "2015-01-01",
  });
  // await db.insert(client).values({
  //   contactMethid: "whatsapp",
  //   email: "troy@email.com",
  //   fullName: "Troy Gomez",
  //   phone: "7717029729",
  // });
  const data = await db.select().from(client).all();
  console.log({ data });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          This app uses the{" "}
          <span className="text-[hsl(280,100%,70%)]">clinic DB</span> (SQLite)
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
