import styled from 'styled-components'

const RegistrationArea = styled.div`
  background: #333;
`
const RegistrationImage = styled.div`
  background-image: url(/login-image.svg);
  background-size: cover;
  height: 100vh;
  width: 50vw;
`

function Registration() {
  return (
    <>
      <RegistrationArea>Registration</RegistrationArea>
      <RegistrationImage></RegistrationImage>
    </>
  )
}

export default Registration
