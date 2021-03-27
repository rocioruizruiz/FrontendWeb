import react, {FC, useState, useEffect} from 'react'
import './characters.css'
import axios from 'axios'
import loader from '../img/loader.png'


export interface ICharacters {
    results: ICharacter[]
    count: number
    next: string | null
    previous: string | null
}

export interface ICharacter {
    films: string[]
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    homeworld: string
    species: string[]
    starships: string[]
    url: string
    vehicles: string[]
}

interface ICharactersProps{
    order: string | undefined
    searchedData: {
        searchMode: boolean
        searchedData: ICharacter[]      
    }
}
let data_aux:ICharacter[];

const Characters:FC<ICharactersProps> = (props:ICharactersProps) => {

    const order = props.order;
    const [data, setData] = useState<ICharacters>();

    useEffect( () => {
        axios.get('https://swapi.dev/api/people')
             .then( (response => setData(response.data)))
    }, []);


    if(props.searchedData.searchedData != undefined && props.searchedData.searchMode){data_aux = [...props.searchedData.searchedData]};
    if(data && !props.searchedData.searchMode) { data_aux = [...data.results]};
    return(
        <div>
            { !data  && <img src={loader} alt="LOADER" className="Loader"/> }
            {data_aux && order==='API' && data_aux.map( (item:ICharacter) => {
                return(
                    <div className="Target">
                        <h3>{item.name}</h3>
                        <p>Gender: {item.gender}</p>
                        <p>Skin color: {item.skin_color}</p>
                        <p>Height: {item.height}cm</p>
                    </div>
                );
            })}

            {data_aux && order==='DESC' && data_aux.sort(function(a,b) { if (a.name < b.name) return 1; if (a.name > b.name) return -1; else{return 0;}}).map( (item:ICharacter) => {
                return(
                    <div className="Target">
                        <h3>{item.name}</h3>
                        <p>Gender: {item.gender}</p>
                        <p>Skin color: {item.skin_color}</p>
                        <p>Height: {item.height}cm</p>
                    </div>
                );
            })}

            {data_aux && order==='ASC' && data_aux.sort(function(a,b) { if (a.name > b.name) return 1; if (a.name < b.name) return -1; else{return 0;}}).map( (item:ICharacter) => {
                return(
                    <div className="Target">
                        <h3>{item.name}</h3>
                        <p>Gender: {item.gender}</p>
                        <p>Skin color: {item.skin_color}</p>
                        <p>Height: {item.height}cm</p>
                    </div>
                );
            })}
        </div>
        
    );
}

export default Characters;
