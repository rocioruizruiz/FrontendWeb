import react, {FC, useState} from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import './Container.css'
import Book from './Book'
import axios from 'axios'


interface IData {
    numFound: number;
    start:0;
    docs: IBook[];
}
interface IBook{ 
    title: string;
    author_name: string;
    publish_year?: number[];
    isbn?: string[];
    id_amazon?: string[];
}

const Container:FC = () => {
    const [textTitle, setTextTitle] = useState<string>(''); 
    const [textAuthor, setTextAuthor] = useState<string>('');  
    const [data, setData] = useState<IData|undefined>(undefined);
    const [searchMode, setSearchMode] = useState<boolean>(false);
    const [az, setAZ] = useState<boolean>(false);
    const [rec, setREC]= useState<boolean>(false);
    const [myPage, setMyPage] = useState<number>(0); 
    const [apiPage, setApiPage] = useState<number>(1);
    const [listView, setListView] = useState<boolean>(false);


    const search = (searchText: string, page=1) => {
        setData(undefined)
        setSearchMode(true);
        if(textTitle !== ''){ 
            axios.get(encodeURI(`${process.env.REACT_APP_API_URL}?title=${searchText}&page=${page}`))
            .then( ( (response: {data:IData}) => {
                setData(response.data); setSearchMode(false); 
                console.log("Searching... ", encodeURI(`${process.env.REACT_APP_API_URL}?title=${searchText}&page=${page}`));}))}
        if(textAuthor !== ''){ 
            axios.get(encodeURI(`${process.env.REACT_APP_API_URL}?author=${searchText}&page=${page}`))
            .then( ( (response: {data:IData}) => {
                setData(response.data); setSearchMode(false); 
                console.log("Searching... ", encodeURI(`${process.env.REACT_APP_API_URL}?title=${searchText}&page=${page}`))}))}
    };
    let docs_aux: IBook[] = [];
    if(data) { docs_aux = [...data.docs]};

    return(
        
            <body>
                <header></header>               
                <div className="Container">

        {/* LOOKUP */}
                    <div className="LookUpContainer">
                        <div className="Title"><h2>TYPE TO SEARCH</h2></div>
                        <div className="References">
                            <div>TITULO</div>
                            <div>AUTOR</div>
                        </div>
                        <div className="SearchBar">
                            <input type="text" className="LookUp" value={textTitle} onClick={() => {setTextAuthor('')}} onChange={(e) => {
                                setTextTitle(e.target.value)
                            }}/>
                            <input type="text" className="LookUp" value={textAuthor} onClick={() => {setTextTitle('')}} onChange={(e) => {
                                setTextAuthor(e.target.value)
                            }}/>
                            <button className="SearchButton" onClick={ () => {
                                setMyPage(0); setApiPage(1); setListView(false); setAZ(false); setREC(false); 
                                if(textTitle !== ''){ search(textTitle); console.log("Buscando por titulo: " + textTitle); }
                                if(textAuthor !== ''){ search(textAuthor); console.log("Buscando por autor: " + textAuthor); }
                                }}>Search
                            </button>
                            <button className="CloseButton" onClick={ () => {
                                    setSearchMode(false);
                                    setData(undefined); setMyPage(0); setApiPage(1); setListView(false); setAZ(false); setREC(false); 
                                    setTextAuthor(''); setTextTitle('');
                                }}>X
                            </button>
                        </div>
                        
                    </div> 

        {/* VIEW MODE AND ORDERING */}
                    {data && data.docs !== [] && data.docs.length!==0 &&
                        <div className="FilterBar">
                            <div className="Views">
                                <button onClick={() => setListView(false)}>Grid</button>
                                <button onClick={() => setListView(true)}>List</button> 
                            </div>
                            
                            {listView  && <div className="Order">
                                <button onClick={() => {
                                    setAZ(true); setREC(false);
                                }}>A-Z</button>
                                

                                <button onClick={() => {
                                    setAZ(false); setREC(true);
                                }}>Recent</button>
                            </div> }
                        </div>
                    }
                    {data && data.docs.length===0 &&
                        <div className="NotFound">No se encontraron resultados :(</div>
                    }

        {/* DATA */}

                    {!data && searchMode && <div className="ClipLoader"><ClipLoader color="#0000ff" size="50pxs"/></div>}

                {/* LIST */}
                    {data && listView &&
                        <div className="ContainerTarget">
                        {/* ALFABETIC */}
                            {data && az &&
                                    docs_aux
                                    .sort(function(a,b) { 
                                        if (a.title > b.title) return 1; 
                                        if (a.title < b.title) return -1; 
                                        else{return 0;}})
                                    .slice((myPage % 5) * 20, (myPage % 5) * 20 + 20)
                                    .map((book: IBook) => {
                                        console.log(book.title);
                                        return <Book book={book} listView={listView} />;
                                        
                                    })}
                        {/* RECENT */}
                            {data && rec &&
                                    docs_aux                                  
                                    .sort(function(a,b) { 
                                        if(!a.publish_year) return 1;
                                        else if(!a.publish_year) return -1;
                                        else if (a.publish_year && b.publish_year && a.publish_year[0] < b.publish_year[0]) return 1; 
                                        else if (a.publish_year && b.publish_year && a.publish_year[0] > b.publish_year[0]) return -1; 
                                        else {return -1;}})
                                    .slice((myPage % 5) * 20, (myPage % 5) * 20 + 20)
                                    .map((book: IBook) => {
                                        return <Book book={book} listView={listView} />;
                                    })}
                        {/* NORMAL */}    
                            {data && !az && !rec &&
                                    data.docs
                                    .slice((myPage % 5) * 20, (myPage % 5) * 20 + 20)
                                    .sort(function(a,b) { 
                                        if (a.title < b.title) return 1; 
                                        if (a.title > b.title) return -1; 
                                        else{return 0;}})
                                    .map((book: IBook) => {
                                        return <Book book={book} listView={listView} />;
                                    })}
                            
                            {data && console.log("Pagina: ", myPage, "items de la api: ", (myPage % 5) * 20, " - ", (myPage % 5) * 20 + 20 )}
                        </div>
                    }

                 {/* GRID */}
                    { data && !listView &&
                        <div className="ContainerTarget">
                            {data &&
                                    data.docs
                                    .sort(function(a,b) { 
                                        if (a.title < b.title) return 1; 
                                        if (a.title > b.title) return -1; 
                                        else{return 0;}})
                                    .slice((myPage % 5) * 20, (myPage % 5) * 20 + 20)
                                    
                                    .map((book: IBook) => {
                                        return <Book book={book} listView={listView} />;
                                    })}
                            {data && console.log("Pagina: ", myPage, "items de la api: ", (myPage % 5) * 20, " - ", (myPage % 5) * 20 + 20 )}
                            
                        </div>
                    }
                    
                    

    {/* FOOTER */}
                    <footer>

                        {data && myPage > 0 && <button className="Arrows" onClick={ () => {
                            setMyPage(myPage-1);
                            if ((myPage * 20) <= data.start) {
                                console.log("Lets go to: ", apiPage-1);
                                setApiPage(apiPage-1);
                                if(textTitle !== ''){ search(textTitle, apiPage-1); }
                                if(textAuthor !== ''){ search(textAuthor, apiPage-1); }
                            }
                            
                        }}>Prev</button>}

                        {data && myPage < (data.numFound/20 - 1) && <button onClick={ () => {
                            
                            setMyPage(myPage + 1);
                            if ((myPage * 20 + 20) >= data.start + 100) {
                                console.log("Lets go to: ", apiPage+1);
                                setApiPage(apiPage+1);
                                if(textTitle !== ''){ search(textTitle, apiPage+1); }
                                if(textAuthor !== ''){ search(textAuthor, apiPage+1); }
                            }

                        }}>Next</button>}

                    </footer>
                </div>
            </body>   
    );
}

export default Container;
