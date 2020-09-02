import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from './../actions';

class Payments extends Component{
    render(){
        return (
            <StripeCheckout
                name="Emaily App"
                description="$5 for 5 email credits"
                amount={500}
                token ={ (token)=>{this.props.handleToken(token)} } /* This is a callback function from Stripe , after token is rcvd */
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);

/*
1. User click 'Add credits'
2. Tell Stripe to show a credit form(default is US cents)
3. User enter credit card details
4. Details are sent directly from the form to the Stripe
5. Stripe sends back a token representing the change
6. We send token to our API
7. Our API confirms that charge was successful with Stripe 
8. Add credit to User accounts

*/

/*
Credit card:4242 4242 4242
Date:10/20 
PIN: 123

Returned Token looks like:
card: {id: "card_1HMxoADDd64U2G1UtYOu34gW", object: "card", address_city: null, address_country: null, address_line1: null, …}
client_ip: "183.83.142.35"
created: 1599060214
email: "sdfasd@fsd.com"
id: "tok_1HMxoADDd64U2G1UHpdCQBbK"
livemode: false
object: "token"
type: "card"
used: false
__proto__: Object

*/