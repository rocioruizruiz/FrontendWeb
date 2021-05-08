import React, {FC, useState} from 'react'
import {gql, useQuery} from '@apollo/client'
import City, {ICity} from './city'
import './countries.css'

interface IData {
    countries: ICountry[]
}
export interface ICountry{
    name: string,
    population: number,
    capital?: ICity,
    cities: ICity[],
    continent: {name:string},
    currencies: {name:string}[],
    languages: {name:string}[]
}

const COUNTRIES = gql`
    query Countries ($name:String){       
        countries(where: {name: {eq: $name}}) {
            name
            continent{
                name
            }
            capital{
                name
            }
            languages{
                name
            }
            currencies {
                name
            }
            population
        }
        
    }
`;




const Country:FC<{text:string}> = (props: {text:string}) => {  

    const [clicked, setClicked] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const {loading, error, data} = useQuery(COUNTRIES, {
        variables: {name: props.text},
    });        

    if(loading) return <div><h2>CARGANDO...</h2></div>
    if(error) return <div><h2>ERROR</h2></div>
    console.log(data.countries);
    return  (
        
        <div className="countries-container">
            <div className="countries">
                {data.countries.map( (country:ICountry) => {
                    return(<div className="country-card">
                        <div className="country">
                            <h1>{country.name}</h1>
                            <div> Continent: {country.continent.name}</div>
                            {country.capital && <div onClick={() => {setClicked(country.capital!.name); setCity(country.capital!.name)}}>Capital: {country.capital?.name}</div>}
                            <div> Languages: {country.languages.map((l: {name:string}) => {return l.name + " "})}</div>
                            <div> Currencies: {country.currencies.map((c: {name:string}) => {return (c.name + " ")})}</div>
                            <div> Population: {country.population}</div>
                        </div>
                        <div>{country.capital && clicked===country.capital.name && <City text={city}/>}</div>
                    </div>)
                })}     
            </div>
        </div>
    );
}

export default Country;