import { Grid } from '@nextui-org/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { PokemonCard } from '../components/PokemonCard'

const letras = ['a','e','i','o', 'u']


export default function HomePage({pokemons, currency}) {

  const [letra, setLetra] = useState(null)
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    const indice = Math.round(Math.random() * 4)
    setLetra( letras[indice] )

    const filteredList = pokemons.filter( pokemon => pokemon.name.includes( letras[indice] )  )
    setPokemonList( filteredList )

  }, [])
  

  return (
    <>
      <Head>
        <title>PokEcommerce</title>
      </Head>
      <Navbar />
      <div style={{height: '100px'}}></div>
      {
        letra && 
        <h3>El mejor lugar para comprar Pokémons que contienen la letra {`"${ letra.toUpperCase() }"`}</h3>
      }
      
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemonList.map((pokemon) => (
            <PokemonCard pokemon={ pokemon } key={ pokemon.id } currency={ currency } />
            ))
          }
      </Grid.Container>
    </>
  )
}

export const getStaticProps = async (ctx) => {

  const pokemonResp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const { results } = await pokemonResp.json()

  const currencyResp = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${ process.env.CURRENCY_API_KEY }&symbols=USD,AUD,CAD,PLN,MXN`)
  const { rates } = await currencyResp.json()

  const pokemons = results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ index + 1 }.svg`
    }
    
  })

  const currency = {...rates, EUR: 1}

  return {
    props: {
      pokemons, 
      currency
    },
    revalidate: 86400
  }
}

