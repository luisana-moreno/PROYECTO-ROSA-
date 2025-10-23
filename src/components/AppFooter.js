import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>

      </div>
      <div className="ms-auto">
        <a target="_blank" rel="noopener noreferrer">
          Finca la laguna
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
