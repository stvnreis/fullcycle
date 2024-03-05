import { makeCustomer } from 'src/factory/make-customer'
import { Address } from './value-objects/address'

describe('unit: Customer', () => {
  it('should throw error when id is empty', () => {
    expect(() => makeCustomer({ id: '' })).toThrowError('Id must not be empty')
  })

  it('should throw error when name is empty', () => {
    expect(() => makeCustomer({ name: '' })).toThrowError(
      'Name must not be empty',
    )
  })

  it('should be able to change name', () => {
    // Arrange
    const newName = 'Steven de Luca Reis'
    const consumer = makeCustomer()

    // Act
    consumer.name = newName

    // Assert
    expect(consumer.name).toEqual(newName)
  })

  it('should be able to activate customer', () => {
    // Arrange
    const consumer = makeCustomer()

    // Act
    consumer.activate()

    // Assert
    expect(consumer.isActive).toBeTruthy()
  })

  it('should be able to deactivate customer', () => {
    // Arrange
    const consumer = makeCustomer()

    // Act
    consumer.deactivate()

    // Assert
    expect(consumer.isActive).toBeFalsy()
  })

  it('should be able to change address', () => {
    // Arrange
    const consumer = makeCustomer()
    const newAddress = new Address(
      'country-2',
      'state-2',
      'city-2',
      'street-2',
      2,
      '00000000',
    )

    // Act
    consumer.changeAddress(newAddress)

    // Assert
    expect(consumer.address).toMatchObject(newAddress)
  })
})
