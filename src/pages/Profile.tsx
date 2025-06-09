/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Header,
  CardComponent,
  StyledButton,
  StyledH2,
  FormComponent,
} from '@/components'
import { useContext, type ChangeEvent, useEffect, useState } from 'react'
import { AppThemeContext } from '@/contexts/AppThemeContext'
import { Container, Grid } from '@mui/material'
import { logout } from '@/services'
import type {
  InputProps,
  ProfileData,
  ProfileEditableDate,
  MessageProps,
} from '@/types'
import { useFormValidation, useGet, usePut, useDelete } from '@/hooks'
import Cookies from 'js-cookie'

function Profile() {
  const themeContext = useContext(AppThemeContext)

  //Hooks
  const [updateMessage, setUpdateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })

  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({
        type: 'success',
        msg: '',
      })
    }, 3000)
  }

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useGet<ProfileData>('profile')

  const {
    data: profileUpdateData,
    putData: profilePutData,
    loading: profileUpdatedLoading,
    error: profileUpdatedError,
  } = usePut<ProfileEditableDate>('profile/update')

  const { deleteData: profileDeleteData, loading: profileDeleteLoading } =
    useDelete('profile/delete')

  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name)
      handleChange(1, profileData.email)
      handleChange(2, profileData.phone)
    }
  }, [profileData])

  //Form
  const inputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', disabled: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await profilePutData({
      name: String(formValues[0]),
      phone: String(formValues[2]),
    })
  }
  const handleDelete = async () => {
    if (
      confirm(
        'Deseja realmente excluir sua Conta? Certifique-se que deletou seus Leads antes deste processo!'
      )
    ) {
      try {
        await profileDeleteData()
        alert('Perfil deletado com sucesso!')
        Cookies.remove('Authorization')
        window.location.href = '/'
      } catch (e) {
        alert(
          'Não foi possível realizar a operação. Entre em contato com nosso suporte'
        )
      }
    }
  }

  useEffect(() => {
    if (profileUpdateData !== null) {
      setUpdateMessage({
        type: 'success',
        msg: 'Perfil Atualizado com sucesso',
      })
    } else if (profileUpdatedError) {
      setUpdateMessage({
        type: 'error',
        msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte',
      })
    }

    clearMessage()
  }, [profileUpdateData, profileUpdatedError])

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            {!profileError && (
              <CardComponent
                className={
                  profileLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
                }
              >
                {!profileLoading && profileData && (
                  <>
                    <StyledH2 className="mb-1">Seus Dados</StyledH2>
                    <FormComponent
                      inputs={inputs.map((input, index) => ({
                        ...input,
                        type: input.type,
                        placeholder: input.placeholder,
                        value: formValues[index] || '',
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(
                            index,
                            (e.target as HTMLInputElement).value
                          ),
                      }))}
                      buttons={[
                        {
                          className: 'primary',
                          disabled: !formValid || profileUpdatedLoading,
                          id: 'update-profile',
                          type: 'submit',
                          onClick: handleSubmit,
                          children: profileUpdatedLoading
                            ? 'Aguarde...'
                            : 'Atualizar meu perfil',
                        },
                        {
                          className: 'alert',
                          disabled: profileDeleteLoading,
                          id: 'delete-profile',
                          type: 'button',
                          onClick: handleDelete,
                          children: profileDeleteLoading
                            ? 'Aguarde...'
                            : 'Excluir minha Conta',
                        },
                      ]}
                      message={updateMessage}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CardComponent>
              <StyledH2 className="mb-1">Definições de Conta</StyledH2>
              <StyledButton
                id="theme-switch"
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema{' '}
                {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
              </StyledButton>
              <StyledButton id="logout" className="alert" onClick={logout}>
                Logout
              </StyledButton>
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
