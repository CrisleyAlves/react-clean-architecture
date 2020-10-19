import React from 'react'
import faker from 'faker'

import { ValidationSpy } from '@/presentation/test'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Required field')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Required field')
    expect(passwordStatus.innerHTML).toBe('<i class="fas fa-times"></i>')
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
})
