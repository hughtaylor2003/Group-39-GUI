import React, { useState, useEffect } from 'react';

import './bookmarkPage.css';

export default function BookmarkPage({ isOpen, onClose,loadBookmark }) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            if (storedBookmarks) {
                setBookmarks(storedBookmarks);
             
            }
        }
    }, [isOpen]);

    const viewBookmark = (bookmark) => {
        loadBookmark({ value: `${bookmark.lat} ${bookmark.lon}`, label: bookmark.city });
        onClose(); 
    };

    return (
        <>
        
            {isOpen && (
                <div className="bookmarks-container">
                    <h2>Bookmarks:</h2>
                    {bookmarks.map((bookmark, index) => (
                        <div key={index}>
                            <div className='bookmarkValue' onClick={()=> viewBookmark(bookmark)}>
                            
                                <p>{bookmark.city}</p>
                                <p>Temperature: {bookmark.temperature}°C</p>
                                <p>{bookmark.description}</p>
                            </div>
                        </div>
                    ))}
                    <button onClick={onClose}>Close</button>
                </div>
            )}
        </>
    );
}
