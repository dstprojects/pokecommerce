import { useStore } from "../store/billeteraStore"
import { Billetera } from '../components/Billetera'
import { formatter } from "../utils/formater"

export const Navbar = () => {

  const { saldo, billeteraOpen ,toggleBilletera } = useStore()

  return (
    <nav>
      <h1>PokEcommerce</h1>
    
      <span onClick={ toggleBilletera }>Saldo: {`${ formatter.format( saldo ) }`} MXN</span>

      {
        billeteraOpen &&
        <Billetera />
      }
      
    </nav>
  )
}
