import { faker } from '@faker-js/faker'
import { Order } from 'src/domain/entities/order'
import { OrderItem } from 'src/domain/entities/order-item'

interface makeOrderProps {
  id: string
  customerId: string
  items: OrderItem[]
}

export const makeOrder = (override: Partial<makeOrderProps> = {}) => {
  return new Order(
    override.id ?? faker.string.uuid(),
    override.customerId ?? faker.string.uuid(),
    override.items ?? [
      new OrderItem(
        faker.string.uuid(),
        faker.string.uuid(),
        faker.number.float({ max: 1000.0 }),
        faker.number.int({ max: 10000 }),
      ),
    ],
  )
}
