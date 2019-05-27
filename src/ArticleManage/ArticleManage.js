import React from 'react';
import { Component } from 'react';
import { Input, Select,  Button, Card,Form,Upload,DatePicker,Icon,Modal}  from 'antd';
import moment from 'moment';
import BraftEditor from 'braft-editor'
import LzEditor from 'react-lz-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './ArticleManage.css'
import ArticleDisplay from "./ArticleDisplay";
const { TextArea } = Input;
const EDIT = 0;
const SHOW =1;
class ArticleManageList extends Component{
    state = {
        type:EDIT,
        htmlContent: '<h3>请输入</h3>',
        content:'',
        fileList: [],
        preBannerVisible: false,
        previewImage: '',
        fileList1: [],
        upImgUrl:'',
        editorState: BraftEditor.createEditorState(null),
        unit:''
    };
    receiveHtml=(content)=> {
        console.log("recieved HTML content", content);
        this.setState({
            fileList:[],
            content:content
        });
    }
    showArticle(){
        console.log(this.state)
        if(this.state.editorState!=null) {
            console.log("showArticle");
            this.setState({type: SHOW});
        }
    }
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        //const result = await saveEditorContent(htmlContent)
    }
    handleSubmit = e => {
        console.log("handle submit");
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            values.content = this.state.content;
            values.image = this.state.upImgUrl;
            if (!err) {
                let json = {"country":values.country,"city":values.city,"date":values.date._i,
                    "title":values.title,"summary":values.summary,"content":values.content,"image":values.image}
                console.log(json);
            }
        });
    };
    handleSuccess = (e) => { //banner图的成功回调函数 返回的不是全路径，我需要自己拼接
        console.log(e);
        console.log("handleSuccess");
        let arr = [{
            uid: '-1',
            name: 'banner.png',
            status: 'done',
            url: e,
        }]
        this.setState({
            fileList1:arr,
            upImgUrl:e
        })

    }
    remove(){
        console.log("remove");
        this.setState({fileList1: []})

    }
    handleImgCancel = () => this.setState({ preBannerVisible: false })
    uploadSuccess=(res)=>{ //文本 富文本上传图片成功的回调函数
        console.log(res)
        let arr = this.state.fileList
        let obj={
            uid: res,
            name: 'image.png',
            status: 'done',
            url: res,
        }
        arr.push(obj)
        this.setState({ fileList: [...arr] });  //注意-------------同样的代码，有的不要加...解构，有的需要，很懵逼。
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    handlePreview = (file) => { //预览方法
        console.log("handle Preview",file)
        this.setState({
            previewImage: file.url || file.thumbUrl,
            preBannerVisible: true,
        });
    }
    handleChange = ({ fileList }) => {
        console.log("handleChange")
        this.setState({ fileList1:fileList });}

        render() {
        const { record,form,onConform} = this.props;
        console.log(this.state.type)
        const { getFieldDecorator } = form;
        const { preBannerVisible, previewImage, fileList1 ,fileList} = this.state;
        const dateFormat = 'YYYY-MM-DD';
        const { editorState } = this.state.editorState;
        const upload = {
            name: 'file',
            action: "http://localhost:8080/uploadPhoto/article",
            listType: 'picture',
            headers: {
                authorization: 'authorization-text',
            },
            fileList: [...this.state.fileList],
            onSuccess:this.uploadSuccess,
            onChange: this.handleChange,
            supportServerRender:true,
            multiple: false,
            beforeUpload: this.beforeUpload,
            showUploadList: true
        };

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        if (this.state.type === EDIT) {
            return (
                <div>
                    <Card bordered={false}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label='游记封面图' extra='游记封面和城市封面是不一样的哦'{...formItemLayout}>
                                {getFieldDecorator('cover', {
                                    rules: [{required: true, message: '请输入'}],
                                    initialValue: record != null ? record.cover : '',
                                })(
                                    <Upload
                                        name='file'
                                        accept='image/*'
                                        action="http://localhost:8080/uploadPhoto/cover"
                                        fileList={fileList1}
                                        onSuccess={this.handleSuccess}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                        listType="picture-card">
                                        {fileList1.length > 0 ? null : uploadButton}
                                    </Upload>

                                )}
                            </Form.Item>
                            <Form.Item label="日期" {...formItemLayout}>
                                {getFieldDecorator('date', {
                                    rules: [{type: 'object', required: true, message: '请输入时间！'}],
                                    initialValue: record != null ? moment(record.date, dateFormat) : ''
                                })(<DatePicker/>)}
                            </Form.Item>
                            <Form.Item label='旅行国家' {...formItemLayout}>
                                {getFieldDecorator('country', {
                                    rules: [{required: true, message: '请输入'}],
                                    initialValue: record != null ? record.country : '',
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item label='旅行城市' {...formItemLayout}>
                                {getFieldDecorator('city', {
                                    rules: [{required: true, message: '请输入'}],
                                    initialValue: record != null ? record.city : '',
                                })(
                                    <Select onChange={this.selectCategory}>
                                        <Option value="1">香港</Option>
                                        <Option value="2">圣弗朗西斯科</Option>
                                        <Option value="3">巴黎</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label='游记标题' {...formItemLayout}>
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: '请输入'}],
                                    initialValue: record != null ? record.title : '',
                                })(
                                    <Input></Input>
                                )}
                            </Form.Item>
                            <Form.Item label='简介' {...formItemLayout} >
                                {getFieldDecorator('summary', {
                                    rules: [{required: true, message: '请输入'}],
                                    initialValue: record != null ? record.summary : '',
                                })(
                                    <TextArea autosize></TextArea>
                                )}
                            </Form.Item>
                            <FormItem label='正文'  {...formItemLayout}>
                                {getFieldDecorator('content', {

                                })( <LzEditor
                                    active={true}
                                    importContent={this.state.htmlContent}
                                    cbReceiver={this.receiveHtml}
                                    uploadProps={upload}
                                    video={false}
                                    audio={false}
                                    lang="ch"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{float: 'right'}}>确认发布</Button>
                            </FormItem>
                        </Form>
                        <Modal visible={preBannerVisible} footer={null} onCancel={this.handleImgCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Card>
                </div>
            )
        }else{
            return(
                <div>
                    <ArticleDisplay article={editorState}/>
                </div>
            )
        }
    }
}

//placeholder="请输入正文内容"
//value={null}
//onChange={this.handleEditorChange}
//onSave={this.submitContent}
const ArticleCreateForm = Form.create()(ArticleManageList);

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
    },
};
export default ArticleCreateForm;