import { Flex, Input, Layout, Pagination, Spin, Typography, type GetProps, type PaginationProps } from "antd";
import { useGetPosts } from "../services/hooks/useGetPosts"
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import AppMenu from "../modules/Menu/AppMenu";
import PostsList from "../modules/PostsList/PostsList";
import type { FilterType } from "../services/types/FilterType.type";
import { useAppSelector } from "../store";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";

const PagePostsList = () => {
  const categories = useAppSelector((state) => state.menu.categories);
  const needsRevision = useAppSelector((state) => state.menu.needsRevision);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState<Number>();

  let params: FilterType = {
    q: search,
    skip: ((Number(page) ?? 1) - 1) * 10,
    limit: 10,
    categories: categories,
    needsRevision: needsRevision
  }

  type SearchProps = GetProps<typeof Input.Search>;
  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearch(value);
  }
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setPage(pageNumber);
  };

  const {data: posts, isLoading} = useGetPosts();

  return (
    <>
      <Layout style={{ minHeight: '100vh', background: '#F7F5F8', padding: '12px 32px'}}>
        <Header  style={{
          display: 'flex',
          gap: 16,
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: "100%",
          background: '#F7F5F8', 
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          
          <Flex style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
          >
            <Typography.Title level={2} style={{margin: 0}}>Мои объявления</Typography.Title>
            <Typography.Title level={4} style={{margin: 0, fontWeight: 400, color: "#848388"}}>{
                posts?.total 
                ? posts?.total + ' ' + (posts?.total === 1 ? 'объявление' : 'объявления')
                : "Нет объявлений"
              }</Typography.Title>
          </Flex>
          <Flex style={{
            alignItems: 'center',
            padding: "12px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            width: "100%"
          }}>
            <Input.Search placeholder="Найти объявление..." variant="filled" onSearch={onSearch}/>
          </Flex>
        </Header>

        <Layout style={{background: '#F7F5F8', padding: '12px 32px'}}>
          <Sider 
            width={250} 
            theme="light" 
          >
            <AppMenu />
          </Sider>

          <Content style={{
            padding: 24,
            background: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            gap: 10}}>
            {
              isLoading && <Spin style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            }
            {
              posts?.items && 
              <>
                <PostsList posts={posts?.items}/>
                <Pagination total={posts?.total} pageSize={10} onChange={onChange}/>
              </>
            }
            
            
          </Content>
        </Layout>
      </Layout>
      
      
    </>
  )
}

export default PagePostsList