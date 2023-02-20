import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCarrito from "./useCarrito";

const useAuth = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLogged: ()=> Boolean(get().token), 
      login: ({ token, user })=> set({ token, user: user }),
      logout: ()=> {
        set({ token: null, user: null })
        useCarrito.setState({ misCompras: [], products: [], activeProduct: null })
      },
      foo: 'foo'
    }),
    {
      name: 'auth-storage',
      // https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#partialize
      // seria como una whitelist
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)

export default useAuth