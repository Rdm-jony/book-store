import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError()
    const { status, statusText } = error;
    return (
        <div className="flex justify-center items-center h-screen">
            {
                error && <div>
                    <h3 className='text-warning'>{status}</h3>
                    <h4 className='text-danger'>{statusText}</h4>
                </div>
            }
        </div>
    );
};

export default ErrorPage;