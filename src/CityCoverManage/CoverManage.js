import { Component } from 'react';
import { Table,Upload, Icon, Modal,Button,Popconfirm}  from 'antd'
import React from  'react';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import {connect} from "react-redux";
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import './CoverManage.css'
import Pictures from './CoverPicture'
import EditModalForm from "./EditModal";
import {initCovers,addCover,deleteCover} from '../reducer/CoverReducer'
let dragingIndex = -1;

const coverData =  [
    {
        key: '1',
        country: '美国',
        city: '圣弗朗西斯科',
        title:'狂野西部',
        image: 'https://t2.hddhhn.com/uploads/tu/201703/9999/486e741a94.jpg',
    },
    {
        key: '2',
        country: '法国',
        city: '巴黎',
        title:'浪漫之都',
        image: 'http://pic1.win4000.com/wallpaper/2018-03-15/5aaa1fd648505.jpg',
    },
    {
        key: '3',
        country: '中国',
        city: '香港',
        title:'中西结合的国际大都市',
        image: 'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg',
    }
];
const rowSource = {
    beginDrag(props) {
        dragingIndex = props.index;
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

class BodyRow extends Component {
    render() {
        const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let className = restProps.className;
        if (isOver) {
            if (restProps.index > dragingIndex) {
                className += ' drop-over-downward';
            }
            if (restProps.index < dragingIndex) {
                className += ' drop-over-upward';
            }
        }
        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />),
        );
    }
}

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(
    DragSource('row', rowSource, connect => ({
        connectDragSource: connect.dragSource(),
    }))(BodyRow),
);


class DragSortingTable extends Component {
    columns = [
        {
            title: '国家',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: '城市',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },

        {
            title: '封面图片',
            dataIndex: 'image',
            key: 'image',
            render:(img)=>(<Pictures className="CoverPic" url={img}/>)
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) =>
                this.state.data.length >= 1 ? (
                    <span>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                        <a href="javascript:;" onClick={() =>this.handleEdit(record)} style={{ marginLeft: 10 }}>修改</a>
                    </span>
                ) : null,
        }
    ];
    state = {
        data: coverData,
        editModalVisible:false,
        editRecord:null
    };
    components = {
        body: {
            row: DragableBodyRow,
        },
    };

    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    };
    handleDelete = key => {
        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.key !== key) });
    };
    handleAdd = () => {
        console.log("handle add");
        const dataSource = this.state.data;
        const count = this.state.data.length;
        //${count}
        const newData =  {
            key: count+1,
            country: '中国',
            city: '香港',
            title:'中西结合的国际大都市',
            image: 'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg',
        };
        this.setState({
            data: [...dataSource, newData],
        });
    };
    handleEdit= (record)=>{
        this.setState({editModalVisible:true,editRecord:record})
    }
    handleEditResult = () => {
        console.log(this.formRef.props.form);
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            const dataSource = this.state.data;
            const newData =  {
                key:this.state.editRecord.key ,
                country: values.country,
                city: values.city,
                title:values.title,
                image:this.state.editRecord.image,
            };
            for(let i = 0, len = dataSource.length; i < len; i++){
                if(dataSource[i].key == this.state.editRecord.key){
                    dataSource[i] = newData;
                    break;
                }
            }
            this.setState({
                data:dataSource,
                editModalVisible:false,
                editRecord:null });
            form.resetFields();
        });

    };
    handleCancel = () => {
        console.log("login cancel")
        this.setState({ editModalVisible:false,editRecord:null});
    };
    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    convertRecordToField(record){
        if(record!=null) {
            let field = {
                country: {
                    value: record.country,
                },
                city: {
                    value: record.city,
                },
                title: {
                    value: record.title,
                }
            };
            console.log(field);
            return field;
        }
    }
    render() {
        return (
            <div className="contain-div">
                <span>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加新的封面
                    </Button>
                    <Button  type="primary" style={{ float:"right"}}>
                    保存改变
                    </Button>
                </span>
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                components={this.components}
                onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow,
                })}
            />
            <EditModalForm
                {...this.state.editRecord}
                wrappedComponentRef={this.saveFormRef}
                onCancel={this.handleCancel}
                onConform={this.handleEditResult}
                visible = {this.state.editModalVisible}
                record = {this.state.editRecord}
            />
            </div>
        );
    }
}

let coverTable = DragDropContext(HTML5Backend)(DragSortingTable);
const mapStateToProps=(state)=>{
    console.log("cover manage page mapStateToProps");
    console.log(state);
    return state.coverState;
}
const mapDispatchToProps = {initCovers,addCover,deleteCover};
const CoverTable = connect(mapStateToProps,mapDispatchToProps)(coverTable);
export default CoverTable;