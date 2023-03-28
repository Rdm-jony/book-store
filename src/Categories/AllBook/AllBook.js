import React from 'react';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import BookCard from '../BookCard/BookCard';

const AllBook = () => {
    let searchBook;
    const { searchText } = useContext(AuthContext)
    const { data: allBook } = useQuery({
        queryKey: ["allBook"],
        queryFn: () => fetch(`${process.env.REACT_APP_URL}/allBook`)
            .then(res => res.json())
    })

    if (searchText) {
        searchBook = allBook.filter(book => book?.bookName?.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
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
                    allBook?.map(book => <BookCard key={book._id} book={book}></BookCard>)
                }
            </div>
        </>

    );
};

export default AllBook;