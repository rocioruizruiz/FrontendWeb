import React, {FC, useState} from 'react'
import Country, {ICountry} from './country'
import {gql, useQuery} from '@apollo/client'
import './cities.css'
import ClipLoader from 'react-spinners/ClipLoader'
import {IWeather} from './country'
import axios from 'axios'

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
                alpha2Code
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
    const [weather, setWeather] = useState<IWeather | undefined>();

    const getWeather = (url:string)=> {
        axios.get(url)
           .then( (response =>{ setWeather(response.data); console.log(response.data); }))
   }
    
    console.log(props.text);
    const {loading, error, data} = useQuery(CITIES, {
        variables: {name: props.text},
    });    

    if(loading) return <div className="ClipLoader"><ClipLoader color="rgb(88, 113, 90)" size="50pxs"/></div>
    if(error) return <div><h2>ERROR</h2></div>

    let flagUrl:string = "";
    let weatherUrl:string = "";

    return  (
        
        <div className="cities-container">
            <div className="cities">
                {data.cities.map( (city:ICity) => {
                    {console.log(city)}
                    {flagUrl = `${process.env.REACT_APP_API_REST_URL_COUNTRYFLAGS}`.replace("code",city.country.alpha2Code)}
                    {console.log(flagUrl)}
                    {weatherUrl = `${process.env.REACT_APP_API_REST_WEATHER_URL}`}
                    {weatherUrl = weatherUrl.replace("{city name}", city.name)};
                    {weatherUrl = weatherUrl.replace("{API key}", `${process.env.REACT_APP_API_KEY_WEATHER}`)}
                    console.log(weatherUrl);
                    return(<div className="city-card">
                        <div className="city">
                            <div className="country-card-header">   
                                <h1>{city.name}</h1>
                                <img src={flagUrl} alt = "Country Flag"/>
                            </div>
                            <div style={{cursor:"pointer"}} onClick={() => {if(clicked === city.country.name){setClicked("")}else{setClicked(city.country.name)}; setCountry(city.country.name)}}> Country: {city.country.name}</div> 
                            <div>Population: {city.population}</div>
                            {console.log(city.timeZone!.name)}
                            <div className="da">Time Zone: {city.timeZone!.name}</div>
                            {getWeather(`${weatherUrl}`)}
                            {weather && city.name &&  <div className = "tab"><div>Temperature: {weather.main.temp} ºC</div><div>Description: {weather.weather[0].description} </div></div>} 
                        </div> 
                        <div>{clicked===city.country.name && <Country text={country}/>}</div>
                    </div>)
                })}        
            </div>    
        </div>
    );
}

export default City;