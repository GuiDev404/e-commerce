import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PublicRoute = ({ authStatus }) => {
  const { state } = useLocation()

  return !authStatus
    ? <Outlet />
    : <Navigate to={state?.visitedPrivatePath ?? "/"} />
}

export default PublicRoute