import * as yup from 'yup';

export const defaultCategories = [
  { slug: 'all', name: 'All' },
  { slug: 'games', name: 'Games' }
]

export const queryClientConfig =  {
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    },
  },
}


export const loginSchema = yup
  .object({
    password: yup
      .string()
      .required('La contraseña es requerida')
      .min(3, 'Debe tener 3 caracters como minimo'),
      // .max(10, 'Debe 10 careacters como maximo'),
    username: yup
      .string()
      // .email('Ingrese un correo valido')
      .required('El nombre de usuario es requerido'),
  })
  .required();