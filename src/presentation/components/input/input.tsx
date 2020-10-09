import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import FormContext from '@/presentation/context/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => setState({
    ...state,
    [event.target.name]: event.target.value
  })

  const getStatus = (): React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> => <i className="fas fa-times"></i>

  const getTitle = (): string => state.emailError

  return (
    <div className={Styles.inputWrapper}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
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
