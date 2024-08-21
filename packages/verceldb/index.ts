import { db } from './db';
import { categoryTable } from './db/schemas/tables';

const categories = await db.select().from(categoryTable);
console.log({ categories });
