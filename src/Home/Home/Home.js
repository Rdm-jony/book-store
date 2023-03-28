import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';

const Home = () => {
    return (
        <div className='grid gap-y-20'>
            <Banner></Banner>
            <FeaturedCategories></FeaturedCategories>
        </div>
    );
};

export default Home;