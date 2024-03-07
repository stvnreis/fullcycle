import { Customer } from '../entities/customer'
import { MapperInterface } from './mapper-interface'

export interface CustomerMapperInterface<J, K>
  extends MapperInterface<Customer, J, K> {}
