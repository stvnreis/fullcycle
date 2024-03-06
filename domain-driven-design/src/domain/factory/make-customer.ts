import { Customer } from 'src/domain/entities/customer'
import { Address } from 'src/domain/entities/value-objects/address'
import { CPF } from 'src/domain/entities/value-objects/cpf'

export interface makeCustomerProps {
  id: string
  name: string
  address: Address
  cpf: CPF
  rewardPoints?: number
}

export const makeCustomer = (override: Partial<makeCustomerProps> = {}) => {
  return new Customer(
    override.id ?? 'id-1',
    override.name ?? 'name-1',
    override.cpf ?? new CPF('12345678910'),
    override.address ??
      new Address('country-1', 'state-1', 'city-1', 'street-1', 1, '00000000'),
    override.rewardPoints ?? 100,
  )
}
