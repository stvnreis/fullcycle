import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async find(id: string): Promise<Order> {

    const order = await OrderModel.findByPk(id)
    const items = await OrderItemModel.findAll({ where: { order_id: id } })

    return this.mapToDomain(order, items)
  }

  async findAll(): Promise<Order[]> {

    const orders = await OrderModel.findAll()
    const items = await OrderItemModel.findAll()

    return orders.map((order) => {

      const orderItems = items.filter((item) => item.order_id = order.id)

      return this.mapToDomain(order, orderItems)
    })
  }

  async update(entity: Order): Promise<void> {

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id }
      })

    entity.items.forEach(async (item) => {

      await OrderItemModel.update({

        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }, { where: { order_id: entity.id } })
    })
  }

  private mapToDomain(order: OrderModel, items: OrderItemModel[]): Order {

    return new Order(order.id, order.customer_id, items.map(this.mapItemToDomain))
  }

  private mapItemToDomain(item: OrderItemModel): OrderItem {

    return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
  }
}
