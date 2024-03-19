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
            else{
                setBookmarks([]);
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
                <div className='bookmark-overlay'>
                <div className="bookmarks-container">
                    <h2>Bookmarks:</h2>
                    <div className='bookmark-list'>
                    {bookmarks.map((bookmark, index) => (
                        <div key={index}>
                            <div className='bookmark-value' onClick={()=> viewBookmark(bookmark)}>

                                <p>{bookmark.city}</p>
                                <p>Temperature: {bookmark.temperature}°C</p>

                                <p>{bookmark.description}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <button className='close-button' onClick={onClose}>Close</button>
            </div>
        )}
    </>
    );
}