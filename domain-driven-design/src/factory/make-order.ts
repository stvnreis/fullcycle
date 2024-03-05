import { Order } from 'src/entities/order'
import { OrderItem } from 'src/entities/order-item'

interface makeOrderProps {
  id: string
  customerId: string
  items: OrderItem[]
}

export const makeOrder = (override: Partial<makeOrderProps> = {}) => {
  return new Order(
    override.id ?? 'id-1',
    override.customerId ?? 'customer-1',
    override.items ?? [new OrderItem('id-1', 'product-1', 20, 5)],
  )
}
