import React, {useState, useEffect} from 'react';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {data,loading} = useFetch("/movie/upcoming?api_key=611f5b9b659c50118c4488a0dd035ece");

  useEffect(()=>{
    const bg = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  },[data])

  const searchQueryHandler = (event)=>{
    //if user type search query and press enter, and search query not empty, then api call
    if(event.key === 'Enter' && query.length >0 ){
        navigate(`/search/${query}`)
    }
  }

  return (
      <div className="heroBanner">
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">The ultimate destination for movie lovers.Explore Now</span>
            <div className="searchInput">
              <input type="text" placeholder='Search for movie or TV show..' onChange={(e)=> setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HeroBanner