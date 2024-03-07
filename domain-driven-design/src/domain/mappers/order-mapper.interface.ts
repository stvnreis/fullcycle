import { Order } from '../entities/order'
import { MapperInterface } from './mapper-interface'

export interface OrderMapperInterface<J, K>
  extends MapperInterface<Order, J, K> {}
