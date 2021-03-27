import react, {FC, useState} from 'react'
import './container.css'
import logo from '../img/logo.png';
import Films from './films'
import Characters from './characters'
import Planets from './planets'
import LookUp from './lookup'

interface ISearch {
    searchMode: boolean
    searchedData: any[]
}


const Container:FC = () => {

    const [state, setState] = useState<string>('Films');
    const [order, setOrder] = useState<string>('API');
    const [searchedData, setSearchedData] = useState<ISearch>({searchMode:false, searchedData:[]});

    const searchData = (mode: boolean, data: any[]) => {
        setSearchedData({searchMode:mode, searchedData:data});
    }

    return(
        
            <body>
                <header><img src={logo} alt="STARWARSLOGO"/></header>               
                <div className="Menu">
                    <div onClick={() => setState('Films')}><p>FILMS</p></div>
                    <div onClick={() => setState('People')}><p>CHARACTERS</p></div>
                    <div onClick={() => setState('Planets')}><p>PLANETS</p></div>
                </div>
                <div className="Search-Order">
                    <button onClick={() => setOrder('API')}>API</button><button onClick={() => setOrder('ASC')}>A-Z</button><button onClick={() => setOrder('DESC')}>Z-A</button>
                    {<LookUp mode={state} searchedData={searchData}/>}
                </div>
                <div className="Container">
                    {state === 'Films' && <Films order={order} searchedData={searchedData}/>}
                    {state === 'People' && <Characters order={order} searchedData={searchedData}/>}
                    {state === 'Planets' && <Planets order={order} searchedData={searchedData}/>}
                </div>
            </body>   
    );
}

export default Container;