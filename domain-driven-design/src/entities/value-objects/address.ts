export class Address {
  constructor(
    private _country: string,
    private _state: string,
    private _city: string,
    private _street: string,
    private _number: number,
    private _cep: string,
    private _complement?: string,
  ) {
    this.validate()
  }

  get country(): string {
    return this._country
  }

  get state(): string {
    return this._state
  }

  get city(): string {
    return this._city
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get cep(): string {
    return this._cep
  }

  get complement(): string | undefined {
    return this._complement
  }

  private validate(): void {
    if (!this._country.length) throw new Error('Country must not be empty')
    if (!this._city.length) throw new Error('City must not be empty')
    if (!this._number) throw new Error('Address must have a number')
    if (!this._street.length) throw new Error('Address must have a street')
  }
}
