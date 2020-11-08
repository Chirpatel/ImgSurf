import React, {
  useState,
  useEffect
} from 'react';
import Gallery from './Gallery';
import './Image.css'
//import getData from './Data';
import UnsplashApi from '../Api/Image/Api';



function Image() {
  var [data, setData] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [isBottom, setIsBottom] = useState(false);

  function handleScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    if (scrollTop + window.innerHeight  >= scrollHeight/1.5) {
      //console.log(scrollTop + window.innerHeight,scrollHeight)
      setIsBottom(true);
    }
  }
  useEffect(() => {
    const addData = async () => {
      setData([...data, ...await UnsplashApi()]);
    }
    const addItems = () => {
      addData();
      setIsBottom(false);
    };
    if (isBottom) {
      addItems();
    }
  }, [isBottom, data, setData]);



  useEffect(() => {
    const Data = async () => {
      setData(await UnsplashApi());
    }
    Data();

  }, [setData])
  //console.log(data);
  //let data = getData();
  try {

    return ( 
      <div className = "gallery" >
        <Gallery imgarr = {data}/> 
      </div>
    )
  } catch (err) {
      console.log(err);
  }

}

export default Image;
