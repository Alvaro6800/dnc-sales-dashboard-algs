import styled from 'styled-components'
import { StyledButton, StyledInput, StyledH2 } from '@/components'
import type { FormComponentProps } from '@/types'
import { pxToRem } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { setProfileData } from '@/redux/slices/createProfile'
import { useDispatch, useSelector } from 'react-redux'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${pxToRem(16)};
`

function FormComponent(props: FormComponentProps) {
  const { inputs, buttons, message, linkPath, linkText } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const resetReduxEmail = (linkPath: string) => {
    dispatch(
      setProfileData({
        email: String(''),
      })
    )

    navigate(linkPath)
  }

  return (
    <StyledForm>
      {inputs.map((inputProps, index) => (
        <StyledInput key={index} {...inputProps} />
      ))}
      {linkPath && linkText && (
        <StyledH2
          onClick={() => resetReduxEmail(linkPath)}
          style={{ cursor: 'pointer' }}
          className="link"
        >
          {linkText}
        </StyledH2>
      )}
      {buttons.map((buttonsProps, index) => (
        <StyledButton key={index} {...buttonsProps} />
      ))}
      {message && (
        <div style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.msg}
        </div>
      )}
    </StyledForm>
  )
}

export default FormComponent
