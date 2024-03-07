import { makeCustomer } from 'src/domain/factory/make-customer'
import { db } from '../../connection'
import { customerSchema } from '../schemas'
import { CustomersRepository } from './customers-repository'
import { CustomerMapper } from '../mappers/customer.mapper'
import { Customer } from 'src/domain/entities/customer'
import { eq } from 'drizzle-orm'

describe('Customers Repository Test', () => {
  const customerMapper = new CustomerMapper()
  const customersRepository = new CustomersRepository(customerMapper)

  it('should be able to create a customer', async () => {
    const customer = makeCustomer()
    const data = customerMapper.toDb(customer)

    await db.insert(customerSchema).values({ ...data })

    const entityDb = await db.query.customerSchema.findFirst({
      where: eq(customerSchema.id, customer.id),
    })
    const entity = customerMapper.toDomain(entityDb)

    expect(entity).toMatchObject(customer)
  })

  it('should be able to find customer by their id', async () => {
    const entity = makeCustomer()
    const data = customerMapper.toDb(entity)

    await db.insert(customerSchema).values({ ...data })

    const customer = await customersRepository.findById(entity.id)

    expect(customer).toMatchObject(entity)
  })

  it('should be able to fetch customers from db', async () => {
    const numberOfCustomers = 20
    const customers: Customer[] = []
    for (let i = 0; i < numberOfCustomers; i++) {
      customers.push(makeCustomer())
    }

    const data = customers.map(customerMapper.toDb)
    await db.insert(customerSchema).values(data)

    const entities = await customersRepository.findAll()

    expect(entities.length).toBeGreaterThanOrEqual(numberOfCustomers)
  })

  it('should be able to update an existing customer', async () => {
    const customer = makeCustomer()
    const data = customerMapper.toDb(customer)

    await db.insert(customerSchema).values({ ...data })

    const newCustomer = makeCustomer({ id: customer.id })
    await customersRepository.update(newCustomer)

    const entityDb = await db.query.customerSchema.findFirst({
      where: eq(customerSchema.id, customer.id),
    })
    const entity = customerMapper.toDomain(entityDb)

    expect(entity).toMatchObject(newCustomer)
  })
})
