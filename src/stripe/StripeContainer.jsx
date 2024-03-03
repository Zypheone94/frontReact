import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm.jsx";

const PUBLIC_KEY = "pk_test_51NBaR5FzsV3puliaHmrwBti6tPD0pYWKrP3eK9I9JfMovNtL9hv0EhzaNQ9vIsdB3ovwGoBaX5bVSFURs70SAcUH001YsdwGBd"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = ({totalPrice}) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm totalPrice={totalPrice}/>
        </Elements>
    )
}

export default StripeContainer