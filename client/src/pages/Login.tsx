import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Axios from 'axios'

import { Container } from 'react-bootstrap'

import { Navbar, LoginForm, SignupForm } from '@/components/index'
import { AuthMethods, getUserId } from '@/utils/index'
import '@styles/Login.css'


function Login () {

  const auth = new AuthMethods()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showSignup, setShowSignup] = useState<boolean>(false)
  const [loginAlert, setLoginAlert] = useState<string>('')
  const [signupAlert, setSignupAlert] = useState<string>('')

  useEffect(() => {
    if (location.pathname === '/login' && auth.loggedIn()) {
      navigate('/')
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const login = await auth.login(email, password)
      if (login) {
        auth.setCurrentUser({
          "email": email,
          "id": await getUserId(email)
        })
        navigate('/')
        } 
      } catch (err: any) {
        setEmail('')
        setPassword('')
        setLoginAlert(err.message)
    }
  }

  const handleShowSignup = async (e: any) => {
    e.preventDefault()
    setShowSignup(true)
  }

  const handleSignup = async (newEmail: string, newPassword: string) => {
    try {
      const res = await Axios.post('/api/create_user', {
        "email": newEmail,
        "password": newPassword,
      });
      console.log(res.status)
      if (res.status === 200) {
        await handleLogin(newEmail, newPassword);
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        setSignupAlert('A user with that email already exists. Please log in or use a different email.')
      } else {
        setSignupAlert('Something went wrong. Please try again.')
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container className='content-container'>
        {showSignup ? (
          <SignupForm 
            handleSignup={handleSignup} 
            signupAlert={signupAlert}
          />
        ) : (
          <LoginForm
            handleLogin={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
            handleShowSignup={handleShowSignup}
            loginAlert={loginAlert}
          />
        )}  
      </Container>
    </>
  )
}

export default Login