export class Product {
  constructor(private _id: string, private _name: string, private _value: number) {
    this.validate()
  }

  get id() {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get value() {
    return this._value
  }

  changeValue(value: number): void {
    if (value <= 0) throw new Error('Value must not be less than or equal to 0')

    this._value = value
  }

  private validate(): void {
    if (!this._id.length) throw new Error('Id must not be empty')
    if (!this._name.length) throw new Error('Name must not be empty')
    if (!this._value) throw new Error('Value must not be empty')
  }
}