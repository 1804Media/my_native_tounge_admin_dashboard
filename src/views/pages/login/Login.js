import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { doLogIn } from 'src/services/apis'
import { saveState } from 'src/services/helper'

const Login = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameCheck, setUserNameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  let handlelogin = async (e) => {
    if (userName.length == 0) {
      setUserNameCheck(true);
    }
    if (password.length == 0) {
      setPasswordCheck(true);
    }
    if (userName.length && password.length) {
      setUserNameCheck(false);
      setPasswordCheck(false);
      let loginUserData = await doLogIn(userName, password);
      loginUserData = await loginUserData.json();
      // console.log(loginUserData)
      saveState('loginedUser', loginUserData)
      dispatch({ type: "LOGIN", loginedUser: loginUserData })
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" value={userName} onChange={(e) => {
                        setUserNameCheck(false);
                        setUserName(e.target.value);
                      }} />
                      {userNameCheck ? <div className="text-danger" style={{ flexBasis: "100%" }}>Username is required<sup>*</sup></div> : <></>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => { setPasswordCheck(false); setPassword(e.target.value); }} />
                      {passwordCheck ? <div className="text-danger" style={{ flexBasis: "100%" }}>Password is required<sup>*</sup></div> : <></>}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={(e) => { handlelogin(e) }}>Login</CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    {/* <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                    <h2 className="pt-5 mt-4">Login To Dashboard</h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
