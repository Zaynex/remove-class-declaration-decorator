import {transform} from 'babel-core'
import removeDecoratorPlugin from './index.js'

const classDecorator = `
  const TestDecorator = (target) => {
    target.decoratedProperty = true

    return target
  }

  @TestDecorator
  class TestClass {}

  return TestClass
`

test('has class decorators', () => {
  const {code} = transform(classDecorator, {
    plugins: ['transform-decorators-legacy'],
    parserOpts: {
      allowReturnOutsideFunction: true,
    }
  })

  const fn = new Function(code)

  expect(new fn().decoratedProperty).toBe(true)
})

test('strips class decorators', () => {
  const {code} = transform(classDecorator, {
    plugins: [removeDecoratorPlugin, 'transform-decorators-legacy'],
    parserOpts: {
      allowReturnOutsideFunction: true,
    }
  })
  const fn = new Function(code)

  expect(new fn().decoratedProperty).toBe(undefined)

})

test('test ignore decorator', () => {
  const { code } = transform(classDecorator, {
    plugins: [[removeDecoratorPlugin, {ignoreItems: ['TestDecorator']}], 'transform-decorators-legacy'],
    parserOpts: {
      allowReturnOutsideFunction: true,
    }
  })

  const fn = new Function(code)

  expect(fn().decoratedProperty).toBe(true)
})
