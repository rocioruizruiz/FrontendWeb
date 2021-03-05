import React, {useState, FC} from 'react';
import './Carousel.css';
import {images} from '../Helpers/CarouselData';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface ICarouselProps{
    update:Function
}

const Carousel:FC<ICarouselProps> = ({update}) => {

    const [currImg, setCurrImg] = useState(0);

    return (
        <div className="carousel">
            <div className="carousel-inner" style={{ backgroundImage: `url(${images[currImg].img})` }} >
                
                <div className="left" 
                    onClick={()=> {
                        currImg > 0 ? setCurrImg(currImg-1) : setCurrImg(images.length-1);
                    }}><div className="numeration">{currImg+1} / {images.length}</div><ArrowBackIosIcon/></div>
                <div className="center" onClick={()=> update(currImg)}><h3>{images[currImg].title}</h3></div>
                <div className="right" 
                    onClick={()=> {
                        currImg < images.length - 1 ? setCurrImg(currImg+1) : setCurrImg(0);
                    }}><ArrowForwardIosIcon/></div>
                
            </div>
           
        </div>
    );
}

export default Carousel
