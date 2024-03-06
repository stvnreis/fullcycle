import { Product } from 'src/domain/entities/product'
import { makeProduct } from 'src/domain/factory/make-product'
import { DomainProductService, ProductService } from './product.service'

describe('unit: Product Service', () => {
  let productService: ProductService

  beforeEach(() => {
    productService = new DomainProductService()
  })

  it('should change the prices of all products', () => {
    const numberOfProducts = 10

    const products: Product[] = []
    for (let i = 0; i < numberOfProducts; i++) {
      const product = makeProduct({ value: 10 })

      products.push(product)
    }

    productService.increasePrice(products, 100)

    expect(products[0].value).toEqual(20)
  })
})
