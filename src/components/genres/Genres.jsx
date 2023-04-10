import React from 'react';
import "./style.scss";
import { useSelector } from 'react-redux';

const Genres = ({data}) => {
    const {genres} = useSelector((state)=> state.home);
  return (
    <div className='genres'>
        {data?.map((g)=>{
            if(!genres[g]?.name) return;
            return(
                <div key={g} className="genre">
                    {genres[g]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres