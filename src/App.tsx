import { useState } from 'react'
import { MainScreen } from '../components/MainScreen'
import { PermissionScreen } from '../components/PermissionScreen'

function App() {
  const [hasPermissions, setHasPermissions] = useState(false)

  const handlePermissionsGranted = () => {
    setHasPermissions(true)
  }

  return (
    <div className="h-screen bg-gray-50">
    <div className="mx-auto w-full max-w-md h-full">
      {hasPermissions ? (
        <MainScreen />
      ) : (
        <PermissionScreen onPermissionsGranted={handlePermissionsGranted} />
      )}
    </div>
  </div>
  )
}

export default App
