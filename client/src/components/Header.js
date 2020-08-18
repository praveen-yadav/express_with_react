import React, { Component } from 'react';
import {connect} from 'react-redux';
class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return ;
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
             default:
                return (
                    <li><a href="#">Logout</a></li>
                );
        }
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <nav>
                <div className="nav-wrapper">
                    <a href="#" className="left">Emaily</a>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}                    
                    </ul>
                </div>
                </nav>
            </div>
        )
    }
}

/*Take redux state, and fill the props auth from state which will be given to Header component below*/
function mapStateToProps(state){
    return {auth: state.auth};
}
export default connect(mapStateToProps)(Header);