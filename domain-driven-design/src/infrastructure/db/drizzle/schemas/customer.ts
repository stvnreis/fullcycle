import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const customer = pgTable('customer', {
  id: varchar('id'),
  name: varchar('name'),
  cpf: varchar('cpf', { length: 11 }),
  country: varchar('country'),
  city: varchar('city'),
  street: varchar('street'),
  number: integer('number'),
  complement: varchar('complement'),
  zipCode: varchar('zip_code'),
})
