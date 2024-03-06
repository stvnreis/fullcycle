import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const connection = postgres('', {
  user: 'docker',
  password: 'docker',
  database: 'sales',
  host: 'localhost',
  port: 5433,
})
const db = drizzle(connection)

await migrate(db, { migrationsFolder: 'drizzle' })
await connection.end()

process.exit()
