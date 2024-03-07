import { Customer } from 'src/domain/entities/customer'
import { customerSchema } from '../schemas'
import { CPF } from 'src/domain/entities/value-objects/cpf'
import { Address } from 'src/domain/entities/value-objects/address'
import { CustomerMapperInterface } from 'src/domain/mappers/customer-mapper.interface'

export class CustomerMapper
  implements
    CustomerMapperInterface<
      typeof customerSchema.$inferInsert,
      typeof customerSchema.$inferSelect
    >
{
  toDb(entity: Customer): typeof customerSchema.$inferInsert {
    return {
      id: entity.id,
      name: entity.name,
      cpf: entity.CPF.toString(),
      country: entity.address.country,
      state: entity.address.state,
      city: entity.address.city,
      street: entity.address.street,
      complement: entity.address.complement,
      number: entity.address.number,
      zipCode: entity.address.cep,
      rewardPoints: entity.rewardPoints ?? 0,
    }
  }

  toDomain(entity: typeof customerSchema.$inferSelect): Customer {
    return new Customer(
      entity.id,
      entity.name,
      new CPF(entity.cpf),
      new Address(
        entity.country,
        entity.state,
        entity.city,
        entity.street,
        entity.number,
        entity.zipCode,
        entity.complement,
      ),
      entity.rewardPoints,
    )
  }
}
