import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';

const Login = () => {
  const navigate = useNavigate()
  const {loginStore}=useStore()
  const onFinish =async (values) => {
    console.log('Success:', values);
    const { mobile, code } = values
    try {
      await loginStore.login({ mobile, code })
      navigate('/')
    }catch(e) {
      console.log(e.respponse?.data?.message||'login failed')
    }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


  
  return (
    <div className='loginDiv'>
      login
      <Form
        initialValues={{
    mobile: '13888888888',
    code: '246810',
    remember: true
  }}
   
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="mobile"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
        </Form.Item>
        <Form.Item
      label="Password"
      name="code"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}
export default Login
