import React from 'react';
import { Container } from '@chakra-ui/react';
import { Routes, Route, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Account = React.lazy(() => import('../pages/Account'));
const Carrito = React.lazy(() => import('../pages/Carrito'));
const Checkout = React.lazy(() => import('../pages/Checkout'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Faq = React.lazy(() => import('../pages/Faq'));
const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  const user = useAuth((state) => state.user);
  const hasLoggedUser = Boolean(user);

  return (
    <Container maxWidth='90%'>
      <React.Suspense fallback={<></>}>
        <Routes>
          {/* always visible */}
          <Route element={<Dashboard />}>
            <Route path='/' element={<Home />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/help/faq' element={<Faq />} />
          </Route>

          {/* Only private routes */}
          <Route element={<PrivateRoute authStatus={hasLoggedUser} />}>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/account' element={<Account />} />
          </Route>

          {/* Only public routes */}
          <Route element={<PublicRoute authStatus={hasLoggedUser} />}>
            <Route path='/auth/*' element={<Outlet />}>
              <Route path='login' element={<Login />} />
              {/* <Route path='register' element={<Register />} /> */}
            </Route>
          </Route>

          <Route path='/*' element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </Container>
  );
};

export default AppRoutes;
