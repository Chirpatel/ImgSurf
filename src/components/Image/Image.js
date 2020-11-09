import React, {
  useState,
  useEffect
} from 'react';
import Gallery from './Gallery';
import './Image.css'
//import getData from './Data';
import randomImageApi from '../Api/Image/RandomImageApi';
import searchImageApi from '../Api/Image//SearchImageApi';
import Search from '../Search/Search'


function Image({query,searched}) {
  // /*For Searching */
  const [searchQuery,setQuery] = useState({query:"",search:false,page:0,isEnd:false});
  const [isLoading,setLoading] = useState(false);
  const [isFirstPage,setFirstPage] = useState(false);
  /*Updating the Query */
  useEffect(() => {
    function setSearch(){
      setQuery({query:query,search:true,page:1});
      setFirstPage(false)
    }
    if(searched){
      setSearch();
    }
  },[query,searched]);

  /* Initial Call */
  var [data, setData] = useState([]);
  useEffect(() => {
    const Data = async () => {
      if(!isFirstPage && !isLoading){
        console.log("First Function...................................................")
        if(searchQuery.search ){
          setLoading(true)
          let tempdata = await searchImageApi({query:searchQuery.query,page:searchQuery.page+1});
          setData(tempdata.results);
          setQuery({...searchQuery,totalpage:searchQuery.totalpage,page:searchQuery.page+1})
          setLoading(false)
          setFirstPage(true)
          console.log("Search")
        }
        else if(!searchQuery.search){
          setLoading(true)
          setData(await randomImageApi());
          setLoading(false)
          setFirstPage(true)
          console.log("Random");
        }
        console.log("....................................................................")
      }
    }
    Data();
  }, [setData,searchQuery,setQuery,isLoading,setLoading,isFirstPage,setFirstPage])

  /* Infinite Scroll */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [isBottom, setIsBottom] = useState(false);

  function handleScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    if (scrollTop + window.innerHeight  >= scrollHeight/1.5) {
      console.log(scrollTop + window.innerHeight,scrollHeight)
      setIsBottom(true);
    }
  }
  useEffect(() => {
    const addData = async () => {
      if(searchQuery.search===true && !isLoading){
        if(searchQuery.page>=searchQuery.totalpage){
          setQuery({...searchQuery,isEnd:true});
        }
        else{
          setLoading(true);
          let tempdata = await searchImageApi({query:searchQuery.query,page:searchQuery.page+1});
          console.log("Infinite Scroll: ",tempdata.results);
          setData([...data, ...tempdata.results]);
          setQuery({...searchQuery,page:searchQuery.page+1})
          setLoading(false)
        }
      }
      else if(!searchQuery.search && !isLoading){
        setLoading(true)
        setData([...data, ...await randomImageApi()]);
        setLoading(false)
      }
      
    }
    const addItems = () => {
      addData();
      setIsBottom(false);
    };
    if (isBottom) {
      addItems();
    }
  }, [isBottom, data, setData,searchQuery,setQuery,isLoading]);


  //console.log("Query: ",searchQuery);
  //console.log(data);
  //let data = getData();

  try {

    return ( 
      <div className = "gallery" >
        <Search q={query} searched={searched}/>
        <Gallery imgarr = {data}/>
        {searchQuery.isEnd &&
          <div className={"end"}>Etc...</div>
        }
        {isLoading&&
          <div >Loading...</div>
        }
      </div>
    )
  } catch (err) {
      console.log(err);
  }

}

export default Image;
