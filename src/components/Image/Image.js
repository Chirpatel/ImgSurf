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
  const [searchQuery,setQuery] = useState({query:"",search:false,isEnd:false});
  const [isLoading,setLoading] = useState(false);
  const [isFirstPage,setFirstPage] = useState(false);
  const [pageLoaded,setLoadedPage] = useState(0);
  /*Updating the Query */
  useEffect(() => {
    function setSearch(){
      setQuery({query:query,search:true,page:1});
      setFirstPage(false)
      setLoadedPage(0)
    }
    if(searched){
      setSearch();
    }
  },[query,searched,setLoadedPage]);

  /* Initial Call */
  var [data, setData] = useState([]);
  useEffect(() => {
    const Data = async () => {
      if(!isFirstPage && !isLoading){
        //console.log("First Function...................................................")
        if(searchQuery.search ){
          setLoading(true)
          let tempdata = await searchImageApi({type:1,query:searchQuery.query,page:pageLoaded+1});
          //setData(tempdata.data);
          let tempdata1 = await searchImageApi({type:2,query:searchQuery.query,page:pageLoaded+1});
          let tempdata2 = await searchImageApi({type:3,query:searchQuery.query,page:pageLoaded+1});
          //console.log("Searched First Page Called.");
          setData([...tempdata.data,...tempdata1.data, ...tempdata2.data]);
          setQuery({...searchQuery,totalpage:tempdata.TotalPage})
          setLoading(false)
          setFirstPage(true)
          setLoadedPage(pageLoaded+1)
          //console.log("Search")
        }
        else if(!searchQuery.search){
          setLoading(true)
          //console.log(await randomImageApi(1,1));
          setData([ ...await randomImageApi({type:1,page:pageLoaded+1}), ...await randomImageApi({type:2,page:pageLoaded+1}), ...await randomImageApi({type:3,page:pageLoaded+1})]);
          //setData([...data, ...await randomImageApi({type:3,page:pageLoaded+1})]);
          setLoading(false)
          setFirstPage(true)
          setLoadedPage(1)
         // console.log("Random");
        }
        //console.log("....................................................................")
      }
    }
    Data();
  }, [setData,searchQuery,setQuery,isLoading,setLoading,isFirstPage,setFirstPage,data,pageLoaded,setLoadedPage])

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
        if(pageLoaded>=searchQuery.totalpage){
          setQuery({...searchQuery,isEnd:true});
        }
        else{
          setLoading(true);
          //console.log("Searched Infinite Page Called.");
          let tempdata = await searchImageApi({type:1,query:searchQuery.query,page:pageLoaded+1});
          //console.log("Infinite Scroll: ",tempdata.results);
          let tempdata1 = await searchImageApi({type:2,query:searchQuery.query,page:pageLoaded+1});
          let tempdata2 = await searchImageApi({type:3,query:searchQuery.query,page:pageLoaded+1});
          setData([...data, ...tempdata.data, ...tempdata1.data,...tempdata2.data]);
          setLoadedPage(pageLoaded+1)
          setLoading(false)
        }
      }
      else if(!searchQuery.search && !isLoading){
        setLoading(true)
        setData([...data, ...await randomImageApi({type:1,page:pageLoaded+1}), ...await randomImageApi({type:2,page:pageLoaded+1}), ...await randomImageApi({type:3,page:pageLoaded+1})]);
        setLoadedPage(pageLoaded+1)
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
  }, [isBottom, data, setData,searchQuery,setQuery,isLoading,pageLoaded,setLoading]);


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
