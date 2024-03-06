import { Customer } from 'src/entities/customer'
import { Order } from 'src/entities/order'
import { OrderItem } from 'src/entities/order-item'
import { Product } from 'src/entities/product'
import { randomUUID } from 'node:crypto'

export type placeOrderItem = {
  product: Product
  quantity: number
}

export interface OrderService {
  calculateTotalOfAllOrders(orders: Order[]): number
  placeOrder(customer: Customer, products: placeOrderItem[]): Order
}

export class DomainOrderService implements OrderService {
  calculateTotalOfAllOrders(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total, 0)
  }

  placeOrder(customer: Customer, items: placeOrderItem[]): Order {
    const orderItems = items.map(
      (item) =>
        new OrderItem(
          randomUUID(),
          item.product.id,
          item.product.value,
          item.quantity,
        ),
    )

    const order = new Order(randomUUID(), customer.id, orderItems)

    customer.addRewardPoints(order.total / 2)

    return order
  }
}
