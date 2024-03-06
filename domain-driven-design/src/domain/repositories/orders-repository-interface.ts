import { Order } from '../entities/order'
import { RepositoryInterface } from './repository-interface'

export interface OrdersRepositoryInterface extends RepositoryInterface<Order> {}
