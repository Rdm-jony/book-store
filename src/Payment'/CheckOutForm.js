import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';

const CheckOutForm = ({ price, setModalData }) => {
    const { user } = useContext(AuthContext)
    const [cardError, setCardError] = useState("")
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.REACT_APP_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error.message)
            setCardError(error.message)
        } else {
            setCardError("")

        }

        const { paymentIntent, error: consfirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName
                    },
                },
            },
        );

        if (consfirmError) {
            setCardError(consfirmError.message)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            const paymentInfo = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: price

            }

            fetch(`${process.env.REACT_APP_URL}/paymentMail`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(paymentInfo)

            })
                .then(res => res.json())
                .then(data => {
                    if (data?.status) {
                        localStorage.removeItem("cart")
                        localStorage.removeItem("totalProductCart")
                        setModalData(null)
                        toast.success("Payment successfull & check your email!")

                    }

                })
                .catch(er => console.log(er))

        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-accent btn-sm' type="submit" disabled={!stripe}>
                    Pay
                </button>

            </form>
            {
                <p className='text-xs text-red-500'>{cardError}</p>
            }
        </>
    );
};

export default CheckOutForm;