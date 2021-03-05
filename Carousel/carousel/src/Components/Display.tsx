import React, {useState, FC} from 'react'
import {images} from '../Helpers/CarouselData'
import './Display.css'

interface IDisplayProps{
    image: number;
}
const Display:FC<IDisplayProps> = ({image}) => {
    
    return (
        <div className="display">
            <div className="image-displayer" style={{ backgroundImage: `url(${images[image].img})` }}>
            </div>
        </div>
    )
}

export default Display
