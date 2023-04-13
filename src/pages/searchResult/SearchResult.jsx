import React ,{useState, useEffect} from 'react';
import "./style.scss"
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from './../../utils/api';
import ContentWrapper from './../../components/contentWrapper/ContentWrapper';
import noResults from "../../assets/no-results.png"
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';

const SearchResult = () => {
  //creating states
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const {query} = useParams();

  const fetchInitialData = () =>{
    	setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
        setData(res)
        setPageNum((prev)=>prev+1)
        setLoading(false)
      })
  }

  const fetchNextPageData = () =>{
    setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
        if(data?.results){
          setData({
            ...data, results:[...data?.results, ...res.results]
          })
        }else{
          setData(res)
        }
        setPageNum((prev)=>prev+1);
      })
  }

  useEffect(()=>{
      fetchInitialData();
  },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && (<ContentWrapper>
        {data?.results?.length > 0 ?(<>
        <div className="pageTitle">{`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}</div>
        <InfiniteScroll className='content' dataLength={data?.results?.length || []}>
          {data?.results.map((item,index)=>{
            if(item.media_type === 'person') return;
            return (
              <MovieCard 
              key={index} 
              data={item} 
              fromSearch={true} 
              next={fetchNextPageData}
              haseMore={pageNum <= data?.total_pages} loader={<Spinner/>}/>
            )
          })}
        </InfiniteScroll>
        </>):(
          <span className="resultNotFound">Sorry, Results not found</span>
        )}
      </ContentWrapper>)}
    </div>
  )
}

export default SearchResult