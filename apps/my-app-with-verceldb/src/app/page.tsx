import { db } from "@repo/verceldb/db";
import { category, medication } from "@repo/verceldb/schema";
import { sql } from "drizzle-orm";

//! add this to void horrible next cache ):
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  // await db.insert(medication).values({
  //   categoriesIds: [
  //     "0d171a32-b0a7-411d-b1f0-4d27fd07b4f8",
  //     "50b33e60-975b-4574-9d6f-c809414befe9",
  //   ],
  //   name: "Medication Name",
  //   type: "medicine",
  // });
  // const medications = await db.select().from(medication).leftJoin(category, )
  const medications = await db.execute(
    sql`
    SELECT
      ${medication.id},
      ${medication.name},
      ${category.name}
    FROM
      ${medication}
    JOIN
      ${category} ON ${category.id} = ANY (${medication.categoriesIds})`,
  );
  console.log({ medications });
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
