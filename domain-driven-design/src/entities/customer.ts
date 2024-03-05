import { Address } from './value-objects/address'
import { CPF } from './value-objects/cpf'

export class Customer {
  private _isActive: boolean = true
  private _cpf: CPF
  private _address: Address

  constructor(
    private _id: string,
    private _name: string,
    cpf: CPF,
    address: Address,
  ) {
    this._cpf = cpf
    this._address = address

    this.validate()
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get address(): Address {
    return this._address
  }

  set id(id: string) {
    this._id = id
  }

  set name(name: string) {
    this._name = name

    this.validate()
  }

  get isActive() {
    return this._isActive
  }

  get CPF() {
    return this._cpf
  }

  changeAddress(address: Address): void {
    this._address = address
  }

  activate(): void {
    this._isActive = true
  }

  deactivate(): void {
    this._isActive = false
  }

  validate() {
    if (!this._id.length) throw new Error('Id must not be empty')

    if (!this._name.length) throw new Error('Name must not be empty')
  }
}
