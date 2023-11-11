import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState,useEffect} from 'react'
import { http } from '../../utils'
import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

const { Option } = Select

const Publish = () => {
  const [channels, setChannels] = useState([])
  useEffect(
    () => {
      async function fetchChannels () {
        const res = await http.get('/channels')
        setChannels(res.data.data.channels)
        console.log(channels)
      }
      fetchChannels()
    },[])
  const [fileList, setFileList] = useState([])

  const fileListRef=useRef([])
  const onUploadChange = ({ fileList }) => {
    console.log(fileList)
      setFileList(fileList)
     fileListRef.current = fileList
    
    /* const fileList = info.fileList.map(file => {
      if (file.response) { return { url: file.response.data.url } }
      return file
    }) */
   

  }
  

  const [imgCount, setImgCount] = useState(1)
  const [maxCount,setMaxCount]=useState(1)
  const changeType = e => {
    const count = e.target.value
    setImgCount(count)
    console.log(count)
    setMaxCount(count)

    if (count === 1) {
      const firstImg = fileListRef.current[0]
      setFileList(firstImg ? [firstImg] : [])
    }
    else if (count === 3) {
      setFileList(fileListRef.current)
      }
    }
  
  const onFinish = async (values) => {
    console.log(values)
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      cover: {
        type: 1,
        images:fileList.map(item=>item.response.data.url)
      },
      type,
      title
    }
    await http.post('/mp/articles?draft=false', params)
   
    
    
    
  }

   const [params] = useSearchParams()
  const articleId = params.get('id')

  const form=useRef(null)
  useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
      console.log(res)
      const { cover, ...formValue } = res.data.data
      console.log(formValue)
      console.log(form.current)
      form.current.setFieldsValue({...formValue, type:cover.type})
      
    }
    if (articleId) {
      getArticle()
     
    }
    
    },[articleId])


  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{ articleId? '修改文章' :'发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: 'fdfdf' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 200 }}>
              
              {
                channels.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>)
                  
                )
              }
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {maxCount>0&& (<Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action="http://geek.itheima.net/v1_0/upload"
              fileList={fileList}
              onChange={onUploadChange}
              maxCount={maxCount}
              multiple={maxCount>1}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>)}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className='publish-quill'
              theme="snow"
              placeholder='please input the content'
            >


            </ReactQuill>

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                { articleId? '修改文章' :'发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish