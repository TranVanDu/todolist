import React, { Component } from 'react';
import classNames from 'classnames';

import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { count, checkCount, isCheckButton } = this.props;
        const { checkAll, checkActive, checkComplete, clearItems} = this.props;
        return (
            <div className="footer">
                <strong>{count}</strong>
                <span>item left</span>
                <div className="btn">
                    <button className={classNames("button",{
                        "All": isCheckButton==="All" ? true : false
                    })} onClick={checkAll}> All </button>
                    <button className={classNames("button",{
                        "Active": isCheckButton==="Active" ?true: false
                    })} onClick={checkActive} >Active</button>
                    <button className={classNames("button", {
                        "Complete": isCheckButton==="Complete" ? true:false
                    })} onClick={checkComplete}>Complete</button>
                    <button  className={classNames("btn-all",{
                        "Clear": checkCount
                    }) }onClick={clearItems}>Clear Complete</button>
                </div>
            </div>
        );
    }
}

export default Footer;