import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { productSchema } from './product.schema'
import { orderSchema } from './order.schema'

export const orderItemSchema = pgTable('order_item', {
  id: varchar('id').primaryKey(),
  orderId: varchar('order_id').references(() => orderSchema.id),
  productId: varchar('product_id').references(() => productSchema.id),
  quantity: integer('quantity'),
})
