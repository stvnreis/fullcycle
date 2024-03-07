import { Product } from '../entities/product'
import { MapperInterface } from './mapper-interface'

export interface ProductMapperInterface<J, K>
  extends MapperInterface<Product, J, K> {}
