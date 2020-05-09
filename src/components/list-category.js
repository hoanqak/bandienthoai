import React from 'react';
import config from './config/config'
import './css/list-category.css';


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


class ListCategory extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: null
        }
    }

    componentDidMount(){
        fetch(`${ config.BASE_URL }/api/v1/categories`).then(res => res.json()).then((result) => {
            try{
                this.setState({categories: result.data.categories})
            }catch(e){
                console.log(e)
            }
        })
    }

    render(){
        let listCategoriesComponent;
        let { categories } = this.state;
        if(categories != null) {
            listCategoriesComponent = categories.map((cate, key) => <Item itemName={cate.categoryName} key={key}/>)
        }

    return <div>{ listCategoriesComponent }</div>
    }

}
export default ListCategory;