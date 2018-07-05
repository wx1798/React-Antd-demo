import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './home.css'
import { Carousel,Row, Col,Button, Spin   } from 'antd';

import StoreComponent from './storeComponent'
import { WSAENETUNREACH } from 'constants';

export default class TabbleAll extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            bannerArr : [],
            shopArr: [],
            content: ''
        }
    }
      
    render () {
        return (
            <div className="homeSty">   
                <Carousel autoplay>
                    {
                        this.state.bannerArr.map((item,index) => {
                            return  <div key={index}>
                                        <img style={{width:'100%',height:'300px'}} src = {item.Picture} alt=""/>
                                    </div>
                        })
                    }
                </Carousel>
                <div style={{lineHeight:5}}>
                    <Spin />&nbsp;&nbsp;&nbsp; <Spin />&nbsp;&nbsp;&nbsp; <Spin /> 
                    不是正在加载...
                </div>
                {/* 商品列表 */}
                <div className = "shopList">
                    {
                        this.state.shopArr.map((item,index) => {
                            return  <StoreComponent
                                        storeArr = {this.state.shopArr}
                                        callback = {(id) => {
                                            document.location.hash = "#/shop_home_detail?id="+id
                                        }}
                                    />
                        })
                    }
                </div> 
            </div>
        )
    }
    // 详情方法
    getDetail (id) {
        let params = {
            "ID": id,
            "SeckillPointPrice": 0
          }
        window.Axios.post(window.ApiName.ApiGetPrdouctByID,params).then( res => {
            this.setState({
               content: res.Data,
            })
            console.log(res)
        }).catch( err => {
            console.log(`${err}`)
        })
    }

    // 测试请求123
    componentDidMount () {
        window.Axios.get(window.ApiName.ApiGetHomePage,'').then( res => {
            this.setState({
               bannerArr : res.Data.BannerList,
               shopArr:res.Data.HotList
            })
            console.log(res)
        }).catch( err => {
            console.log(`${err}`)
        })
    }

}