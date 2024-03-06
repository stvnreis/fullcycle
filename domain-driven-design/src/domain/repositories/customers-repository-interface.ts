import { Customer } from '../entities/customer'
import { RepositoryInterface } from './repository-interface'

export interface CustomersRepositoryInterface
  extends RepositoryInterface<Customer> {}
