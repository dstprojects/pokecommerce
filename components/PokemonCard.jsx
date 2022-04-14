import { Card, Grid, Row, Text, Button } from '@nextui-org/react';


export const PokemonCard = ({ pokemon, currency }) => {

  const { name, id, img } = pokemon
  const price = (Math.random() * 150).toFixed(2)
  const currencyIndex = Math.round(Math.random() * 5)
  const moneyCurrency = Object.keys(currency)[currencyIndex]
  const priceMXN = ( (price / currency[`${moneyCurrency}`]) * currency['MXN'] ).toFixed(2)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })


  return (
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ id }>
      <Card 
        hoverable 
      >
        <Card.Body css={{ p: 1}}>
          <Card.Image
            src={ img }
            width="100%"
            height={ 140 }
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
          <Row css={{ width: '100%', justifyContent: 'center'}}>
            <Button
              color="gradient"
              ghost
            >
              Comprar
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}
