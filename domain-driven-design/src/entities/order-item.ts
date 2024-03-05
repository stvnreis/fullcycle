export class OrderItem {
  constructor(
    private _id: string,
    private _productId: string,
    private _unitaryValue: number,
    private _quantity: number,
  ) {}

  get id() {
    return this._id
  }

  get productId(): string {
    return this._productId
  }

  get quantity(): number {
    return this._quantity
  }

  get totalValue(): number {
    return this._quantity * this._unitaryValue
  }
}
