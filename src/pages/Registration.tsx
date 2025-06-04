import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import {
  BannerImage,
  FormComponent,
  StyledH1,
  StyledP,
  StyledUl,
  Logo,
} from '@/components'
import { Box, Container, Grid } from '@mui/material'

// Utils
import { pxToRem } from '@/utils'

// Hooks
import { useFormValidation, usePost } from '@/hooks'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux'
import { setMessage, setProfileData } from '@/redux/slices/createProfile'

// Types
import type { CreateProfileData, InputProps } from '@/types'

function Registration() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email } = useSelector((state: RootState) => state.createProfile)
  const { data, loading, error, postData } = usePost<string, CreateProfileData>(
    'profile/create'
  )

  // Form Step 1
  const stepOneInputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(
      setProfileData({
        email: String(stepOneFormValues[1]),
      })
    )
  }

  const {
    formValues: stepOneFormValues,
    formValid: stepOneFormValid,
    handleChange: stepOneHandleChange,
  } = useFormValidation(stepOneInputs)

  // End Form Step 1

  // Form Step 2
  const stepTwoInputs: InputProps[] = [
    { type: 'password', placeholder: 'Senha' },
  ]

  const handleStepTwo = async (e: React.FormEvent) => {
    e.preventDefault()
    await postData({
      name: String(stepOneFormValues[0]),
      email: String(stepOneFormValues[1]),
      phone: String(stepOneFormValues[2]),
      password: String(stepTwoFormValues[0]),
    })
  }

  const {
    formValues: stepTwoFormValues,
    formValid: stepTwoFormValid,
    handleChange: stepTwoHandleChange,
  } = useFormValidation(stepTwoInputs)

  const handleStepInputs = email ? stepTwoInputs : stepOneInputs

  // End Form Step 2

  useEffect(() => {
    if (data !== null) {
      dispatch(setMessage('Usuário criado com sucesso'))
      navigate('/')
    } else if (error) {
      alert(
        `Não foi possível realizar a operação. Entre em contato com o nosso suporte. Erro: (${error}).`
      )
    }
  }, [data, error, navigate])

  return (
    <>
      <Box>
        <Grid container>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ alignItems: 'center', display: 'flex', height: '100vh' }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <Logo height={41} width={100} />
              </Box>
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1>
                  {email ? 'Defina sua Senha' : 'Faça seu Cadastro'}
                </StyledH1>
                <StyledP>
                  {email
                    ? 'Sua senha deve ter:'
                    : 'Primeiro, diga-nos quem você é.'}
                </StyledP>
                {email && (
                  <StyledUl>
                    <li>Entre 8 e 16 caracteres;</li>
                    <li>Pelo menos uma letra maiúscula;</li>
                    <li>Pelo menos um caractere especial;</li>
                    <li>Pelo menos um número;</li>
                  </StyledUl>
                )}
              </Box>
              <FormComponent
                inputs={handleStepInputs.map((input, index) => ({
                  type: input.type,
                  placeholder: input.placeholder,
                  value: email
                    ? stepTwoFormValues[index] || ''
                    : stepOneFormValues[index] || '',
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    email
                      ? stepTwoHandleChange(
                          index,
                          (e.target as HTMLInputElement).value
                        )
                      : stepOneHandleChange(
                          index,
                          (e.target as HTMLInputElement).value
                        ),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled: email
                      ? !stepTwoFormValid || loading
                      : !stepOneFormValid,
                    onClick: email ? handleStepTwo : handleStepOne,
                    type: 'submit',
                    children: email ? 'Enviar' : 'Próximo',
                  },
                ]}
              />
            </Container>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Registration
