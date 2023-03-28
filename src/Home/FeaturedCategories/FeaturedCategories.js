import React from 'react';
import { FcGallery } from "react-icons/fc";
import { GiCampCookingPot } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BsInfoSquareFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
    return (
        <div className='mx-20'>
            <div className='mb-10 md:flex justify-between items-center'>
                <h2 className='text-4xl font-semibold md:mb-0 mb-4'>Featured Categories</h2>
                <Link className='flex items-center link link-hover' to="categories">All Categories <AiOutlineArrowRight></AiOutlineArrowRight></Link>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6'>
                <div className="card  bg-pink-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <FcGallery className='text-7xl'></FcGallery>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Art & Photo...</h2>
                        <p>Shop Now</p>
                    </div>
                </div>
                <div className="card  bg-pink-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <GiCampCookingPot className='text-7xl'></GiCampCookingPot>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Food & Drink</h2>
                        <p>Shop Now</p>
                    </div>
                </div>

                <div className="card bg-pink-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <FaHandHoldingHeart className='text-7xl text-red-500'></FaHandHoldingHeart>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Romance</h2>
                        <p>Shop Now</p>
                    </div>
                </div>

                <div className="card bg-pink-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <BsInfoSquareFill className='text-7xl text-sky-500'></BsInfoSquareFill>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Biography</h2>
                        <p>Shop Now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCategories;