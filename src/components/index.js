import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './css/index.css';
import logo from './images/images.png';
// import ViewSample from './view-sample';
// import News from './news';
// import imgNew from './images/macbookpro.jpg';

// import dell from './images/dell.jpg';
// import acer from './images/acer.jpg';

import config from './config/config'
import Paging from './paging';

import ModalCustom from './modal-custom';
// import contains from './config/contains';
import ViewProductInformation from './view-product-information';

import AdminIndex from './admin/admin-index';
import ListProduct from './list-product';
import ListCategory from './list-category';


const Header = (props) =>{
    return <div className='header'>
        <img className='img-logo' src={logo}/>
        <div className='search'>
            <div className='box-search'>
                <input type='text' id='searchName' placeholder='Search'></input>
                <i className="fa fa-search icon" onClick={ props.onClick }></i>
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
            // img: imgNew,
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
            searchName: ''
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

    searchName = () =>{
        let contentSearch = document.getElementById('searchName').value;
        this.setState({searchName: contentSearch});
    }

    activate(){
        return 'dot activate';
    }

    noActivate(){
        return 'dot';
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

    callbackFunction = async (page) => {
        this.setPage(page);
    }

    setPage = (page) =>{
        this.setState({ page: page})
    }

    sendTotalPage = (totalPage) => {
        this.setState({totalPage: totalPage })
    }

    render(){
        let content;
            // let img = imgNew;
            console.log(this.state.searchName);
            content = <div>
                        <div className='content'>
                            <div className='left'>
                                <ListCategory/>
                            </div>
                            <div className='right'>
                                {/* <div className={this.state.news.img1}>
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
                                </div> */}
                            </div>
                        </div>
                        <div className='list-item'>
                            <ListProduct sendTotalPage={ this.sendTotalPage } page={this.state.page} searchName={ this.state.searchName }></ListProduct>
                        </div>
                        <Paging totalPage={this.state.totalPage} parentCallback={this.callbackFunction} pageActivate={this.state.page}></Paging>
                    </div>
        return  <div>
                    <Header onClick={ () =>this.searchName() }/>
                    <div className='component'>
                    <Router>
                        <Route exact path='/'>
                            {content}
                        </Route>
                        <Route path="/product-information/:name/:id" component={ViewProductInformation}>
                        </Route>
                        <Route path='/admin' component={AdminIndex}></Route>
                    </Router>
                    </div>
                    <Footer/>
                    <ModalCustom isOpen={ this.state.open } callClosePopup={ this.closePopup }></ModalCustom>
                </div>
    }

}
export default Index;