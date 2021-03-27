import react, {FC, useState, useEffect} from 'react'
import axios from 'axios'
import './lookup.css'

interface IProps{
    mode: string;
    searchedData:Function
}
const LookUp:FC<IProps> = (props:IProps) => {

    const [data, setData] = useState<any>();
    const [text, setText] = useState<string>('');


    useEffect( () => {
        const url = 'https://swapi.dev/api/' + props.mode.toLowerCase() + '/?search=' + text
        axios.get(url)
             .then( (response => setData(response.data)))
    }, [text]);
   
    return(
        <div className="LookUpContainer">
            <input type="text" className="LookUp" value={text} onChange={(e) => {setText(e.target.value); props.searchedData(true, data.results); console.log(text, ": ", data)}}/>
            <input type="reset" value="x" className="CloseSearch" onClick={() => {setText(''); props.searchedData(false, []) }}/>
        </div>    
    );
}

export default LookUp;
