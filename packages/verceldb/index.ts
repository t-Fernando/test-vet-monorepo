import { db } from './db';
import { publicCategoryTable } from './db/schemas';

const categories = await db.select().from(publicCategoryTable);
console.log({ categories });
