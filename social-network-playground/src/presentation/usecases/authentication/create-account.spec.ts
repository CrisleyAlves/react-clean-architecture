import { mockCreateAccount } from '@/domain/test'
import { renderHook, act } from '@testing-library/react-hooks'
import createAccount from './create-account'

describe('Name of the group', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should have invalid form values', async () => {
    const { result, unmount, waitForNextUpdate } = renderHook(() => createAccount())

    await act(async () => {
      result.current.isFormValid()
      await waitForNextUpdate()
    })
    expect(result.current.status.isValid).toBe(false)
    expect(result.current.status.errors.length).toBe(5)
    unmount()
  })

  test('Should submit form after populating fields', async () => {
    const { result, unmount, waitForNextUpdate } = renderHook(() => createAccount())

    const mockedCreatAccount = mockCreateAccount()

    await act(async () => {
      result.current.onChangeField('first_name', mockedCreatAccount.first_name)
      await waitForNextUpdate()
    })

    await act(async () => {
      result.current.onChangeField('last_name', mockedCreatAccount.last_name)
      await waitForNextUpdate()
    })

    await act(async () => {
      result.current.onChangeField('gender', mockedCreatAccount.gender)
      await waitForNextUpdate()
    })

    await act(async () => {
      result.current.onChangeField('email', mockedCreatAccount.email)
      await waitForNextUpdate()
    })

    await act(async () => {
      result.current.onChangeField('password', mockedCreatAccount.password)
      await waitForNextUpdate()
    })

    await act(async () => {
      result.current.isFormValid()
      await waitForNextUpdate()
    })

    const spyOnSubmitForm = jest.spyOn(result.current, 'onSubmitForm')

    await act(async () => await result.current.onSubmitForm())

    expect(result.current.form).toEqual(mockedCreatAccount)
    expect(result.current.status.isValid).toBe(true)
    expect(spyOnSubmitForm).toHaveBeenCalledTimes(1)
    unmount()
  })
})
