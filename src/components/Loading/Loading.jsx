import React from 'react';
import './Loading.scss';
const Loading = () => {
    return (
        <>
            <article className='loaderArticle'>
                <div className='loaderArticle__loader'></div>
                <div style={{color:"white", display:'flex', fontSize:'2em'}}>Loadin...</div>
            </article>
        </>
    )
}

export default Loading;