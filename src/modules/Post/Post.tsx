import type { PostType } from "../../services/types/Post.type"
import { Card, Flex, Tag, Typography } from 'antd';
import { PictureOutlined } from "@ant-design/icons";

const Post = ({id, category, title, price, needsRevision}: PostType) => {
  const getCategory = () => {
    switch(category) {
      case 'auto': return 'Авто';
      case 'real_estate': return 'Недвижимость';
      case 'electronics': return 'Электроника';
    }
  }

  return (
    <>
      <Card 
        style={{width: 200, borderRadius: 24, overflow: 'hidden'}}
        cover={
          
          <div style={{ 
            height: 150, 
            backgroundColor: '#FAFAFA', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative'
          }}>
            <PictureOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />
            <Tag style={{ 
              position: 'absolute',
              bottom: -12,
              left: 12,
              width: 'fit-content',
              borderRadius: 8, 
              padding: '2px 12px',
              margin: 0,
              backgroundColor: 'white',
              border: '1px solid #D9D9D9',
              zIndex: 1
            }}>{ getCategory() }</Tag>
          </div>
          } 
        styles={{ body: { padding: '16px' } }}
      >
        <Flex vertical>
          <Typography.Title level={5} style={{margin: 0}} ellipsis={{
            rows: 2,
            expandable: 'collapsible',
            expanded: true
          }}>{ title }</Typography.Title>
          <Typography.Text strong style={{color: "rgba(0, 0, 0, 0.45)"}}>{ price } ₽</Typography.Text>
          {
            needsRevision && 
            <Tag 
              color="warning" 
              style={{ 
                width: 'fit-content',
                borderRadius: 8, 
                padding: '2px 8px', 
                lineHeight: "22px",
                border: 'none',
                backgroundColor: '#fdf2e9',
                color: '#d48806',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span style={{ 
                width: 6, 
                height: 6, 
                backgroundColor: '#d48806', 
                borderRadius: '50%' 
              }} />
              Требует доработок
            </Tag>
          }
        </Flex>
      </Card>
    </>
  )
}

export default Post