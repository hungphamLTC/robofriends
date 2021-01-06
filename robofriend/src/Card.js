import React from 'react';

const Card = ({key, name, email}) =>{
    return(
        
        <div className='bg-light-green dib br4 pa3 ma3 grow bw2 shadow-5'>
            <img src={`https://robohash.org/${name}?size=200x200`} alt='robot here'/>
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;