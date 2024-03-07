import { Product } from 'src/domain/entities/product'
import { ProductsRepositoryInterface } from 'src/domain/repositories/products-repository-interface'
import { ProductMapper } from '../mappers/product.mapper'
import { db } from '../../connection'
import { productSchema } from '../schemas'
import { eq } from 'drizzle-orm'

export class ProductsRepository implements ProductsRepositoryInterface {
  constructor(private readonly productMapper: ProductMapper) {}

  async create(entity: Product): Promise<void> {
    const data = this.productMapper.toDb(entity)

    await db.insert(productSchema).values({ ...data })
  }

  async update(entity: Product): Promise<void> {
    const data = this.productMapper.toDb(entity)

    await db
      .update(productSchema)
      .set({ ...data })
      .where(eq(productSchema.id, entity.id))
  }

  async findById(id: string): Promise<Product> {
    const entity = await db.query.productSchema.findFirst({
      where: eq(productSchema.id, id),
    })
    if (!entity) return null

    return this.productMapper.toDomain(entity)
  }

  async findAll(): Promise<Product[]> {
    const entities = await db.query.productSchema.findMany()

    return entities.map(this.productMapper.toDomain)
  }
}
