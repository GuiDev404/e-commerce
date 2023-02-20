import { VStack } from '@chakra-ui/react';
import { CreditCard } from 'react-kawaii';

import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';

import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import { formatDate } from '../helpers';
import DataList from '../components/DataList';

const Account = () => {
  const user = useAuth(state=> state.user)
  const compras = useCarrito(state=> state.misCompras)

  const noHayCompras = compras.length === 0;

  const comprasFormatted = compras.map((compra) => ({
    title: formatDate(compra.date),
    desc: (
      <>
        Pagaste: <strong>${compra.total}</strong>, por <strong>{compra.cantidad}</strong> productos
      </>
    ),
  }));
  
  return (
    <>
      <Header title='Mi cuenta' />

      <UserCard
        size='lg'
        image={user.image}
        firstName={user.firstName}
        lastName={user.lastName}
        username={user.email}
      />

      <Header title='Mis compras' size='xl' />

      {/* <VStack spacing={4} alignItems='flex-start'> */}
        {noHayCompras ? (
          <EmptyState message='No has comprado nada' flexPosition='flex-start'>
            <CreditCard size={70} mood='sad' color='#83D1FB' />
          </EmptyState>
        ) : (
          <DataList data={comprasFormatted} />
        )}
      {/* </VStack> */}
    </>
  );
};

export default Account;
