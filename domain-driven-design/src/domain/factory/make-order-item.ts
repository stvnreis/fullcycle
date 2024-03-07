import { faker } from '@faker-js/faker'
import { OrderItem } from '../entities/order-item'

export interface makeOrderItemProps {
  id: string
  orderId: string
  productId: string
  unitaryValue: number
  quantity: number
}

export const makeOrderItem = (override: Partial<makeOrderItemProps> = {}) => {
  return new OrderItem(
    override.id ?? faker.string.uuid(),
    override.productId ?? faker.string.uuid(),
    override.unitaryValue ?? faker.number.float({ max: 10000.0 }),
    override.quantity ?? faker.number.int({ max: 1000 }),
  )
}
