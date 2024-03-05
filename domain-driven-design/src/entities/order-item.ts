export class OrderItem {
  constructor(
    private _id: string,
    private _productId: string,
    private _unitaryValue: number,
    private _quantity: number,
  ) {
    this.validate()
  }

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

  private validate(): void {
    if (!this._productId.length) throw new Error('Product id must not be empty')
    if (this._unitaryValue <= 0)
      throw new Error('Unitary value must be greater than zero')
    if (this._quantity <= 0)
      throw new Error('Quantity must be greater than zero')
  }
}
