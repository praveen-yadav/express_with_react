import React, { Component } from 'react'

class Header extends Component{
    render(){
        return (
            <div>
                <nav>
                <div class="nav-wrapper">
                    <a href="#" class="left">Emaily</a>
                    <ul id="nav-mobile" class="right">
                    <li><a href="sass.html">Login with Google</a></li>
                    </ul>
                </div>
                </nav>
            </div>
        )
    }
}

export default Header;