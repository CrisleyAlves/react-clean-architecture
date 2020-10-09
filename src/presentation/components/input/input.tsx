import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import FormContext from '@/presentation/context/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(FormContext)
  
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = () => <i className="fas fa-times"></i>;

  const getTitle = () => errorState[props.name];

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} readOnly onFocus={enableInput} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}>
          {getStatus()}
        </span>
    </div>
  )
}

export default Input
