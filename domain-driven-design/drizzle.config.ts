import type { Config } from 'drizzle-kit'

export default {
  schema: './src/infrastructure/db/drizzle/schemas',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      'postgresql://docker:docker@localhost:5433/sales',
  },
} satisfies Config
