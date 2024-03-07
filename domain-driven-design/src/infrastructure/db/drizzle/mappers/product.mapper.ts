import { ProductMapperInterface } from 'src/domain/mappers/product-mapper.interface'
import { productSchema } from '../schemas'
import { Product } from 'src/domain/entities/product'

export class ProductMapper
  implements
    ProductMapperInterface<
      typeof productSchema.$inferInsert,
      typeof productSchema.$inferSelect
    >
{
  toDb(entity: Product): typeof productSchema.$inferInsert {
    return {
      id: entity.id,
      name: entity.name,
      value: entity.value,
    }
  }

  toDomain(entity: typeof productSchema.$inferSelect): Product {
    return new Product(entity.id, entity.name, entity.value)
  }
}
