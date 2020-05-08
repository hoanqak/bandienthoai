import React from 'react';
import './css/modal-custom.css';

class ModalCustom extends React.Component{

    closePopup = () =>{
        this.props.callClosePopup();
    }

    render(){
        let classPop = 'product-popup';
        let overlay = 'overlay';
        if(this.props.isOpen){
            classPop += ' open-popup';
            overlay += ' overlay-activate';
        }
        return <div callClosePopup={ this.props.callClosePopup }>
            <div className={ classPop }>
            <span className='close-button' onClick= {this.closePopup}></span>
            </div>
        <div className={ overlay }></div>
            </div>
    }

}

export default ModalCustom;