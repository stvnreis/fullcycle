import { Product } from 'src/domain/entities/product'

export interface ProductService {
  updateMany(): void
  increasePrice(products: Product[], percentage: number): void
}

export class DomainProductService implements ProductService {
  updateMany(): void {
    throw new Error('Method not implemented.')
  }

  increasePrice(products: Product[], percentage: number): void {
    products.forEach((product) =>
      product.changeValue(product.value + (product.value * percentage) / 100),
    )
  }
}
