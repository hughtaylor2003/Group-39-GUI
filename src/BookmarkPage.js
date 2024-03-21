import React, { useState, useEffect } from 'react';
import './bookmarkPage.css';

export default function BookmarkPage({ isOpen, onClose,loadBookmark,unit}) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            if (storedBookmarks) {
                setBookmarks(storedBookmarks);
            }
            else{
                setBookmarks([]);
            }
        }
    }, [isOpen]);

    const viewBookmark = (bookmark) => {
        loadBookmark({ value: `${bookmark.lat} ${bookmark.lon}`, label: bookmark.city });
        onClose(); 
    };

    //convert to right unit without api call
    function deg (bookmark) {
        if (unit.map == 'imperial' && (bookmark.units=='standard' || bookmark.units=='metric')){
            bookmark.units = unit.map
            bookmark.temperature = (bookmark.temperature * 9 / 5) + 32
            return(bookmark.temperature)
        }
        else if (unit.map == 'metric' && bookmark.units=='imperial')
        {
            bookmark.units = unit.map
            bookmark.temperature = (bookmark.temperature - 32) * 5 / 9
            return(bookmark.temperature) 
        }
        else return bookmark.temperature
    }

    return (
        <>
            {isOpen && (
                <div className='bookmark-overlay'>
                <div className="bookmarks-container">
                    <h2>Bookmarks:</h2>
                    <div className='bookmark-list'>
                    {bookmarks.map((bookmark, index) => (
                        <div key={index}>
                            <div className='bookmark-value' onClick={()=> viewBookmark(bookmark)}>

                                <p>{bookmark.city}</p>
                                <p>Temperature: {Math.round(deg(bookmark))}°</p>

                                <p>{bookmark.description}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                    <button className='close-button' onClick={onClose}>Close</button>
                </div>
                
            </div>
        )}
    </>
    );
}