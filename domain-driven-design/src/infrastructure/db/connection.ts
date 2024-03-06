import { drizzle } from 'drizzle-orm/postgres-js'
import * as dbSchema from './drizzle/schemas'
import postgres from 'postgres'

const databaseUrl =
  process.env.DATABASE_URL || 'postgresql://docker:docker@localhost:5433/sales'

const client = postgres(databaseUrl)

export const db = drizzle(client, { schema: dbSchema })
