import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../../../Cart/Cart';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAdminToken from '../../../useToken/useAdminToken';


const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart, setCart] = useState(false)
    const [isAdmin] = useAdminToken(user?.email)


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(er => console.log(er))
    }

    const menulist = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="../categories">Categories</Link></li>
        {
            isAdmin && <li><Link to="/dashboard">Dashboard</Link></li>
        }
        <li><label onClick={() => setCart(!cart)}>
            <div className="indicator">
                <span className="indicator-item badge badge-dark">{localStorage.getItem("totalProductCart") ? localStorage.getItem("totalProductCart") : 0}</span>

                <AiOutlineShoppingCart></AiOutlineShoppingCart>

            </div>
        </label></li>

    </>
    return (
        <div>
            <div className="navbar bg-slate-100 border-4 relative">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                menulist
                            }
                        </ul>
                    </div>
                    <Link to="#" className="btn btn-ghost normal-case text-xl">Book Store</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            menulist
                        }
                    </ul>
                </div>

                <div className="navbar-end">
                    {
                        user ? <>
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <label tabIndex={0} className='w-10 h-10 bg-sky-400 text-white flex justify-center items-center text-xl rounded-full cursor-pointer'> {user?.displayName?.slice(0, 1).toUpperCase()}</label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-sky-600 rounded-box w-52">
                                    <li className='font-semibold text-white text-center py-2'>{user?.email}</li>
                                    <button onClick={handleLogOut} className='btn btn-dark text-white' type="">log out</button>
                                </ul>
                            </div>
                        </> : <Link to="../signIn"><BiUserCircle className='text-3xl'></BiUserCircle></Link>
                    }

                </div>

            </div>

            <div className='absolute top-15 right-0 z-30'>
                {
                    cart && <Cart></Cart>
                }
            </div>

        </div>
    );
};

export default Header;