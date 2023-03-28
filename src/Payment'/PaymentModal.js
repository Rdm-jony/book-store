import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51M8nsMJerXZOObUuFBFKUH9HHXiwp1k0OFoOc4JJte18Pjy8FoPjkuWEMlKYYMXTfSybAwAWoeFoPpNC8G2NY9Wd00zf8hXdym');

const PaymentModal = ({ modalData,setModalData }) => {



    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center">Payment : {modalData} tk</h3>

                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckOutForm price={modalData} setModalData={setModalData}/>
                        </Elements>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default PaymentModal;