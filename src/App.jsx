import React,{ useEffect} from 'react';
import {fetchDataFromApi} from "./utils/api"

function App() {

  useEffect(()=>{
    apiTesting();//invoke method
  },[])//[]-dipendency

const apiTesting = () =>{
  fetchDataFromApi('/movie/popular?api_key=611f5b9b659c50118c4488a0dd035ece')
    .then((res)=>{
      console.log(res);
    })
}

  return (
    <div className="App">
      App
    </div>
  )
}

export default App
