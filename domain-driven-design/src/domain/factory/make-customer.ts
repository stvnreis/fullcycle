import { Customer } from 'src/domain/entities/customer'
import { Address } from 'src/domain/entities/value-objects/address'
import { CPF } from 'src/domain/entities/value-objects/cpf'
import { faker } from '@faker-js/faker'

export interface makeCustomerProps {
  id: string
  name: string
  address: Address
  cpf: CPF
  rewardPoints?: number
}

export const makeCustomer = (override: Partial<makeCustomerProps> = {}) => {
  return new Customer(
    override.id ?? faker.string.uuid(),
    override.name ?? faker.person.fullName(),
    override.cpf ?? new CPF(faker.string.alphanumeric({ length: 11 })),
    override.address ??
      new Address(
        faker.location.country(),
        faker.location.state(),
        faker.location.city(),
        faker.location.street(),
        parseInt(faker.location.buildingNumber()),
        faker.location.zipCode(),
      ),
    override.rewardPoints ?? 100,
  )
}
