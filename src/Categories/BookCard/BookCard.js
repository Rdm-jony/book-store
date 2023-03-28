import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const { bookImage, bookName, bookPrice, authorName, bookDescription,_id } = book;
    return (
        <div>
            <Link  to={`../../allBook/${_id}`}>
                <div className="card hover:border-4 hover:bg-pink-100 bg-base-100 shadow-xl">
                    <figure><img className='w-48 h-48 p-5 shadow-md' src={bookImage} alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{bookName.length > 25 ? bookName.slice(0, 25) : bookName}{bookName.length > 25 ? "..." : ""}</h2>
                        <p>Author Name : {authorName}</p>
                        <p>{bookDescription.length > 50 ? bookDescription.slice(0, 50) : bookDescription}...</p>
                        <div className="card-actions justify-between items-center">
                            <h2 className='font-bold'>${bookPrice}</h2>
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BookCard;