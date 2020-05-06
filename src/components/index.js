import React, { Component } from 'react';
import './css/index.css';
import logo from './images/images.png';
import ViewSample from './view-sample';
import News from './news';
import imgNew from './images/macbookpro.jpg';

import dell from './images/dell.jpg';
import acer from './images/acer.jpg';

import config from './config/config'

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

const Footer = () =>{
    return <div>

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
            imageActivate: 1
        };
        setInterval(()=>{
            let count = this.state.imageActivate;
            if(count === 1){
                this.setState({imageActivate: 2});
            }else if(count === 2){
                this.setState({imageActivate: 3});
            }else if(count === 3){
                this.setState({imageActivate: 1});
            }
            this.setDotActivate(count);
        }, 3000);

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

    deleteRow(id){
        console.log(id);
    }

    componentDidMount(){
        fetch(`${ config.BASE_URL }/api/v1/categories`).then(res => res.json()).then((result) => {
            this.setState({categories: result.data.categories})
            })

        fetch(`${ config.BASE_URL }/api/v1/products`).then(res => res.json()).then((result) => {
            console.log(result)
            this.setState({products : result.data.products})
        })
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

    render(){
        let img = imgNew;
        let componentListProduct;
        if(this.state.products != null){
            componentListProduct = this.state.products.map((product) =>
            <ViewSample name={product.productName} discount={product.price} price={product.price - ((product.discountPercent / 100) * product.price)} discountPercent={product.discountPercent +'%'}></ViewSample>
            )
        }
    
        var listCategoriesComponent;
        if(this.state.categories != null) {
            listCategoriesComponent = this.state.categories.map((cate) => <Item itemName={cate.categoryName}/>)
        }
        return <div>

            <form name='formFile' method='POST' enctype="multipart/form-data">
                <input type="file" name='file'></input>
                <input type='text' id='categoryName'></input>
                <input type="button" id="Submit" id="submit" onClick={this.onSubmit} />
            </form>
                    <Header/>
                    <div className='component'>
                        <div className='content'>
                            <div className='left'>
                                {listCategoriesComponent}
                            </div>
                            <div className='right'>
                                <div className={this.state.news.img1}>
                                    <News image={img}></News>
                                </div>

                                <div className={this.state.news.img2}>
                                    {/* <News image={dell}></News> */}
                                    <News image='‪C:\Users\HuyHoang\Downloads\123.jpg'></News>
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

                    </div>
                </div>
    }

}
export default Index;