import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import Gallery from './Gallery';
import './Image.css'
//import getData from './Data';
import randomImageApi from '../Api/Image/RandomImageApi';
import searchImageApi from '../Api/Image//SearchImageApi';
import Search from '../Search/Search'


function Image({query,searched}) {
  // /*For Searching */
  const [searchQuery,setQuery] = useState({query:"",search:false,isEnd:false});
  const [isLoading,setLoading] = useState(false);
  const [isFirstPage,setFirstPage] = useState(false);
  const [isEnd,setEnd] = useState(false);
  //const [currentPage.current,setLoadedPage] = useState(0);
  const currentPage = useRef(0);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  /*Updating the Query */
  useEffect(() => {
    function setSearch(){
      setQuery({query:query,search:true,page:1});
      currentPage.current = 0
      currentPage.current=0;
    }
    if(searched){
      setSearch();
    }
  },[query,searched]);

  /* Initial Call */
  var [data, setData] = useState([]);
  useEffect(() => {
    
    const Data = async () => {
        currentPage.current++;
        //console.log("First Function...................................................")
        //console.log("isFirstPage: ",isFirstPage,"isLoading: ",isLoading,"currentPage.current: ",currentPage.current,"currentPage: ",currentPage);
        if(searchQuery.search ){
          setLoading(true)
          let tempdata = await searchImageApi({type:1,query:searchQuery.query,page:currentPage.current});
          //setData(tempdata.data);
          let tempdata1 = await searchImageApi({type:2,query:searchQuery.query,page:currentPage.current});
          let tempdata2 = await searchImageApi({type:3,query:searchQuery.query,page:currentPage.current});
          //console.log("Searched First Page Called.");
           setLoading(false)
           setFirstPage(true)
           
           setData([...data,...tempdata.data,...tempdata1.data, ...tempdata2.data]);
           setQuery({...searchQuery,totalpage:tempdata.TotalPage})
          
          //console.log("Search")
        }
        else if(!searchQuery.search){
           setLoading(true)
          //console.log(await randomImageApi(1,1));
           setData([...data, ...await randomImageApi({type:1,page:currentPage.current}), ...await randomImageApi({type:2,page:currentPage.current}), ...await randomImageApi({type:3,page:currentPage.current})]);
          //setData([...data, ...await randomImageApi({type:3,page:currentPage.current})]);
           setLoading(false)
           setFirstPage(true)
           
         // console.log("Random");
         
        }
        await delay(10000)
        //console.log("....................................................................")
      }
    if(!isLoading && currentPage.current===0){
      Data();
    }
  }, [setData,searchQuery,setQuery,isLoading,setLoading,isFirstPage,setFirstPage,data,currentPage])

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
      //console.log(scrollTop + window.innerHeight,scrollHeight)
      setIsBottom(true);
    }
  }
  useEffect(() => {
    const addData = async () => {
      
      if(searchQuery.search===true && !isLoading){
        if(currentPage.current>=searchQuery.totalpage){
          setEnd(true);
          setLoading(false)
        }
        else{
          //console.log("Last Function...................................................")
          currentPage.current++;
          setLoading(true);
          //console.log("Searched Infinite Page Called.");
          let tempdata = await searchImageApi({type:1,query:searchQuery.query,page:currentPage.current});
          //console.log("Infinite Scroll: ",tempdata.results);
          let tempdata1 = await searchImageApi({type:2,query:searchQuery.query,page:currentPage.current});
          let tempdata2 = await searchImageApi({type:3,query:searchQuery.query,page:currentPage.current});
          setData([...data, ...tempdata.data, ...tempdata1.data,...tempdata2.data]);
          
          setLoading(false)
        }
      }
      else if(!searchQuery.search && !isLoading){
        currentPage.current++;
        setLoading(true)
        if(currentPage.current<4){
          setData([...data, ...await randomImageApi({type:1,page:currentPage.current}), ...await randomImageApi({type:2,page:currentPage.current}), ...await randomImageApi({type:3,page:currentPage.current})]);
          setLoading(false)
        }else{
          setEnd(true);
          setLoading(false)
        }
      }
      
    }
    const addItems = () => {
      addData();
      setIsBottom(false);
    };
    if (isBottom) {
      addItems();
    }
  }, [isBottom, data, setData,searchQuery,setQuery,isLoading,currentPage,setLoading]);


  //console.log("Query: ",searchQuery);
  //console.log(data);
  //let data = getData();

  try {

    return ( 
      <div className = "gallery" >
        <Search q={query} searched={searched}/>
        <Gallery imgarr = {data} liked={[]}/>
        {isEnd &&
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
