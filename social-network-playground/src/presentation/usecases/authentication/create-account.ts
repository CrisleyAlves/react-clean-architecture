import { CreateAccountParams } from '@/domain/usecases'
import { LocalStorageAdapter } from '@/infra/storage/local-storage-adapter'
import { CreateAccount } from '@/main/factories/usecases/authentication/create-account'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

interface IUSE_CREATE_ACCOUNT {
  onChangeField (fieldName: string, fieldValue: string)
  createAccount (): Promise<void>
  isFormValid (): boolean
  onSubmitForm (): Promise<void>
  form: CreateAccountParams
  status: ISTATUS
}

interface ISTATUS {
  loading: boolean
  mainError: string
  errors: any
  isValid: boolean
}

const createAccountImpl = CreateAccount()
const localStorageAdapter = new LocalStorageAdapter()

const FORM_INITIAL_STATE: CreateAccountParams = {
  email: '',
  first_name: '',
  gender: '',
  last_name: '',
  password: ''
}

const STATUS_INITIAL_VALUE: ISTATUS = {
  loading: false,
  mainError: null,
  errors: [],
  isValid: false
}

function useCreateAccount (): IUSE_CREATE_ACCOUNT {
  const [form, setForm] = useState<CreateAccountParams>(FORM_INITIAL_STATE)
  const [status, setStatus] = useState<ISTATUS>(STATUS_INITIAL_VALUE)
  const history = useHistory()

  const onChangeField = (fieldName: string, fieldValue: string): void => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  const isFormValid = (): boolean => {
    const errors = createAccountImpl.validate(form)

    if (errors.length === 0) {
      setStatus({
        ...STATUS_INITIAL_VALUE,
        isValid: true
      })
      return true
    }

    setStatus({
      ...status,
      isValid: false,
      errors: errors
    })

    return false
  }

  const onSubmitForm = async (): Promise<void> => {
    const isValid = isFormValid()
    if (!isValid) {
      return
    }

    await createAccount()
  }

  const createAccount = async (): Promise<void> => {
    try {
      const user = await createAccountImpl.createAccount(form)
      localStorageAdapter.set('user', JSON.stringify(user))
      history.push('/homepage')
    } catch (error) {
      // server error here
    }
  }

  return {
    onChangeField,
    createAccount,
    isFormValid,
    onSubmitForm,
    form,
    status
  }
}

export default useCreateAccount
