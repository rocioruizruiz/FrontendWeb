import react, {FC, useState, useEffect} from 'react'
import './planets.css'
import axios from 'axios'
import loader from '../img/loader.png'



export interface IPlanets {
    results: IPlanet[]
    count: number
    next: string | null
    previous: string | null
}

export interface IPlanet {
    films: string[]
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string 
    gravity: string
    terrain: string 
    surface_water: string 
    population: string 
    residents: string[]
    url: string
}

interface IPlanetsProps{
    order: string | undefined
    searchedData: {
        searchMode: boolean
        searchedData: IPlanet[]      
    }
}
let data_aux:IPlanet[];

const Planets:FC<IPlanetsProps> = (props:IPlanetsProps) => {

    const order = props.order;
    const [data, setData] = useState<IPlanets>();

    useEffect( () => {
        axios.get('https://swapi.dev/api/planets')
             .then( (response => setData(response.data)))
    }, []);

    if(props.searchedData.searchedData != undefined && props.searchedData.searchMode){data_aux = [...props.searchedData.searchedData]};
    if(data  && !props.searchedData.searchMode) { data_aux = [...data.results]};
    return(
        <div>
            { !data  && <img src={loader} alt="LOADER" className="Loader"/> }
            {data_aux && order==='API' && data_aux.map( (item:IPlanet) => {
                return(
                    <div className="Target">
                        <h3>{item.name}</h3>
                        <h2>Population: {item.population}</h2>
                        <p>Period: [rotation-{item.rotation_period}, orbital-{item.orbital_period}]</p>
                        <p>Climate: {item.climate}</p>
                        <p>Gravity: {item.gravity}</p>
                        <p>Terrain: {item.terrain}</p>
                        <p>Surface water: {item.surface_water}</p>
                    </div>
                );
            })}

            {data_aux && order==='DESC' && data_aux.sort(function(a,b) { if (a.name < b.name) return 1; if (a.name > b.name) return -1; else{return 0;}}).map( (item:IPlanet) => {
                return(
                    <div className="Target">
                        <h3>{item.name}</h3>
                        <h2>Population: {item.population}</h2>
                        <p>Period: [rotation-{item.rotation_period}, orbital-{item.orbital_period}]</p>
                        <p>Climate: {item.climate}</p>
                        <p>Gravity: {item.gravity}</p>
                        <p>Terrain: {item.terrain}</p>
                        <p>Surface water: {item.surface_water}</p>
                    </div>
                );
            })}

            {data_aux && order==='ASC' && data_aux.sort(function(a,b) { if (a.name > b.name) return 1; if (a.name < b.name) return -1; else{return 0;}}).map( (item:IPlanet) => {
                return(
                    <div className="Target">
                        <h3>{item.name}</h3>
                        <h2>Population: {item.population}</h2>
                        <p>Period: [rotation-{item.rotation_period}, orbital-{item.orbital_period}]</p>
                        <p>Climate: {item.climate}</p>
                        <p>Gravity: {item.gravity}</p>
                        <p>Terrain: {item.terrain}</p>
                        <p>Surface water: {item.surface_water}</p>
                    </div>
                );
            })}
        </div>
        
    );
}

export default Planets;

 