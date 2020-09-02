import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Payments from './Payments';

class Header extends Component{
    renderContent(){
        console.log("hi");
        console.log(this.props.auth);
        
        switch(this.props.auth){
            case null:
                return ;
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
             default:
                return [
                    <li key='1'><Payments /></li>,
                    <li key='2'><a href="/api/logout">Logout</a></li> /* Li is taking unique id, else it throws warning each JSX element should be unique */
                ];
        }
    }
    render(){
 
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth?'/surveys':'/'} 
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}                    
                    </ul>
                </div>
            </nav>
        )
    }
}

/*Take redux state, and fill the props auth from state which will be given to Header component below*/
function mapStateToProps({auth}){
    return {auth};
}
export default connect(mapStateToProps)(Header);