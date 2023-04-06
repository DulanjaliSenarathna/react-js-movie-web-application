import React,{ useEffect} from 'react';
import {fetchDataFromApi} from "./utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state)=>
    state.home
  );

  useEffect(()=>{
    apiTesting();//invoke method
  },[])//[]-dependency

const apiTesting = () =>{
  fetchDataFromApi('/movie/popular?api_key=611f5b9b659c50118c4488a0dd035ece')
    .then((res)=>{
      console.log(res);
      dispatch(getApiConfiguration(res))
    })
}

  return (
    <div className="App">
      {url?.total_pages}
    </div>//added ? for make url optional, because api response take some time to get data and that time url will undefined and break app
  )
}

export default App
