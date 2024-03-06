import { makeProduct } from 'src/domain/factory/make-product'

describe('Product: unit', () => {
  it('should not be able to craete a product without an id', () => {
    expect(() => makeProduct({ id: '' })).toThrowError('Id must not be empty')
  })

  it('should not be able to craete a product without a name', () => {
    expect(() => makeProduct({ name: '' })).toThrowError(
      'Name must not be empty',
    )
  })

  it('should not be able to craete a product without a value', () => {
    expect(() => makeProduct({ value: 0 })).toThrowError(
      'Value must not be empty',
    )
  })

  it('should be able to create a product and change its value', () => {
    const product = makeProduct({ value: 100 })

    product.changeValue(product.value * 1.2)

    expect(product.value).toEqual(120)
  })

  it('should not be able to create a product and change its value to less than 0', () => {
    const product = makeProduct({ value: 100 })

    expect(() => product.changeValue(0)).toThrowError(
      'Value must not be less than or equal to 0',
    )
  })
})
