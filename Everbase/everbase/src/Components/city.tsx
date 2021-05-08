import React, {FC, useState} from 'react'
import Country, {ICountry} from './country'
import {gql, useQuery} from '@apollo/client'
import './cities.css'

/*

continent: Continent!
The continent.

country: Country!
The country.

geonamesID: Int!
The Geonames.org ID.

id: String!
The Wikidata ID.

location: Coordinates
The location.

name: String!
The name.

population: Int!
The population.

*/

interface IData{
    cities: ICity[];
}

export interface ICity{
    continent: {name:string},
    country: ICountry,
    name: string,
    population: number,
    timeZone: {name:string},
}

const CITIES = gql`
    query Cities ($name:String){       
        cities(where: {name: {eq: $name}}) {
            name
            country{
                name
            }
            timeZone{
                name
            }
            population
        }
    }
`;

const City:FC<{text:string}> = (props: {text:string}) => {

    const [clicked, setClicked] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    console.log(props.text);
    const {loading, error, data} = useQuery(CITIES, {
        variables: {name: props.text},
    });    

    if(loading) return <div><h2>CARGANDO...</h2></div>
    if(error) return <div><h2>ERROR</h2></div>

    return  (
        
        <div className="cities-container">
            <div className="cities">
                {data.cities.map( (city:ICity) => {
                    return(<div className="city-card">
                        <div className="city">
                            <h1>{city.name}</h1>
                            <div onClick={() => {setClicked(city.country.name); setCountry(city.country.name)}}> Country: {city.country.name}</div> 
                            <div>Population: {city.population}</div>
                            <div>Time Zone: {city.timeZone.name}</div>  
                        </div> 
                        <div>{clicked===city.country.name && <Country text={country}/>}</div>
                    </div>)
                })}        
            </div>    
        </div>
    );
}

export default City;