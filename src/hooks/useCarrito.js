import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calcDiscount } from '../helpers';

const useCarrito = create(
  persist((set, get) => ({
    products: [],
    misCompras: [],
    activeProduct: null,
    calcResume: ()=> ({
      total: get()?.products.reduce((acc, prod) => (acc += prod.priceWithDiscount * prod.cantidad), 0),
      cantidadProductos: get()?.products.reduce((acc, prod) => acc + prod.cantidad, 0)
    }),

    setActiveProduct: (product) => {
      set({ 
        activeProduct: !product ? product : ({...product, priceWithDiscount: calcDiscount(product?.price, product?.discountPercentage)})
      })
    },
    
    updateMisCompras: (ultimaCompra)=> set(prev=> ({ misCompras: [...prev.misCompras, ultimaCompra] })),

    addProduct: (newProduct) =>
      set((state) => ({ products: [...state.products, newProduct] })),
    updateProduct: (product) =>
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? product : p
        ),
      })),
    removeAllProducts: () => set({ products: [] }),
    removeProduct: (id) =>
      set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
    
    orherProp: 'esta prop no persiste'
  }),
  {
    name: 'carrito',
    partialize: (state) => ({ 
      products: state.products,
      activeProduct: state.activeProduct,
      misCompras: state.misCompras,
    }),
  }
  )
);

export default useCarrito;
