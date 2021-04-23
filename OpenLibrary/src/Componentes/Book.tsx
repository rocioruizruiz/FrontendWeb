import react, {FC, useState} from 'react'
import './Book.css'


interface IBook{
    title: string;
    author_name: string;
    publish_year?: number[];
    isbn?: string[];
    id_amazon?: string[];
}

const Books:FC<{book:IBook, listView:boolean}> = (book_props:{book:IBook, listView:boolean}) => {

    const book:IBook = book_props.book;
    const listView:boolean = book_props.listView;
    let srcisbn: string = "";
    let urls: string = "";
    let talla:string;
    if(listView) {talla = "-S.jpg";} else {talla = "-M.jpg"}
    if(book.isbn !== undefined) srcisbn = "http://covers.openlibrary.org/b/isbn/" + book.isbn[0] + talla;
    if(book.id_amazon !== undefined) urls = "https://www.amazon.es/dp/" + book.id_amazon[0];

    const [page, setPage] = useState<number>(0);
    
    
    if(!listView) return(  
       
        <div  className="TargetGRID">
            <img src={srcisbn} alt="COVER"/>
            <div className="infoTargetGRID">
                <div><h2>{book. title && book.title}</h2></div>
                <div><h3>{book.author_name && book.author_name}</h3></div>
                <div><span>{book.publish_year && book.publish_year[0]}</span></div>
                <div>{book.id_amazon && <button><a href={urls}>COMPRAR EN AMAZON</a></button>}</div>
            </div> 
        </div> 
    )
    else return(
       
        <div  className="ContainerTargetLIST">
            <div className="TargetLIST">
                <div className="infoTargetLIST">
                    <div><h2>{book. title && book.title}</h2></div>
                    <div><h3>{book.author_name && book.author_name}</h3></div>
                    <div><span>{book.publish_year && book.publish_year[0]}</span></div>
                    <div>{book.id_amazon && <button><a href={urls}>COMPRAR EN AMAZON</a></button>}</div>
                </div> 
            </div>   
        </div>
    )

}

export default Books;