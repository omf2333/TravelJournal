import { Component } from 'react';
import { Table, Input, Button, Icon,Divider,Popconfirm}  from 'antd';
import React from  'react';
import Highlighter from 'react-highlight-words';
import ArticleCreateForm from "../ArticleManage/ArticleManage";

const JOURNAL = 2;
const JOURNALT = 3;
const data = [
    {
        key: '1',
        country: '美国',
        city: '圣弗朗西斯科',
        date:'2018-9-20',
        title:'狂野西部',
        summary:'美国加利福尼亚州太平洋沿岸的港口城市，是世界著名旅游胜地、加州人口第四大城市。旧金山临近世界著名',
        image: 'https://t2.hddhhn.com/uploads/tu/201703/9999/486e741a94.jpg',
    },
    {
        key: '2',
        country: '法国',
        city: '巴黎',
        date:'2016-1-20',
        title:'浪漫之都',
        summary:'巴黎是法国的首都及最大都市，同时是法兰西岛大区首府，为法国的政治与文化中心，隶属法兰西岛大区之下的巴黎省',
        image: 'http://pic1.win4000.com/wallpaper/2018-03-15/5aaa1fd648505.jpg',
    },
    {
        key: '3',
        country: '中国',
        city: '香港',
        date:'2019-5-20',
        title:'中西结合的国际大都市',
        summary:'香港全境由香港岛、九龙和新界组成，其中香港岛北最为发达；地理环境上则由九龙半岛等大陆土地、以及263个岛屿构成[5]，人口约741万人（2017年底）',
        image: 'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg',
    }
];

class ArticleTable extends Component {
    state = {
        searchText: '',
        data:data,
        type:JOURNALT,
        record:null
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });
    handleDelete = key => {
        console.log("handle delete",this.state.data)

        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.key !== key) });
    };
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    handleAdd () {
        console.log("handle add");
    };
    handleEdit(record){
        console.log("handle record",record);
        this.setState({type:JOURNAL,record:record});
    }


    render() {
        const columns = [
            {
                title: '国家',
                dataIndex: 'country',
                key: 'country',
                filters: [
                    {
                        text: '中国',
                        value: '中国',
                    },
                    {
                        text: '法国',
                        value: '法国',
                    },
                    {
                        text: '美国',
                        value: '美国',
                    },
                ],
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                onFilter: (value, record) => record.country.indexOf(value) === 0,
            },
            {
                title: '城市',
                dataIndex: 'city',
                key: 'city',
                ...this.getColumnSearchProps('city'),
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                defaultSortOrder: 'descend',
                sorter: (a, b) => {
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date);
                    return dateA - dateB;
                },
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title'),
            },
            {
                title: '简介',
                dataIndex: 'summary',
                key: 'summary',
                width: '50%',
                ...this.getColumnSearchProps('summary'),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    this.state.data.length >= 1 ?(
                        <span>
                            <a href="javascript:;" onClick={()=>this.handleEdit(record)}>修改</a>
                                <Divider type="vertical" />
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </span>
                    ) : null)
            }
        ];
        if(this.state.type == JOURNALT) {
            return (
                <div className="contain-div">
                 <span>
                    <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
                    添加新的游记
                    </Button>
                </span>
                    <Table columns={columns} dataSource={this.state.data} bordered={true}/>
                </div>);
        }else{
            return(<ArticleCreateForm record={this.state.record}/>);
        }

    }
}

export default ArticleTable;

