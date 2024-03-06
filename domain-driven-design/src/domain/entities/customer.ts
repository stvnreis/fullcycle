import { Address } from './value-objects/address'
import { CPF } from './value-objects/cpf'

export class Customer {
  private _isActive: boolean = true
  private _cpf: CPF
  private _address: Address
  private _rewardPoints: number

  constructor(
    private _id: string,
    private _name: string,
    cpf: CPF,
    address: Address,
    _rewardPoints?: number,
  ) {
    this._cpf = cpf
    this._address = address
    this._rewardPoints = _rewardPoints ?? 0

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

  get rewardPoints(): number {
    return this._rewardPoints
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

  addRewardPoints(points: number): void {
    this._rewardPoints += points
  }

  validate() {
    if (!this._id.length) throw new Error('Id must not be empty')

    if (!this._name.length) throw new Error('Name must not be empty')
  }
}
