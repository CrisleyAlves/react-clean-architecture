import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'

import { Spinner } from '@/presentation/components/'
import FormContext from '@/presentation/context/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
