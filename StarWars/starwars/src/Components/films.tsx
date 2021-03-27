import react, {FC, useState, useEffect} from 'react'
import './films.css'
import axios from 'axios'
import loader from '../img/loader.png'


export interface IFilms {
    results: IFilm[]
    count: number
    next: string | null
    previous: string | null
}

export interface IFilm {
    characters: string[]
    created: string
    director: string
    edited: string
    episode_id: number
    opening_crawl: string
    planets: string[]
    producer: string
    release_date: string
    species: string[]
    starships: string[]
    title: string
    url: string
    vehicles: string[]
}

interface IFilmsProps{
    order: string | undefined
    searchedData: {
        searchMode: boolean
        searchedData: IFilm[]      
    }
}
let data_aux:IFilm[];

const Films:FC<IFilmsProps> = (props:IFilmsProps) => {

    const order = props.order;
    const [data, setData] = useState<IFilms>();
   

    useEffect( () => {
        axios.get('https://swapi.dev/api/films')
             .then( (response => setData(response.data)));
    }, []);

    if(props.searchedData.searchedData != undefined && props.searchedData.searchMode){data_aux = [...props.searchedData.searchedData]};
    if(data && !props.searchedData.searchMode) { data_aux = [...data.results]};
   
    return(
        <div>
            { !data  && <img src={loader} alt="LOADER" className="Loader"/> }
            {data_aux && order==='API' && data_aux.map( (item:IFilm) => {
                return(
                    <div className="Target">
                        <h3>{item.title}</h3>
                        <h2>{item.director}</h2>
                        <p>{item.release_date}</p>
                        <p>{item.opening_crawl.substring(0,180)} ...</p>
                    </div>
                );
            })}
            
            {data_aux && order==='DESC' && data_aux.sort(function(a,b) { if (a.title < b.title) return 1; if (a.title > b.title) return -1; else{return 0;}}).map( (item:IFilm) => {
                return(
                    <div className="Target">
                        <h3>{item.title}</h3>
                        <h2>{item.director}</h2>
                        <p>{item.release_date}</p>
                        <p>{item.opening_crawl.substring(0,180)} ...</p>
                    </div>
                );
            })}
            {data_aux && order==='ASC' && data_aux.sort(function(a,b) { if (a.title > b.title) return 1; if (a.title < b.title) return -1; else{return 0;}}).map( (item:IFilm) => {
                return(
                    <div className="Target">
                        <h3>{item.title}</h3>
                        <h2>{item.director}</h2>
                        <p>{item.release_date}</p>
                        <p>{item.opening_crawl.substring(0,180)} ...</p>
                    </div>
                );
            })}
        </div>
        
    );
}

export default Films;

 