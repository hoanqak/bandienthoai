import React from "react";
import './css/paging.css';

class Paging extends React.Component{

    nextPage = (page) =>{
        console.log(page)
        this.props.parentCallback(page)
    }

    render(){
        let arrPage = new Array();
        for(let page= 1; page <= this.props.totalPage; page ++){
            arrPage.push(page)
        }

        let { pageActivate } = this.props;

        const componentPage = arrPage.map((page, key) => 
        page === pageActivate ? <span className='item-page page-activate' key={key} onClick={() => this.nextPage(page)}>{page}</span> 
        : <span className='item-page' key={key} onClick={() => this.nextPage(page)}>{page}</span>)

        return <div className='list-paging'>
                {componentPage}
        </div> 
    }

}
export default Paging;