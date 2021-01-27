import React from 'react'
import faker from 'faker'

import { ValidationSpy } from '@/manguinho/presentation/test'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = 'any_error'

  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterAll(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()

    const errorWrapper = sut.getByTestId('error-wrapper')
    expect(errorWrapper.childElementCount).toBe(0)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('')
    expect(passwordStatus.innerHTML).toBe('<i></i>')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.random.words(1)

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('Should show email error if validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
  })

  test('Should enable submit button if form is valid', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = ''

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })
})
