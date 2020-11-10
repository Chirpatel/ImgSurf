import React,{useState,useEffect}from 'react';
const Search = ({q,searched}) =>{
    //console.log("q: ",q,"searched: ",searched);
    const [query,setQuery] = useState("");
    function search(e){
        //console.log(e.target.value);
        setQuery(e.target.value);
        
    }
    useEffect(() => {
        
        if(searched){
            //console.log("Set Query");
            setQuery(q);
        }
    }, [setQuery,q,searched])
    function submitSearch(){
        window.location = '/search/'+query;
    }
    return(
        <div className="search-container">
            <input type="text" placeholder="Search.." name="search" value ={query} onChange={search}/>
            <button className={"searchbtn"} type="submit" onClick={submitSearch}><i className="fa fa-search"></i></button>
        </div>
        
    );
}
export default Search;