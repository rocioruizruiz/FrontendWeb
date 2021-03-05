import React, {useState} from 'react';
import './App.css';
import Carousel from './Components/Carousel'
import Display from './Components/Display'



const App = () => {
  const [image, setImage] = useState<number>(0);
  const updateImage = (i: number) => {    
      setImage(i);
  }
  return (
    <div className="App">
      <Display image={image}/>
      <Carousel update={updateImage}/>
    </div>
  );
}

export default App;
