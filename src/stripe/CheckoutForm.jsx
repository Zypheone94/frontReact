import React from "react";
import {CardElement, AddressElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {api} from "../utils/api.jsx";
import {useNavigate} from "react-router-dom";

const CheckoutForm = ({totalPrice}) => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const cardElementStyle = {
        base: {
            display: 'block',
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#495057',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            borderRadius: '0.25rem',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        },
        invalid: {
            borderColor: '#dc3545',
        },
        focus: {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
    };

    const handleSubmit = async e => {
        e.preventDefault()
        const addressElement = elements.getElement('address');
        const {complete, value} = await addressElement.getValue()

        if (complete) {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        city: value.address.city,
                        country: value.address.country,
                        line1: value.address.line1,
                        line2: value.address.line2,
                        postal_code: value.address.postal_code,
                        state: value.address.state,
                    },
                },
            });
            try {
                const id = paymentMethod.id
                const req = await api('payment/payement', "POST", {'id': id, 'amount': totalPrice*100})
                console.log(req)
                if (req === 'succeeded') {
                    navigate('/paiement/success')
                } else {
                    navigate('/paiement/failure')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <form onSubmit={handleSubmit} className='mx-12'>
            <CardElement options={{
                style: cardElementStyle,
            }}/>
            <AddressElement options={{mode: 'shipping'}}/>
            <div className='my-12 ml-4'>
                <button className="cursor-pointer block p-4" style={{
                    border: "1px solid #3A0CA3",
                    borderRadius: "15px",
                    color: '#F72585'
                }}>Procéder au payement
                </button>

            </div>
        </form>
    )
}

export default CheckoutForm