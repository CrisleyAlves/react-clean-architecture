import React from 'react'
import { LocalStorageAdapter } from '@/infra/storage/local-storage-adapter'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({
  children
}: any): React.FC => {
  const localStorageAdapter = new LocalStorageAdapter()
  const user = localStorageAdapter.get('user')
  return user ? children : <Redirect to='/authentication' />
}

export default PrivateRoute
