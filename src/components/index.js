import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './css/index.css';
import logo from './images/images.png';
import ViewSample from './view-sample';
import News from './news';
import imgNew from './images/macbookpro.jpg';

import dell from './images/dell.jpg';
import acer from './images/acer.jpg';

import config from './config/config'
import Paging from './paging';

import ModalCustom from './modal-custom';
import contains from './config/contains';
import ViewProductInformation from './view-product-information';

const Item = (props) =>{
    return <div className='item'>
        {props.itemName}
        <div className='detail-item'>
            <div>Macbook</div>
            <div>ASUS</div>
            <div>DELL</div>
        </div>
    </div>
}

const Header = () =>{
    return <div className='header'>
        <img className='img-logo' src={logo}/>
        <div className='search'>
            <div className='box-search'>
                <input type='text' placeholder='Search'></input>
                <i className="fa fa-search icon"></i>
            </div>
        </div>
    </div>
}

const Footer = (props) =>{
    return <div className='footer' >
        {props.children}
    </div>
}

class Index  extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            img: imgNew,
            dot1: this.activate(),
            dot2: this.noActivate(),
            dot3: this.noActivate(),
            dot4: this.noActivate(),
            news: {
                img1: 'img-activate',
                img2: 'img1',
                img3: 'img2'
            },
            imageActivate: 1,
            page: 1,
            open: false,
            viewMode: contains.viewMode.HOME
        };
        // setInterval(()=>{
        //     let count = this.state.imageActivate;
        //     if(count === 1){
        //         this.setState({imageActivate: 2});
        //     }else if(count === 2){
        //         this.setState({imageActivate: 3});
        //     }else if(count === 3){
        //         this.setState({imageActivate: 1});
        //     }
        //     this.setDotActivate(count);
        // }, 3000);

        console.log(this.state.categories)

    }

    chooseOne(){
        this.setState({
            dot1: this.activate(),
            news: {
                img1: 'img-activate',
                img2: 'img2',
                img3: 'img3'
            }
        });
    }
    chooseTow(){
        this.setState({
            dot2: this.activate(),
            news: {
                img2: 'img-activate',
                img1: 'img-seen-1',
                img3: 'img2'
            }
        });

    }
    chooseThree(){
        this.setState({
            dot3: this.activate(),
            news: {
                img3: 'img-activate',
                img2: 'img2',
                img1: 'img1'
            }
        });
    }

    nonActivateAllDot(){
        this.setState({
            dot1: this.noActivate(),
            dot2: this.noActivate(),
            dot3: this.noActivate(),
            dot4: this.noActivate()
        });
    }

    setDotActivate(index){
        this.nonActivateAllDot();
        switch(index){
            case 1:
                this.chooseOne();
                break;
            case 2:
                this.chooseTow();
                break;
            case 3:
                this.chooseThree();
                break;
            default:
                this.chooseOne();
        }
    }

    activate(){
        return 'dot activate';
    }

    noActivate(){
        return 'dot';
    }

    componentDidMount(){
        fetch(`${ config.BASE_URL }/api/v1/categories`).then(res => res.json()).then((result) => {
            try{
                this.setState({categories: result.data.categories})
            }catch(e){
                console.log(e)
            }
            })
        this.loadDataProduct();
    }

    onSubmit = () =>{

        let formData= new FormData();
        console.log(document.forms["formFile"].file.files[0]);
        formData.append("file", document.forms["formFile"].file.files[0]);
        formData.append('categoryDto', new Blob([JSON.stringify({
            "categoryName": document.getElementById("categoryName").value,
        })]));

        fetch(`${ config.BASE_URL }/admin/api/v1/test`, {
            method: "POST",
            headers:{
                'Content-Type': 'multipart/form-data',
                'Accept':'application/json'
            },
            body: formData
        }).then(res => res.json()).then((result) => {
            console.log(result)
        });
    }

    loadDataProduct = async () =>{
        fetch(`${ config.BASE_URL }/api/v1/products?page=${ this.state.page }`).then(res => res.json()).then((result) => {
            if(result != null && result.data != null) this.setState({products : result.data.products, totalPage: result.data.totalPage})
        })
    }

    callbackFunction = async (page) => {
        this.setPage(page);
        this.loadDataProduct();
    }

    setPage = (page) =>{
        this.setState({ page: page })
    }

    closePopup = () => {
        this.setState({open: false}); 
    }

    openPopup = () =>{
        this.setState({open: true}); 
    }

    render(){
        let content;
            let img = imgNew;
            let componentListProduct;
            console.log(this.state.products)
            if(this.state.products != null){
                componentListProduct = this.state.products.map((product, key) =>
                <ViewSample name={product.productName} productID={product.id} discount={product.price} key={key} price={product.price - ((product.discountPercent / 100) * product.price)} discountPercent={product.discountPercent +'%'}></ViewSample>
                )
            }
            let listCategoriesComponent;
            let { categories } = this.state;
            if(categories != null) {
                listCategoriesComponent = categories.map((cate, key) => <Item itemName={cate.categoryName} key={key}/>)
            }
            content = <div>
                        <div className='content'>
                            <div className='left'>
                                {listCategoriesComponent}
                            </div>
                            <div className='right'>
                                <div className={this.state.news.img1}>
                                    <News image={img}></News>
                                </div>
                                <div className={this.state.news.img2}>
                                    <News image={dell}></News>
                                </div>
                                <div className={this.state.news.img3}>
                                    <News image={acer}></News>
                                </div>
                                <div className='list-dot'>
                                    <span className={this.state.dot1} onClick={this.getCategories}></span>
                                    <span className={this.state.dot2} onClick={this.chooseTow}></span>
                                    <span className={this.state.dot3} onClick={this.chooseThree}></span>
                                </div>
                            </div>
                        </div>
                        <div className='list-item'>
                            {componentListProduct}
                        </div>
                        <Paging totalPage={this.state.totalPage} parentCallback={this.callbackFunction} pageActivate={this.state.page}></Paging>
                    </div>
        return  <div>
                    <Header/>
                    <div className='component'>
                    <Router>
                        <Route exact path='/'>
                            {content}
                        </Route>
                        <Route path="/product-information/:name/:id" component={ViewProductInformation}>
                        </Route>
                    </Router>
                    </div>
                    <Footer>
                    HIHHI
                    </Footer>
                    <ModalCustom isOpen={ this.state.open } callClosePopup={ this.closePopup }></ModalCustom>
                </div>
    }

}
export default Index;