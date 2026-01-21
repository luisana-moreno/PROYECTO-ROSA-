import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'src/assets/images/finca/fincalogo.png'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand
          to="/"
          className="w-100 d-flex justify-content-center align-items-center"
          style={{
            minHeight: '100px',
            backgroundColor: 'transport', // El color viene del CSS .sidebar-header
          }}
        >
          <div
            className="position-relative d-flex justify-content-center align-items-center bg-white rounded-circle p-1"
            style={{
              width: unfoldable ? '60px' : '90px',
              height: unfoldable ? '60px' : '90px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <CImage
              src={logo}
              className="sidebar-brand-full"
              height={unfoldable ? 50 : 80}
              width={unfoldable ? 50 : 80}
              style={{
                objectFit: 'contain',
                borderRadius: '50%',
              }}
            />
          </div>
          {!unfoldable && (
            <div className="ms-3 text-white">
              <h3 className="mb-0 fw-bold" style={{ fontSize: '1.1rem', fontStyle: 'inherit' }}>
                S.I.G.
              </h3>
              <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>Gestión Ganadera</small>
            </div>
          )}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
