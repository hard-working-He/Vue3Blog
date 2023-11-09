import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
//import 'moment/locale/zh-cn'
//import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { http } from '../../utils'
import { Table, Tag, Space,Popconfirm} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useState } from 'react'
import { history } from '../../utils'


const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    setParams({
      page: 1,
      per_page:5
    })
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: cover => {
        return <img src={cover } width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>history.push(`/home/publish?id=${data.id}`)} />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
            </Popconfirm>
            
          </Space>
        )
      }
    }
  ]

  const data = [
      {
          id: '8218',
          comment_count: 0,
          cover: {
            images:['http://geek.itheima.net/resources/images/15.jpg'],
          },
          like_count: 0,
          pubdate: '2019-03-11 09:00:00',
          read_count: 2,
          status: 2,
          title: 'wkwebview离线化加载h5资源解决方案' 
      }
  ]
  const [channels, setChannels] = useState([])
  useEffect(
    () => {
      async function fetchChannels () {
        const res = await http.get('./channels')
       
        setChannels(res.data.data.channels)
      }
      fetchChannels()
    },[])

  
  
  //4.4
  // 文章列表数据管理
  const [article, setArticleList] = useState(
    {
      list: [],
      count:0
   }
  )

  // 参数管理
  const [params, setParams] = useState(
    {
      page: 1,
      per_page:10
    }
  )
  useEffect(() => {
    async function fetchArticleList () {
      const res = await http.get('/mp/articles', { params })
      console.log(res)
      const { results, total_count } = res.data.data
      setArticleList({
        list: results,
        count:total_count
      })
    }
    fetchArticleList()
  }, [params])
  const onSearch = values => {
    try {
       const { status, channel_id, date } = values
    const _params = {}
    if (status) {
       _params.status = status
     }
    
    if (channel_id) {
      _params.channel_id = channel_id
    }
    /* if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = data[1].format('YYYY-MM-DD')
    } */
    setParams({
      ...params,
      ..._params
    })
    console.log(4.5)
    console.log(values)
    }catch{console.log('onSearch is wrong')}
   
  }

  const pageChange = page => {
    setParams({
     
      page,
      per_page:5
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: 1 }}
          onFinish={onSearch} >
          
        <Form.Item label="频道" name="channel_id" >
          <Select placeholder="请选择文章频道" style={{ width: 200 }} >
          {channels.map(item => (
            <Option key={item.id} value={item.id}>
            {item.name}
            </Option>
          ))}
          </Select>
          </Form.Item>
          
           <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

           <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>

        </Form>
      </Card>
      
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table
      dataSource={article.list}
      columns={columns}
      pagination={{
        position: ['bottomCenter'],
        current: params.page,
        pageSize: 5,
        onChange: pageChange
      }}
    />
      </Card>
      
    </div>
  )
}

export default Article