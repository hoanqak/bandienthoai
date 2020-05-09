import React, { Component } from 'react';
import { render } from '@testing-library/react';
import './css/view-sample.css';
import imgMacbook from './images/macbookpro.jpg'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const BoxDetail = (props) =>{
    return <Link to={'product-information/' + props.name + '/' + props.productID} className='box' onClick={props.onClick}>
        <span className='discount-percent'>{props.discountPercent}</span>
        <img src={imgMacbook}/>
        <div className='detail'>
            <div className='name'>{props.name}</div>
            <div className='price-after-discount'>Price: {props.priceAfterDiscount}</div>
            <div className='price'>Discount: {props.price}</div>
        </div>
    </Link>
}

class ViewSample extends Component{

    // sendProduct =(productID) =>{
    //     this.props.callGetInformation(productID)
    // }

    render(){
        return <BoxDetail
        price={this.props.price}
        discountPercent={this.props.discountPercent}
        discount={this.props.discount}
        name={this.props.name} productID={ this.props.productID} priceAfterDiscount={ this.props.priceAfterDiscount }/>
    }
}

export default ViewSample;