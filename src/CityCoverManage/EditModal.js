import { Component } from 'react';
import React from  'react';
import { Modal, Form, Input} from 'antd/lib/index'
class EditModal extends Component {
    render() {
        const { visible, onCancel,record,form,onConform} = this.props;
        console.log(record)
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="修改封面信息"
                okText="确认"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onConform}
            >
                <Form layout="vertical">
                    <Form.Item label="Country">
                        {getFieldDecorator('country', {
                            initialValue:record!=null?record.country:'',
                            rules: [{ required: true, message: '请输入国家名！' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="City">
                        {getFieldDecorator('city',{
                            initialValue:record!=null?record.city:'',
                            rules: [{ required: true, message: '请输入城市名！' }]
                            })(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="Title">
                        {getFieldDecorator('title',{
                            initialValue:record!=null?record.title:'',
                            rules: [{ required: true, message: '请输入标题名称！' }]
                        })(<Input type="textarea" />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const EditModalForm = Form.create({ name: 'form_in_modal' })(EditModal);
export default EditModalForm;