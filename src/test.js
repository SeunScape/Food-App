import React from 'react';

const Recipie = ({title, calories, image}) => {
    return(
        <div>
            <h1>{title}</h1>
            <p>{calories}</p>
            <img src={image} alt='img'/>
        </div>
    )
}
export default Recipie;