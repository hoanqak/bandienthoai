import React from 'react';
import ViewSample from './view-sample';
import config from './config/config'


class ListProduct extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products: null,
            totalPage: 0
        }
    }

    loadDataProduct = () =>{
        fetch(`${ config.BASE_URL }/api/v1/products?page=${ this.props.page }`).then(res => res.json()).then((result) => {
            if(result != null && result.data != null) 
            {
                this.setState({products : result.data.products, totalPage: result.data.totalPage})
                this.props.sendTotalPage( result.data.totalPage)
            }
        })
    }

    componentDidMount(){
        this.loadDataProduct();
    }

    componentDidUpdate(prevProps){
        console.log("UPdate")
        if(prevProps.page != this.props.page){
            this.loadDataProduct();
        }
    }
    render(){
        console.log(this.props.page)
        let componentListProduct;
            // console.log(this.state.products)
            if(this.state.products != null){
                componentListProduct = this.state.products.map((product, key) =>
                <ViewSample  name={product.productName} productID={product.id} discount={product.price} key={key}
                 priceAfterDiscount={ product.priceAfterDiscount } price={ product.price }
                  discountPercent={product.discountPercent +'%'}></ViewSample>
            )}
        
        return <div>{componentListProduct}</div>
    }

}

export default ListProduct;