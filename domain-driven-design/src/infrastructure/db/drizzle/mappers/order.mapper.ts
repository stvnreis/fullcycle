import { OrderMapperInterface } from 'src/domain/mappers/order-mapper.interface'
import { orderItemSchema, orderSchema } from '../schemas'
import { Order } from 'src/domain/entities/order'
import { OrderItem } from 'src/domain/entities/order-item'

export interface toDbResponse {
  order: typeof orderSchema.$inferInsert
  orderItems: (typeof orderItemSchema.$inferInsert)[]
}

export interface toDomainProps {
  order: typeof orderSchema.$inferSelect
  orderItems: (typeof orderItemSchema.$inferSelect)[]
}

export class OrderMapper
  implements OrderMapperInterface<toDbResponse, toDomainProps>
{
  toDb(entity: Order): toDbResponse {
    return {
      order: {
        id: entity.id,
        customerId: entity.customerId,
      },
      orderItems: entity.items.map((item) => {
        return {
          id: item.id,
          orderId: entity.id,
          productId: item.productId,
          quantity: item.quantity,
        }
      }),
    }
  }

  toDomain(entity: toDomainProps): Order {
    const items = entity.orderItems.map(
      (item) => new OrderItem(item.id, item.productId, 0, item.quantity),
    )

    return new Order(entity.order.id, entity.order.customerId, items)
  }
}
