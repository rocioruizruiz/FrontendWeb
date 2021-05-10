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
    const [flag, setFlag] = useState<string>("");

    const {loading, error, data} = useQuery(COUNTRIES, {
        variables: {name: props.text},
    }); 
    
    
    const getFlag = (url:string)=> {
         axios.get(url)
            .then( (response => {setFlag(response.data[0].flag)}))
    }

    if(loading) return <div className="ClipLoader"><ClipLoader color="rgb(88, 113, 90)" size="50pxs"/></div>
    if(error) return <div><h2>ERROR :(</h2></div>
    console.log(data.countries);
    return  (
        
        <div className="countries-container">
            <div className="countries">
                {data.countries.map( (country:ICountry) => {
                    return(<div className="country-card">
                        <div className="country">
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
                                            {getFlag(`${process.env.REACT_APP_API_REST_URL}${country.name}?fullText=true`)}
                                            {<img src={flag}/>}
                                        </div>
                                    </div>
                                )}
                            </Popup>
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