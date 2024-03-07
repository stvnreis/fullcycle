import { Order } from 'src/domain/entities/order'
import { OrdersRepositoryInterface } from 'src/domain/repositories/orders-repository-interface'
import { OrderMapper } from '../mappers/order.mapper'
import { db } from '../../connection'
import { orderItemSchema, orderSchema } from '../schemas'
import { eq } from 'drizzle-orm'

export class OrdersRepository implements OrdersRepositoryInterface {
  constructor(private readonly orderMapper: OrderMapper) {}

  async create(entity: Order): Promise<void> {
    const data = this.orderMapper.toDb(entity)

    db.transaction(async (tx) => {
      await Promise.all([
        tx.insert(orderSchema).values({ ...data.order }),
        tx.insert(orderItemSchema).values(data.orderItems),
      ])
    })
  }

  update(entity: Order): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Order> {
    const response = await db
      .select()
      .from(orderSchema)
      .leftJoin(orderItemSchema, eq(orderSchema.id, orderItemSchema.orderId))
      .where(eq(orderSchema.id, id))

    const entity = response[0]
    console.log(response)

    return this.orderMapper.toDomain({
      order: {
        id: entity.order.id,
        customerId: entity.order.customerId,
      },
      orderItems: [entity.order_item],
    })
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }
}
