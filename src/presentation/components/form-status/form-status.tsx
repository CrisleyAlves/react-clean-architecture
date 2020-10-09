import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'

import { Spinner } from '@/presentation/components/'
import { StateType } from '@/presentation/context/form/types';
import FormContext from '@/presentation/context/form/form-context';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext<StateType>(FormContext);

  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
