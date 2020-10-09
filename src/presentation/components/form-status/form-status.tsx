import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'

import { Spinner } from '@/presentation/components/'
import FormContext from '@/presentation/context/form/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext)
  const { isLoading } = state;
  const { main } = errorState;
 
  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {main && <span className={Styles.error}>{main}</span>}
    </div>
  )
}

export default FormStatus
