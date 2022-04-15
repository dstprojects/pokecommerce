import create from 'zustand'

export const useStore = create(set => ({
  billeteraOpen: false,
  saldo: 0,
  toggleBilletera: () => set(state => ({ billeteraOpen: !state.billeteraOpen })),
  agregarSaldo: (cantidad) => set(state => ({ saldo: state.saldo + cantidad})),
  comprar: (cantidad) => set(state => ({ saldo: state.saldo - cantidad})),
}))