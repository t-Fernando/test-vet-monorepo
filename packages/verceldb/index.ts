import { db } from './db';
import { category, medication } from './db/schemas/tables';
import { eq, arrayContains, sql } from 'drizzle-orm';

// await db.insert(category).values({
//   name: 'Cat 2',
// });

// await db.insert(medication).values({
//   categoriesIds: [1, 2],
//   name: 'Medication Name',
// });

const medications = await db.execute(
  sql`
  SELECT
    ${medication.id},
    ${medication.name},
    ${category.name}
  FROM
    ${medication}
  JOIN
    ${category} ON ${category.id} = ANY (${medication.categoriesIds})`
);
console.log({ medications });
