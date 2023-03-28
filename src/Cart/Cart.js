import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import getLocalStorage from '../LocalStorage/getLocalStorage';
import { FiDelete } from "react-icons/fi";
import setLocalStorage from '../LocalStorage/setLocalStorage';
import PaymentModal from '../Payment\'/PaymentModal';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Cart = () => {
    const { user } = useContext(AuthContext)
    const localData = getLocalStorage("cart");
    let totalTk = 0;
    const cartBooks = []
    const [modalData, setModalData] = useState(null)
    const { data: allBooks } = useQuery({
        queryKey: ["allBook"],
        queryFn: () => fetch(`${process.env.REACT_APP_URL}/allBook`)
            .then(res => res.json())
    })
    localData?.map(local => {
        const findBook = allBooks?.find(book => book._id === local._id)
        if (findBook) {
            findBook.count = local.count;
            cartBooks.push(findBook)
        }
    })

    const handleDeteCart = (id) => {
        console.log(id)
        let localData = getLocalStorage("cart");
        const totalProductCart = getLocalStorage("totalProductCart")
        const localDataIndex = localData.findIndex(i => i._id === id);
        const deleteCart = localData.splice(localDataIndex, 1)
        setLocalStorage("cart", localData)
        // setTotalCart(totalProductCart - deleteCart[0].count)
        setLocalStorage("totalProductCart", (totalProductCart - deleteCart[0].count))
    }



    return (
        <div className='w-96 h-72 bg-slate-200 shadow-lg rounded-md p-5'>
            <p className='text-center font-semibold text-2xl'>CART</p>
            {
                cartBooks.map(cartBooks => <>
                    <div className='flex gap-x-2 my-2 items-center justify-between  border-2 border-black bg-slate-50'>
                        <img className='h-14 w-14' src={cartBooks.bookImage} alt=""></img>
                        <h2>{cartBooks.bookName.length > 15 ? cartBooks.bookName.slice(0, 15) : cartBooks.bookName} </h2>
                        <p>${cartBooks.bookPrice} x {cartBooks.count}</p>
                        <p>= {cartBooks.bookPrice * cartBooks.count} tk</p>
                        <div className='hidden'>
                            {
                                totalTk = totalTk + (cartBooks.bookPrice * cartBooks.count)
                            }
                        </div>
                        <FiDelete onClick={() => handleDeteCart(cartBooks._id)}></FiDelete>
                    </div>
                </>)
            }
            <div className='border-2 border-black mt-5'>

            </div>
            <p className='font-bold text-center text-xl'>Total : {totalTk} tk</p>
            <span className='flex justify-center my-5'>
                {
                    user ? <label onClick={() => setModalData(totalTk)} htmlFor="my-modal-3" className="btn">check out</label> : <span className='text-sm font-semibold'>Log in for Check out: <Link to="../signIn" className='btn btn-xs'>Log in</Link></span>
                }
            </span>
            {
                modalData && <PaymentModal modalData={modalData} setModalData={setModalData}></PaymentModal>
            }

        </div>
    );
};

export default Cart;