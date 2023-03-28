import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import BookCard from '../Categories/BookCard/BookCard';

const CategoryBook = () => {
    let searchBook;
    const { searchText } = useContext(AuthContext)
    const categoryBooks = useLoaderData()
    if (searchText) {
        searchBook = categoryBooks.filter(book => book?.bookName?.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    }
    return (
        searchBook ? <>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    searchBook?.map(book => <BookCard key={book._id} book={book}></BookCard>)
                }
            </div>
        </> : <>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    categoryBooks?.map(book => <BookCard key={book._id} book={book}></BookCard>)
                }
            </div>
        </>

    );
};

export default CategoryBook;