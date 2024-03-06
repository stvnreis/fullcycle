import { makeOrder } from 'src/domain/factory/make-order'
import { OrderItem } from './order-item'

describe('Order: unit', () => {
  it('should not be able to create an order without items', () => {
    expect(() => {
      makeOrder({ items: [] })
    }).toThrowError('Items must not be empty')
  })

  it('should not be able to create an order without a customer', () => {
    expect(() => {
      makeOrder({ customerId: '' })
    }).toThrowError('Customer id must not be empty')
  })

  it('should be able to create an order', () => {
    const numberOfItems = 3

    const items: OrderItem[] = []
    for (let i = 0; i < numberOfItems; i++) {
      const item = new OrderItem(i.toString(), `item-${i}`, 10, i + 1)

      items.push(item)
    }

    const order = makeOrder({ items })

    expect(order.items.length).toEqual(numberOfItems)
    expect(order.total).toEqual(60)
  })
})
