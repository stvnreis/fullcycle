import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const customerSchema = pgTable('customer', {
  id: varchar('id').primaryKey(),
  name: varchar('name'),
  cpf: varchar('cpf', { length: 11 }),
  country: varchar('country'),
  state: varchar('state'),
  city: varchar('city'),
  street: varchar('street'),
  number: integer('number'),
  complement: varchar('complement'),
  zipCode: varchar('zip_code'),
  rewardPoints: integer('reward_points'),
})
