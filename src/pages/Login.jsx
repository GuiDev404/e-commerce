import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { getUsers, loginUser } from '../services';
import useAuth from '../hooks/useAuth';

import { useQuery } from '@tanstack/react-query'
import { loginSchema } from '../config/const';

const Login = () => {
  const login = useAuth(state=> state.login)
  const [errorMessage, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { data, isLoading: loadingUsers } = useQuery(['users'], getUsers)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(loginSchema
      ),
  });

  useEffect(()=> {
    if(!loadingUsers){
      const randomUser = data?.users[Math.floor(Math.random() * 30)]

      setValue('username', randomUser.username)
      setValue('password', randomUser.password)
    }
  }, [data?.users, loadingUsers])


  const onSubmit = (data) => {
    setLoading(true)

    loginUser(data)
      .then(results=> {
        setError('')
        const { token, ...user } = results

        login({ token, user })
      })
      .catch(error=> setError(error.response.data.message))
      .finally(()=> setLoading(false))
  }

  return (
    <Box
      display='flex'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width='400px'
        onSubmit={handleSubmit(onSubmit)}
        as='form'
        shadow='md'
        borderRadius='md'
        p={4}
      >
        <Heading size='lg' mb={5} textAlign='center'>
          Iniciar sesion
        </Heading>

        {Boolean(errorMessage) &&
          <Alert status='error' rounded='md' mb={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        }

        <VStack spacing={4} alignItems='start'>
          <FormControl>
            <FormLabel>Ingrese su nombre de usuario</FormLabel>
            <Input
              type='text'
              placeholder='Ingrese su nombre de usuario'
              {...register('username')}
            />
           <Text fontSize='sm' mt={1} color='red.400'>{errors?.username?.message}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Ingrese su contraseña</FormLabel>
            <Input
              type='password'
              placeholder='Ingrese su contraseña'
              {...register('password')}
            />
           <Text fontSize='sm' mt={1} color='red.400'>{errors?.password?.message}</Text>
          </FormControl>

          <Button type='submit' isLoading={loading} display='block' w='100%' colorScheme='green'>
            Iniciar sesion
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
