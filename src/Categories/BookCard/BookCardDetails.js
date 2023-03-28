import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import getLocalStorage from '../../LocalStorage/getLocalStorage';
import setLocalStorage from '../../LocalStorage/setLocalStorage';

const BookCardDetails = () => {
    const { setTotalCart } = useContext(AuthContext)
    const bookData = useLoaderData();
    let totalProductCart = getLocalStorage("totalProductCart");
    console.log(bookData)
    const [count, setCount] = useState(0)

    const { bookImage, bookName, bookPrice, authorName, bookDescription, _id } = bookData;
    const handleAddCart = () => {
        const countStore = {
            _id: _id,
            count


        }
        totalProductCart = totalProductCart + count;
        setLocalStorage("totalProductCart", parseInt(totalProductCart))
        setTotalCart(getLocalStorage("totalProductCart"))
        const localData = getLocalStorage("cart")
        const duplicate=localData?.find(data=>data._id===_id)
        if(duplicate){
            countStore.count=duplicate.count+countStore.count;
        }
        const remainingData = localData?.filter(data => data._id !== _id)
        setLocalStorage("cart", [...remainingData, countStore])
    }


    return (
        <div className="hero max-h-screen bg-base-200">
            <div className="hero-content flex-col items-center lg:flex-row">
                <img className='' src={bookImage} alt="" />
                <div className='mt-5'>
                    <h1 className="text-5xl font-bold">{bookName}</h1>
                    <p className='font-semibold mt-2'>Author Name: {authorName}</p>
                    <p className="py-6">{bookDescription}</p>
                    <span className='flex justify-end'>
                        <button className="btn btn-primary text-2xl">$ {bookPrice}</button>
                    </span>

                    <div className='w-2/3 md:w-1/3 grid grid-cols-4 mx-auto mt-5'>
                        <div className='border-2 text-4xl flex justify-center items-center cursor-pointer' onClick={() => setCount(count - 1)}>-</div>
                        <div className='border-2 flex justify-center items-center cursor-pointer'>{count}</div>
                        <div className='border-2 text-2xl flex justify-center items-center cursor-pointer' onClick={() => setCount(count + 1)}>+</div>
                        <button onClick={handleAddCart} className='btn btn-dark' type="">Add Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCardDetails;
