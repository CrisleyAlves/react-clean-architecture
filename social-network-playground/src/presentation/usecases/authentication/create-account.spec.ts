import { renderHook, act } from '@testing-library/react-hooks'
import createAccount from './create-account'

test('should increment counter', () => {
  const { result } = renderHook(() => createAccount())

  act(() => {
    result.current.isFormValid()
  })

  expect(result.current.status.isValid).toBe(false)
})
