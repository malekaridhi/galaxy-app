import React, { Component } from 'react';
import { Typography } from "antd";

import Functional from './functional'
class Game1 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div className='RPS'>
            <h3>Rock Paper Sisors</h3>
           <Functional>

           </Functional>
        </div> );
    }
}
 
export default Game1;