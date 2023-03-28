import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../pages/shared/Header/Header';

const DashBboard = () => {

    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-slate-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to="/dashboard">ADD BOOK</Link></li>
                        <li><Link to="/dashboard/allUsers">All User</Link></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBboard;