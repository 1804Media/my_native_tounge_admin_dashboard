import { CSpinner } from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  const loading = useSelector(state => state.loading)
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader />

        <div className="c-body position-relative">
          {loading &&
            <div className="d-flex justify-content-center align-items-center" style={{
              width: "100vw",
              height: "100vh",
              zIndex: 1000000,
              background: "#ffffffad", position: "fixed"
            }}>
              <CSpinner style={{ marginLeft: "-174px", marginTop: "-85px" }} />
            </div>
          }
          <TheContent />
        </div>
        {/* <TheFooter/> */}
      </div>
    </div>
  )
}

export default TheLayout
