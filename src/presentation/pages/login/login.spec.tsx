import React from 'react'

import { render } from '@testing-library/react'
import Login from './login'
import { debug } from 'console'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId, debug } = render(<Login />)

    const errorWrapper = getByTestId('error-wrapper')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Required field')
    
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Required field') 
    expect(passwordStatus.innerHTML).toBe('<i class="fas fa-times"></i>'
  })
})
