import { Customer } from 'src/domain/entities/customer'
import { CustomersRepositoryInterface } from 'src/domain/repositories/customers-repository-interface'
import { db } from '../../connection'
import { customerSchema } from '../schemas'
import { eq } from 'drizzle-orm'
import { CustomerMapper } from '../mappers/customer.mapper'

export class CustomersRepository implements CustomersRepositoryInterface {
  constructor(private readonly customerMapper: CustomerMapper) {}

  async create(entity: Customer): Promise<void> {
    const data = this.customerMapper.toDb(entity)

    await db.insert(customerSchema).values({ ...data })
  }

  async update(entity: Customer): Promise<void> {
    const data = this.customerMapper.toDb(entity)

    await db
      .update(customerSchema)
      .set({ ...data })
      .where(eq(customerSchema.id, entity.id))
  }

  async findById(id: string): Promise<Customer> {
    const entity = await db.query.customerSchema.findFirst({
      where: eq(customerSchema.id, id),
    })
    if (!entity) return null

    return this.customerMapper.toDomain(entity)
  }

  async findAll(): Promise<Customer[]> {
    const customers = await db.select().from(customerSchema)

    return customers.map(this.customerMapper.toDomain)
  }
}
