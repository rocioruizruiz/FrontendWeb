import React, {FC, useState} from 'react'
import {gql, useQuery} from '@apollo/client'
import City, {ICity} from './city'
import './countries.css'
import ClipLoader from 'react-spinners/ClipLoader'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios'



/*
{name}?fullText=true
*/

export interface ICountry{
    name: string,
    population: number,
    capital?: ICity,
    cities: ICity[],
    continent: {name:string},
    currencies: {name:string}[],
    languages: {name:string}[]
    alpha2Code: string;
}

export interface IWeather{
    main: {
        temp: number
    }
    weather: {
        description: string
    }[]
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
            alpha2Code
        }       
    }
`;


// REACT_APP_API_REST_WEATHER_URL = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

const Country:FC<{text:string}> = (props: {text:string}) => {  

    const [clicked, setClicked] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [flag, setFlag] = useState<string>("");
    const [weather, setWeather] = useState<IWeather | undefined>();

    const {loading, error, data} = useQuery(COUNTRIES, {
        variables: {name: props.text},
    }); 

    const getWeather = (url:string)=> {
        axios.get(url)
           .then( (response =>{ setWeather(response.data); console.log(response.data)}))
   }
    
    
    const getFlag = (url:string)=> {
         axios.get(url)
            .then( (response => {setFlag(response.data[0].flag)}))
    }

    if(loading) return <div className="ClipLoader"><ClipLoader color="rgb(88, 113, 90)" size="50pxs"/></div>
    if(error) return <div><h2>ERROR :(</h2></div>
    let flagUrl:string = "";
    let weatherUrl:string = "";
    return  (
        
        <div className="countries-container">
            <div className="countries">
                {data.countries.map( (country:ICountry) => {
                    {flagUrl = `${process.env.REACT_APP_API_REST_URL_COUNTRYFLAGS}`.replace("code",country.alpha2Code)}
                    {weatherUrl = `${process.env.REACT_APP_API_REST_WEATHER_URL}`}
                    {weatherUrl = weatherUrl.replace("{city name}", country.capital!.name)};
                    {weatherUrl = weatherUrl.replace("{API key}", `${process.env.REACT_APP_API_KEY_WEATHER}`)}
                    console.log(weatherUrl);
                    return(<div className="country-card">
                        <div className="country">

                            <div className="country-card-header">     
                                <Popup trigger={<h1 className="popup"> {country.name} </h1>} modal nested>
                                    {(close:any) => (
                                        <div className="modal">
                                            <div className="header-container">
                                                <button className="close" onClick={close}>
                                                    &times;
                                                </button>
                                                <div className="header">{country.name}</div>
                                            </div>
                                            <div className="content">
                                                {getFlag(`${process.env.REACT_APP_API_REST_URL_RESTCOUNTRIES}${country.name}?fullText=true`)}
                                                {<img src={flag} alt = "Country Flag"/>}
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                                <img src={flagUrl} alt = "Country Flag"/>
                            </div>
                            <div> Continent: {country.continent.name}</div>
                                {country.capital && <div style={{cursor:"pointer"}} onClick={() => {if(clicked === country.capital!.name){setClicked("")}else{setClicked(country.capital!.name)}; setCity(country.capital!.name)}}>Capital: {country.capital?.name}</div>}
                                {getWeather(`${weatherUrl}`)}
                                {country.capital && weather && <div className = "tab"><div>Temperature: {weather.main.temp} ºC</div><div>Description: {weather.weather[0].description}</div></div>} 
                                {weather && <div><h4>Temperature: {weather.main.temp} ºC</h4><h4>Description: {weather.weather[0].description}</h4></div>} 
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