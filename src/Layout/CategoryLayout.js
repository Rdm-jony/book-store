import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import { HiMenuAlt2 } from "react-icons/hi";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { AiOutlineSearch } from "react-icons/ai";

const CategoryLayout = () => {
    const { setSearchText } = useContext(AuthContext)
    const { data: categories } = useQuery({
        queryKey: ["bookCategories"],
        queryFn: () => fetch(`${process.env.REACT_APP_URL}/categories`)
            .then(res => res.json())
    })

    const handleCharge = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText)

    }
    console.log(categories)
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className='flex lg:justify-end justify-between items-center mb-5'>
                    <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden text-2xl"><HiMenuAlt2></HiMenuAlt2></label>
                    <div className='flex items-center'>
                        <input onChange={handleCharge} type="text" placeholder="Type here" className="input input-bordered w-30" />
                       <button className='btn btn-primary text-xl'> <AiOutlineSearch></AiOutlineSearch></button>
                    </div>
                </div>

                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li><Link to="../categories">All</Link></li>
                    {
                        categories?.map((category, i) => <li key={i}><Link to={`../categories/${category}`}>{category.toUpperCase()}</Link></li>)
                    }
                </ul>

            </div>
        </div>
    );
};

export default CategoryLayout;

