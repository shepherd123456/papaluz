import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useStore = create(
  immer(set => ({
    cart: {
      products: {},
      buyerDetails: {},
      addProduct: (product, quantity = 1) => set(state => { state.cart.products[product.uuid] = { ...product, quantity } }),
      setProductQuantity: (uuid, quantity) => set(state => { state.cart.products[uuid].quantity = quantity }),
      deleteProduct: uuid => set(state => { delete state.cart.products[uuid] }),
      setBuyerDetails: buyerDetails => set(state => { state.cart.buyerDetails = buyerDetails }),
    },
    dashboard: {
      search: '',
      products: {},
      setSearch: search => set(state => { state.dashboard.search = search }),
      setProducts: products => set(state => { state.dashboard.products = products }),
      deleteProduct: (category, index) => set(state => { state.dashboard.products[category].splice(index, 1) }),
      addCategory: category => set(state => { state.dashboard.products[category] = [] }),
      updateCategory: (oldCat, newCat) => set(state => {
        state.dashboard.products[newCat] = state.dashboard.products[oldCat];
        delete state.dashboard.products[oldCat];
      }),
      deleteCategory: category => set(state => { delete state.dashboard.products[category] }),
    },
    home: {
      search: '',
      products: {},
      selectedCat: '',
      setSearch: search => set(state => { state.home.search = search }),
      setSelectedCat: category => set(state => { state.home.selectedCat = category }),
      setProducts: products => set(state => { state.home.products = products }),
    },
  }))
)