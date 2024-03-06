import { Order } from 'src/entities/order'
import { DomainOrderService, OrderService } from './order.service'
import { makeOrder } from 'src/factory/make-order'
import { OrderItem } from 'src/entities/order-item'
import { makeCustomer } from 'src/factory/make-customer'
import { makeProduct } from 'src/factory/make-product'

describe('unit: Order Service', () => {
  let orderService: OrderService

  beforeEach(() => {
    orderService = new DomainOrderService()
  })

  it('should be able to get total of all orders', () => {
    const numberOfOrders = 20

    const orders: Order[] = []
    for (let i = 0; i < numberOfOrders; i++) {
      const order = makeOrder({
        items: [new OrderItem('order-item', 'product-1', 20, 3)],
      })

      orders.push(order)
    }

    const total = orderService.calculateTotalOfAllOrders(orders)

    expect(total).toEqual(1200)
  })

  it('should be able to place an order', () => {
    const rewardPoints = 20
    const customer = makeCustomer({ rewardPoints })
    const product = makeProduct({ value: 100 })

    const order = orderService.placeOrder(customer, [{ product, quantity: 2 }])

    expect(customer.rewardPoints).toBe(rewardPoints + order.total / 2)
    expect(order.total).toBe(200)
  })
})
