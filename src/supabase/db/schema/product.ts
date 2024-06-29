import { dbTableId } from "@/utils/db-utility";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const product = pgTable('product', {
    id: dbTableId(),
    name: varchar('name'),
});