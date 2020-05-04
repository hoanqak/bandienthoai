import React, { Component } from 'react';
import { render } from '@testing-library/react';
import './css/view-sample.css';
import imgMacbook from './images/macbookpro.jpg'; 
const BoxDetail = (props) =>{

    return <div className='box'>
        <span className='discount-percent'>{props.discountPercent}</span>
        <img src={imgMacbook}/>
        <div className='detail'>
            <div className='name'>{props.name}</div>
            <div className='discount'>Price: {props.price}</div>
            <div className='price'>Discount: {props.discount}</div>
        </div>
    </div>

}

class ViewSample extends Component{

    render(){
        return <BoxDetail 
        price={this.props.price}
        discountPercent={this.props.discountPercent}
        discount={this.props.discount}
        name={this.props.name}/>
    }
}

export default ViewSample;