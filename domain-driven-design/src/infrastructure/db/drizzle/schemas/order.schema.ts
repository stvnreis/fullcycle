import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { customerSchema } from './customer.schema'

export const orderSchema = pgTable('order', {
  id: varchar('id').primaryKey(),
  customerId: varchar('customer_id').references(() => customerSchema.id),
})
