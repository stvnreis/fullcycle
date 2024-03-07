import { makeProduct } from 'src/domain/factory/make-product'
import { db } from '../../connection'
import { ProductMapper } from '../mappers/product.mapper'
import { productSchema } from '../schemas'
import { ProductsRepository } from './products-repository'
import { eq } from 'drizzle-orm'
import { Product } from 'src/domain/entities/product'

describe('Products Repository Test', async () => {
  const productMapper = new ProductMapper()
  const productsRepository = new ProductsRepository(productMapper)

  it('should be able to create a product', async () => {
    const product = makeProduct()

    await productsRepository.create(product)

    const entityDb = await db.query.productSchema.findFirst({
      where: eq(productSchema.id, product.id),
    })
    const entity = productMapper.toDomain(entityDb)

    expect(entity).toMatchObject(product)
  })

  it('should be able to find all products', async () => {
    const numberOfProducts = 10

    const entities: Product[] = []
    for (let i = 0; i < numberOfProducts; i++) {
      entities.push(makeProduct())
    }

    const data = entities.map(productMapper.toDb)
    await db.insert(productSchema).values(data)

    const products = await productsRepository.findAll()

    expect(products.length).toBeGreaterThanOrEqual(numberOfProducts)
  })

  it('should be able to find an existing product by its id', async () => {
    const entity = makeProduct()

    const data = productMapper.toDb(entity)
    await db.insert(productSchema).values({ ...data })

    const product = await productsRepository.findById(entity.id)

    expect(product).toMatchObject(entity)
  })

  it('should be able to update an existing product', async () => {
    const product = makeProduct()
    const data = productMapper.toDb(product)

    await db.insert(productSchema).values({ ...data })

    const oldValue = product.value

    product.changeValue(product.value * 1.2)
    const changedProductData = productMapper.toDb(product)

    await db
      .update(productSchema)
      .set({ ...changedProductData })
      .where(eq(productSchema.id, product.id))

    const entityDb = await db.query.productSchema.findFirst({
      where: eq(productSchema.id, product.id),
    })
    const entity = productMapper.toDomain(entityDb)

    expect(entity).toMatchObject(product)
    expect(entity.value).toEqual(oldValue * 1.2)
  })
})
