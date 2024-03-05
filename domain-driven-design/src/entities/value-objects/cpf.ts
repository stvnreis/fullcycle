export class CPF {
  private _value: string

  constructor(value: string) {
    this._value = value

    this.validate()
  }

  public toString(): string {
    return this._value
  }

  public toMaskedString(): string {
    const firstThreeDigits = this._value.substring(0, 3)
    const secondThreeDigits = this._value.substring(3, 6)
    const thirdThreeDigits = this._value.substring(6, 9)
    const lastTwoDigits = this._value.substring(9, 11)

    return `${firstThreeDigits}.${secondThreeDigits}.${thirdThreeDigits}-${lastTwoDigits}`
  }

  private validate(): void {
    if (this._value.length !== 11) throw new Error('CPF must have 11 digits')
  }
}