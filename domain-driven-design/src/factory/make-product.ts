import { Product } from 'src/entities/product'

export interface makeProductProps {
  id: string
  name: string
  value: number
}

export const makeProduct = (override: Partial<makeProductProps> = {}) => {
  return new Product(
    override.id ?? 'id-1',
    override.name ?? 'name-1',
    override.value ?? 20,
  )
}
