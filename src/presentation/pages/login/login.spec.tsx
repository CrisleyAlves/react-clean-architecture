import React from 'react'

import { render, RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut();

    const errorWrapper = sut.getByTestId('error-wrapper')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Required field')
    
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Required field') 
    expect(passwordStatus.innerHTML).toBe('<i class="fas fa-times"></i>')
  })
})
