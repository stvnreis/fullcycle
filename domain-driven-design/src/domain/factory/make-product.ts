import { faker } from '@faker-js/faker'
import { Product } from 'src/domain/entities/product'

export interface makeProductProps {
  id: string
  name: string
  value: number
}

export const makeProduct = (override: Partial<makeProductProps> = {}) => {
  return new Product(
    override.id ?? faker.string.uuid(),
    override.name ?? faker.commerce.product.name,
    override.value ?? faker.number.float({ max: 100000.0 }),
  )
}
