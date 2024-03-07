import { varchar, pgTable, doublePrecision } from 'drizzle-orm/pg-core'

export const productSchema = pgTable('product', {
  id: varchar('id').primaryKey(),
  name: varchar('name'),
  value: doublePrecision('value'),
})
