import { Product } from '../entities/product'
import { RepositoryInterface } from './repository-interface'

export interface ProductsRepositoryInterface
  extends RepositoryInterface<Product> {}
