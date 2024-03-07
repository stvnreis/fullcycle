import { makeOrder } from 'src/domain/factory/make-order'
import { db } from '../../connection'
import { OrderMapper } from '../mappers/order.mapper'
import {
  customerSchema,
  orderItemSchema,
  orderSchema,
  productSchema,
} from '../schemas'
import { OrdersRepository } from './orders-repository'
import { eq } from 'drizzle-orm'
import { makeCustomer } from 'src/domain/factory/make-customer'
import { makeProduct } from 'src/domain/factory/make-product'
import { CustomerMapper } from '../mappers/customer.mapper'
import { ProductMapper } from '../mappers/product.mapper'
import { makeOrderItem } from 'src/domain/factory/make-order-item'

describe('Orders Repository Test', () => {
  const customerMapper = new CustomerMapper()
  const productMapper = new ProductMapper()
  const orderMapper = new OrderMapper()
  const ordersRepository = new OrdersRepository(orderMapper)

  it('should be able to create an order', async () => {
    const customer = makeCustomer()
    const product = makeProduct()

    const customerData = customerMapper.toDb(customer)
    const productData = productMapper.toDb(product)

    const order = makeOrder({
      customerId: customer.id,
      items: [makeOrderItem({ productId: product.id })],
    })

    db.transaction(async (tx) => {
      await Promise.all([
        tx.insert(customerSchema).values({ ...customerData }),
        tx.insert(productSchema).values({ ...productData }),
      ])

      console.log(
        await tx.query.customerSchema.findFirst({
          where: eq(customerSchema.id, customer.id),
        }),
      )

      console.log(order.customerId)

      await ordersRepository.create(order)
    })

    const entity = await db
      .select()
      .from(orderSchema)
      .innerJoin(orderItemSchema, eq(orderItemSchema.orderId, orderSchema.id))
      .where(eq(orderSchema.id, order.id))

    expect(entity).toBeTruthy()
  })

  it('teste', async () => {
    const customer = makeCustomer()
    const product = makeProduct()
    const order = makeOrder({
      customerId: customer.id,
      items: [makeOrderItem({ productId: product.id })],
    })

    const productData = productMapper.toDb(product)
    const customerData = customerMapper.toDb(customer)
    const orderData = orderMapper.toDb(order)

    console.log(customer)
    db.transaction(async (tx) => {
      await Promise.all([
        tx.insert(productSchema).values({ ...productData }),
        tx.insert(customerSchema).values({ ...customerData }),
        tx.insert(orderSchema).values({ ...orderData.order }),
        tx.insert(orderItemSchema).values({ ...orderData.orderItems }),
      ])
    })

    await ordersRepository.findById(order.id)
  })
})
