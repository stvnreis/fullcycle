import { OrderItem } from './order-item'

export class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[],
  ) {
    this.validate()
  }

  get id() {
    return this._id
  }

  get customerId() {
    return this._customerId
  }

  get items() {
    return this._items
  }

  get total(): number {
    return this._items.reduce((acc, item) => (acc += item.totalValue), 0)
  }

  private validate(): void {
    if (!this._id.length) throw new Error('Id must not be empty')
    if (!this._customerId.length)
      throw new Error('Customer id must not be empty')
    if (!this._items.length) throw new Error('Items must not be empty')
  }
}
