import React, { Component } from 'react';
import imgNew from './images/macbookpro.jpg';
import './css/news.css';

const Item = (props) =>{
    return <div>
        <img className='img' src={props.image}></img>
    </div>
}

class News extends Component{

    render(){
        return <Item image={this.props.image}/>
    }

}
export default News;