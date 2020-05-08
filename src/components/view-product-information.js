import React from 'react'
import config from './config/config'
import './css/view-product-information.css'
class ViewProductInformation extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            productInformation: null,
            product: null,
            imageDisplay: 'https://binhminhphat.com/wp-content/uploads/2019/01/cach-de-su-dung-mackbook-hieu-qua-nhat-1.jpg'
        }
    }

    getInformationProduct = (productID) =>{
        fetch(`${ config.BASE_URL }${ config.BASE_URL_API_USER }/product/productInformation?productId=${ productID }`).then(res => res.json())
        .then((result) => {
            console.log(result)
            if(result != null && result.data != null)
                this.setState({
                    productInformation: result.data.productInformation,
                    product: result.data.product
                });
        })
    }

    componentDidMount(){
        console.log("DM")
        const { match: { params } } = this.props;
        console.log(params);
        this.getInformationProduct(params.id);
    }

    changeImage = (image) =>{
        this.setState({
            imageDisplay:'https://procare24h.vn/uploads/posts/rJA_roSS7/content/co-nen-cam-sac-macbook-lien-tuc-khong-3.jpg'
        })
    }

    render(){
        console.log('RD')
        let { productInformation } = this.state;
        let { product }= this.state;
        let information = null;
        if(product != null && productInformation != null){
            information = <div>
                <div className='top'>
                    <div className='box-image-information'>
                        <div className='box-image-product'>
                            <img className='product-image' src={this.state.imageDisplay}></img>
                        </div>
                        <div className='product-information-list-image'>
                        <img className='product-image-item' onMouseEnter={() => this.changeImage(1)} src='https://binhminhphat.com/wp-content/uploads/2019/01/cach-de-su-dung-mackbook-hieu-qua-nhat-1.jpg'></img>
                        <img className='product-image-item' src='https://binhminhphat.com/wp-content/uploads/2019/01/cach-de-su-dung-mackbook-hieu-qua-nhat-1.jpg'></img>
                        <img className='product-image-item' src='https://binhminhphat.com/wp-content/uploads/2019/01/cach-de-su-dung-mackbook-hieu-qua-nhat-1.jpg'></img>
                        <img className='product-image-item' src='https://binhminhphat.com/wp-content/uploads/2019/01/cach-de-su-dung-mackbook-hieu-qua-nhat-1.jpg'></img>
                        </div>
                    </div>
                    <div className='box-product-information'>
                        <div className='product-information-product-name'>{product.productName}</div>
                        <div className='product-information-price'>{ product.price }</div>
                        <div className='product-information-text-detail'>Sort desctip</div>
                        <div className='product-information-text-detail'>CPU: { productInformation.cpu }</div>
                        <div className='product-information-text-detail'>RAM: { productInformation.ram }</div>
                        <div className='product-information-text-detail'>Display: {productInformation.display}</div>
                        <div className='product-information-text-detail'>Card Graphic: { productInformation.graphic }</div>
                        <div className='product-information-text-detail'>Operation System: { productInformation.operationSystem }</div>
                        <div className='product-information-text-detail'>Storage: { productInformation.storage }</div>
                    </div>
                </div>
            </div>
        }

        const loading = <img src='https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47e02596cfcfc19c2a9ba15db5e188e627e8a88567&rid=giphy.gif'></img>

        return <div>
            {productInformation != null ? information : loading}
        </div>
    }

}

export default ViewProductInformation;