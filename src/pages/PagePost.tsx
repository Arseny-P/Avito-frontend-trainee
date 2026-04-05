import { useNavigate, useParams } from 'react-router'
import { useGetSinglePost } from '../services/hooks/useSinglePost';
import { Button, Divider, Flex, Layout, Result, Skeleton, Spin, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { EditOutlined, LoadingOutlined, PictureOutlined } from '@ant-design/icons';
import ItemSpecs from '../modules/UI/ItemSpecs/ItemSpecs';
import MissingSpecsCard from '../modules/UI/MissingSpecsCard/MissingSpecsCard';
import { useAppSelector } from '../store';
import { ItemSpecsSLice } from '../modules/UI/ItemSpecs/ItemSpecs.slice';
import { useAppColors } from '../services/hooks/useAppColors';

const PagePost = () => {
  const missingSpecs = useAppSelector((state) => ItemSpecsSLice.selectors.getMissingSpecsName(state));
  const {bgPlaceholder} = useAppColors();
  const createDate = (date: string) => {
     return new Date( Date.parse(date) ).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });;
  }

  const navigate = useNavigate();
  const { id } = useParams();
  const {data, isLoading, isError } = useGetSinglePost(id!);
  if(isError){
    return (
        <Result
            title="Что-то пошло не так"
            extra={
                <Button type="primary" onClick={() => navigate("/ads")}>
                    Вернуться назад
                </Button>
            }
        />
    )
  }
  
  return (
   <>
    <Layout style={{ minHeight: '100vh', padding: 32, background: "none"}}>
        <Header style={{margin: 0, padding: 0, background: "none", height: "auto"}}>
            <Flex vertical align='start' style={{background: "none"}}>
                <Button type="link" onClick={() => navigate("/ads")}>← Назад</Button>
                <Flex style={{width: "100%"}} justify="space-between">
                    {isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Skeleton.Input active style={{ width: 300, height: 40, display: 'block' }} />
                            <Skeleton.Button active style={{ width: 150, height: 32, display: 'block' }} />
                        </div>
                    ) : (
                        <Flex vertical gap={12}>
                            <Typography.Title level={2} style={{margin: 0}}>{data?.title}</Typography.Title>
                            <Button onClick={() => navigate(`/ads/${id}/edit`)} type="primary" icon={<EditOutlined />} iconPlacement="end" style={{width: "fit-content"}}>Редактировать</Button>
                        </Flex>
                    )}
                    {isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                            <Skeleton.Input active style={{ width: 120, height: 40, display: 'block' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                                <Skeleton.Input active size="small" style={{ width: 180, height: 16, display: 'block' }} />
                                <Skeleton.Input active size="small" style={{ width: 200, height: 16, display: 'block' }} />
                            </div>
                        </div>
                    ) : (
                        <Flex vertical gap={12} align="end">
                            <Typography.Title level={2} style={{margin: 0}}>{data?.price} ₽</Typography.Title>
                            <Flex vertical align="end">
                                <Typography.Text style={{color: "#848388", display: "block"}}>Опубликовано: {createDate(data?.createdAt!)}</Typography.Text>
                                <Typography.Text style={{color: "#848388", display: "block"}}>Отредактировано: {createDate(data?.updatedAt!)}</Typography.Text>
                            </Flex>
                        </Flex>
                )}
                </Flex>
            </Flex>
            <Divider style={{margin: 32}}/>
        </Header>
        <Content>
            {isLoading ? (
                <Spin style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            ) : (
                <Flex vertical gap={32}>
                    <Flex gap={32}>
                        <div style={{   
                            width: 480, 
                            aspectRatio: '4 / 3',
                            backgroundColor: bgPlaceholder, 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            flexShrink: 0
                        }}>
                            <PictureOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />
                        </div>
                        <Flex vertical gap={36}>
                            {data?.needsRevision && (
                              <MissingSpecsCard missingSpecs={missingSpecs} />
                            )}
                            <Flex vertical>
                                <Typography.Title level={3} style={{marginBottom: 16}}>Характеристики</Typography.Title>
                                <ItemSpecs category={data?.category!} params={data?.params!} />
                            </Flex>
                        </Flex>
                    </Flex> 
                    <Flex vertical gap={16}>
                        <Typography.Title level={3} style={{margin: 0}}>Описание</Typography.Title>
                        {data?.description ? (
                            <Typography.Text>{data?.description}</Typography.Text>
                        ) : (
                            <Typography.Text style={{color: "#848388"}}>Отсутствует</Typography.Text>
                        )}
                    </Flex>
                </Flex>
            )} 
        </Content>
    </Layout>
   </> 
  )
}

export default PagePost