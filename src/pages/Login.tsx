import styled from 'styled-components'

const LoginArea = styled.div`
  background: #666;
`
const LoginImage = styled.div`
  background-image: url(/login-image.svg);
  background-size: cover;
  height: 100vh;
  width: 50vw;
`

function Login() {
  return (
    <>
      <LoginArea>Login</LoginArea>
      <LoginImage></LoginImage>
    </>
  )
}

export default Login
