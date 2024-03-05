import { OrderItem } from "./order-item";

export class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[]
  ) { }

  get id() {
    return this._id
  }

  get customerId() {
    return this._customerId
  }

  get items() {
    return this._items
  }

  // get total(): number {
  //   return this._items.reduce((acc, item) => acc.totalValue += item.totalValue)
  // }
}