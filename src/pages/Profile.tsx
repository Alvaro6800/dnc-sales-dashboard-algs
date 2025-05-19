import { Header, CardComponent, StyledButton } from '@/components'
import { useContext } from 'react'
import { AppThemeContext } from '@/contexts/AppThemeContext'

function Profile() {
  const themeContext = useContext(AppThemeContext)
  return (
    <>
      <Header />
      <CardComponent>
        <StyledButton className="primary" onClick={themeContext?.toggleTheme}>
          Trocar para tema{' '}
          {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
        </StyledButton>
      </CardComponent>
    </>
  )
}

export default Profile
