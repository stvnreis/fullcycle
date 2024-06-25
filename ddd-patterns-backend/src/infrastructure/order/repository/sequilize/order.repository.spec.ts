import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it('should be able to update an order', async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const newProduct = new Product("2", "Product 2", 20)
    
    await productRepository.create(newProduct)
    
    const newItem = new OrderItem(
      "2", 
      newProduct.name, 
      newProduct.price, 
      newProduct.id, 
      3
    )
    order.changeItems([newItem])

    await orderRepository.update(order)

    const entity = await orderRepository.find(order.id)

    expect(entity.items).toHaveLength(1)
    expect(entity.items[0]).toMatchObject(newItem)
    expect(entity.total()).toEqual(60)
  })

  it('should be able to find an order by its id', async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const entity = await orderRepository.find(order.id)

    expect(entity).toMatchObject(order)
    expect(entity.items).toHaveLength(1)
    expect(entity.items[0]).toMatchObject(orderItem)
  })

  it('should be able to fetch 10 orders', async () => {

    const orderRepository = new OrderRepository();

    for (let i = 1; i <= 10; i++) {

      const customerRepository = new CustomerRepository();
      const customer = new Customer(i.toString(), `Customer ${i}`);
      const address = new Address(`Street ${i}`, i, "Zipcode 1", `City ${i}`);
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product(i.toString(), `Product ${i}`, 10);
      await productRepository.create(product);

      const orderItem = new OrderItem(
        i.toString(),
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order(i.toString(), i.toString(), [orderItem]);

      await orderRepository.create(order);
    }

    const orders = await orderRepository.findAll()

    expect(orders).toHaveLength(10)
    expect(orders[0].items).toHaveLength(1)
    expect(orders[0].items[0].name).toMatch('Product 1')
  })
});
