import { Customer } from './entities/customer'
import { Order } from './entities/order'
import { OrderItem } from './entities/order-item'
import { Product } from './entities/product'
import { Address } from './entities/value-objects/address'
import { CPF } from './entities/value-objects/cpf'

const main = () => {
  const cpf = new CPF('12345678910')
  const address = new Address(
    'Brasil',
    'São Paulo',
    'Birigui',
    'Ipiranga',
    231,
    '16203085',
  )
  const customer = new Customer('123', 'Steven Reis', cpf, address)

  const product = new Product('1234', 'Alexa Echo dot 5', 400)

  const orderItem = new OrderItem('12345', product.id, 1, 4)
  const order = new Order('10000', customer.id, [orderItem])

  console.log(order)
}

main()
