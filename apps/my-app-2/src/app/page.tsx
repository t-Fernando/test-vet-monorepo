import Link from "next/link";

// import { inArray, eq, db, sql, type Database } from "@repo/drizzledb/db";
// import { db } from "@repo/verceldb/db";
// import { publicCategory, publicMedicine } from "@repo/drizzledb/public-schema";

import { db } from "@repo/drizzledb/db";
import {
  publicCategory,
  publicMedicine,
  publicVaccine,
} from "@repo/drizzledb/public-schema";

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  // const statement = sql`
  //   select
  //     public_medicine.id,
  //     public_medicine.name,
  //     public_medicine.categories_ids,
  //     public_category.name as categoryName
  //   from
  //     public_medicine
  //   join
  //     public_category on public_category.id in (select json_each.value from json_each(public_medicine.categories_ids))
  //   where public_medicine.id = 2
  // `;
  // const res1: unknown[] = await db.all(statement);
  // const res2: unknown = await db.get(statement);
  // const res3: unknown[][] = await db.values(statement);
  // const res4: Database.RunResult = await db.run(statement);

  // console.log(res1);

  // await db.insert(publicVaccine).values({
  //   name: "Vaccine test",
  //   searchKeywords: [""],
  // });

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
