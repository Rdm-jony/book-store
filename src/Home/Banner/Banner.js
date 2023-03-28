import React from 'react';
import img1 from '../../assets/banner1.png'

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full max-h-screen bg-pink-200">
                <div id="slide1" className="carousel-item relative w-full">
                    <div className='md:flex p-20'>
                        <div className='md:w-1/2 flex flex-col justify-center'>
                            <h2 className='md:text-5xl text-3xl font-semibold text-center md:text-left'>Feature Bookss Of The</h2>
                            <span className='md:text-5xl text-4xl font-bold text-center md:text-left'>February</span>
                            <span className='mt-5 md:block hidden'>
                                <button className='btn btn-dark' type="">see more</button>
                            </span>
                        </div>
                        <div className='md:w-1/2'>
                            <img className='md:w-3/4' src={img1} alt=""></img>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;