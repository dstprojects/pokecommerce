import { Card, Grid, Row, Text, Button } from '@nextui-org/react';
import { formatter } from "../utils/formater"

import confetti from 'canvas-confetti'
import { useStore } from '../store/billeteraStore';
import { useMemo } from 'react';
import Swal from 'sweetalert2'


export const PokemonCard = ({ pokemon, currency }) => {

  const { saldo, comprar } = useStore()

  const { name, id, img } = pokemon
  const price = useMemo(() => (Math.random() * 150).toFixed(2), [])
  const currencyIndex = useMemo(() => Math.round(Math.random() * 5), [])
  const moneyCurrency = useMemo(() => Object.keys(currency)[currencyIndex], [])
  const priceMXN = useMemo(() => ( (price / currency[`${moneyCurrency}`]) * currency['MXN'] ).toFixed(2), [])

  const handleClick = () => {

    if ( priceMXN > saldo ){
      Swal.fire({
        title: 'Saldo insuficiente',
        text: 'Recarga tu saldo antes de realizar la compra',
        icon: 'error',
        confirmButtonText: 'Entendido'
      })
      return
    }

    comprar( priceMXN )

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      }
    })

  }


  return (
    <Grid xs={ 12 } sm={ 6 } md={ 4 } xl={ 3 } key={ id }>
      <Card 
        hoverable 
      >
        <Card.Body css={{ p: 1}}>
          <Card.Image
            src={ img }
            width="100%"
            height={ 140 }
            style={{ padding: '20px 0 0 0 '}}
          />
        </Card.Body>
        <Card.Footer style={{ display: 'flex', flexDirection: 'column'}}>
          <Row justify='space-between'>
            <Text transform='capitalize' h4>{ name }</Text>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text>${ `${price} ${moneyCurrency}` }</Text>
              <Text>{ formatter.format(priceMXN) } MXN</Text>
            </div>
          </Row>
          <Row css={{ width: '100%', justifyContent: 'center', margin: '20px 0'}}>
            <Button
              color="gradient"
              ghost
              onClick={ handleClick }
            >
              Comprar
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}
