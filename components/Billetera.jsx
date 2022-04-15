import { Button, Card, Input, Spacer, useInput } from '@nextui-org/react'
import React from 'react'
import { useState } from 'react'
import { useStore } from '../store/billeteraStore'
import { formatter } from '../utils/formater'

export const Billetera = () => {

  const { saldo, agregarSaldo } = useStore()
  const { value, bindings, reset } = useInput("")
  const [error, setError] = useState(false)

  const handleClick = () => {

    const monto = parseFloat(value)

    if( isNaN(monto) || monto < 0 ){
      setError(true)
      return
    }

    agregarSaldo(parseFloat(value))
    setError(false)
    reset()
  }
  

  return (
    <Card bordered style={{ position: 'fixed', top: '100px', maxWidth: '300px' , right: '20px', zIndex: '999' }}>
      <Card.Header style={{ width: '100%', textAlign: 'center'}}><h3>Saldo disponible: </h3></Card.Header>
      <Card.Body><h2>{ formatter.format( saldo ) } MXN</h2></Card.Body>
      <Card.Footer style={{ display: 'flex', flexFlow: 'column' }}>
        <div style={{ margin: '10px 0'}}>
          <Input 
            bordered 
            placeholder='Monto a agregar' 
            type='number' 
            label="monto"
            clearable
            status={ error ? "error" : "default" }
            {...bindings}
          />
        </div>
        <Spacer y={1} />
        <Button
          ghost
          color='gradient'
          onClick={ handleClick }
        >
          Agregar
        </Button>
        <Spacer y={1} />
      </Card.Footer>
    </Card>
  )
}
