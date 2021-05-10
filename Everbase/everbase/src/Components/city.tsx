import React, {FC, useState} from 'react'
import Country, {ICountry} from './country'
import {gql, useQuery} from '@apollo/client'
import './cities.css'
import ClipLoader from 'react-spinners/ClipLoader'

interface IData{
    cities: ICity[];
}

export interface ICity{
    continent: {name:string},
    country: ICountry,
    name: string,
    population: number,
    timeZone?: {name:string},
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

    if(loading) return <div className="ClipLoader"><ClipLoader color="rgb(88, 113, 90)" size="50pxs"/></div>
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
                            {data.timeZone && <div>Time Zone: {city.timeZone!.name}</div>  }
                        </div> 
                        <div>{clicked===city.country.name && <Country text={country}/>}</div>
                    </div>)
                })}        
            </div>    
        </div>
    );
}

export default City;