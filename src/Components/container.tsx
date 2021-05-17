import React, {FC, useState} from 'react'
import './container.css'
import Country from './country'
import City from './city'


const Container:FC = () => {

    const [type, setType] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [data, setData] = useState<string>("");
    

    return(
        <div className="App">
            
            <div className="title"><h1 onClick={()=> {setType(""); setText(""); setData("")}}>EVERBASE</h1></div>

            {type === "" && 
                <div className="search-buttons">
                    <div><button onClick={() => {setType("country")}}>BUSCAR PAIS</button></div>
                    <div><button onClick={() => {setType("city")}}>BUSCAR CIUDAD</button></div>
                </div>}
            {type==="country" && 
                <div>
                    <input placeholder="Introduce el nombre de un pais" value={text} onChange={(e) => {setText(e.target.value)}}/>
                    <button onClick={() => {setData(text)}}>BUSCAR</button>  
                    <Country text={data}/>
                </div>}

            {type==="city" && 
                <div>
                    <input placeholder="Introduce el nombre de una ciudad" value={text} onChange={(e) => {setText(e.target.value)}}/>
                    <button onClick={() => {setData(text)}}>BUSCAR</button>    
                    <City text={data}/>
                </div>}

        </div>
    );
}

export default Container;