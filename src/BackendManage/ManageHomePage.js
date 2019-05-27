import { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon}  from 'antd'
import React from  'react';
import './ManageHomePage.css'
import CoverManage from '../CityCoverManage/CoverManage'
import ArticleCreateForm from '../ArticleManage/ArticleManage'
import ArticleTable from "../ArticleTable/ArticleTable";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const COVER = 1;
const JOURNAL = 2;
const JOURNALT = 3;
const PHOTOWALL = 4;
class RightContent extends Component{
    render() {
        switch (this.props.type) {
            case COVER:
                return(
                    <div>
                        <CoverManage/>
                    </div>
                );
            case JOURNAL:
                return (
                    <div>
                        <ArticleCreateForm/>
                    </div>
                );
            case JOURNALT:
                return(<div>
                    <ArticleTable/>
                    </div>);
            case PHOTOWALL:
                return (null);
        }
    }
}
class ManageHomePage extends Component {
    state = {
        collapsed: false,
        type:COVER
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    changePage(type){
        console.log(type)
        switch (type) {
            case "1":
                if(this.state.type == COVER){
                    break;
                }else{
                    this.setState({type:COVER});
                }
                break;
            case "2":
                if(this.state.type == JOURNAL){
                    break;
                }else{
                    this.setState({type:JOURNAL});
                }
                break;
            case "3":
                if(this.state.type == JOURNALT){
                    break;
                }else{
                    this.setState({type:JOURNALT});
                }
                break;
        }
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                >
                    <div className="logo" >
                        <img className="user_avatar"
                             src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'/>
                        <span className="user_name">白云苍狗</span>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" onClick={()=>this.changePage("1")}>
                            <Icon type="pie-chart" />
                            <span>城市封面</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                  <Icon type="user" />
                                  <span>旅游日记</span>
                                </span>
                            }>
                            <Menu.Item key="2" onClick={()=>this.changePage("3")}>游记目录</Menu.Item>
                            <Menu.Item key="3" onClick={()=>this.changePage("2")}>新建游记</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>照片墙</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <RightContent type={this.state.type}/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default ManageHomePage;