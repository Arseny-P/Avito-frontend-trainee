import { Empty, Flex, Input, Layout, Pagination, Result, Segmented, Select, Skeleton, Spin, Typography, type GetProps, type PaginationProps } from "antd";
import { useGetPosts } from "../services/hooks/useGetPosts"
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import AppMenu from "../modules/UI/Menu/AppMenu";
import PostsList from "../modules/UI/PostsList/PostsList";
import type { FilterType } from "../services/types/FilterType.type";
import { useAppDispatch, useAppSelector } from "../store";
import { AppstoreOutlined, BarsOutlined, LoadingOutlined } from "@ant-design/icons";
import type { AxiosError } from "axios";
import { PostListSlice } from "../modules/UI/PostsList/PostList.slice";
import { shallowEqual } from "react-redux";
import { useAppColors } from "../services/hooks/useAppColors";

const PagePostsList = () => {
  const { 
  categories, 
  needsRevision, 
  searchValue, 
  page, 
  sortColumn, 
  sortDirection, 
  vision 
} = useAppSelector((state) => ({
  categories: PostListSlice.selectors.getCategories(state),
  needsRevision: PostListSlice.selectors.getNeedsRevision(state),
  searchValue: PostListSlice.selectors.getSearch(state),
  page: PostListSlice.selectors.getpage(state),
  sortColumn: PostListSlice.selectors.getSortColumn(state),
  sortDirection: PostListSlice.selectors.getSortDirection(state),
  vision: PostListSlice.selectors.getVision(state),
}), shallowEqual);

  const {neutral, bg} = useAppColors();
  const dispatch = useAppDispatch();

  let params: FilterType = {
    q: searchValue,
    skip: ((page === 0 ? 1 : page) - 1) * 10,
    limit: 10,
    categories: categories,
    needsRevision: needsRevision,
    sortColumn: sortColumn,
    sortDirection: sortDirection,
  }

  type SearchProps = GetProps<typeof Input.Search>;
  const onSearch: SearchProps['onSearch'] = (value) => {
    dispatch(PostListSlice.actions.setSearch(value));
  }
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    dispatch(PostListSlice.actions.setPage(pageNumber));
  };

  const onSelectSort = (value: string) => {
    const parts = value.split('_');
    const column = parts[0] as 'title' | 'createdAt' | 'price';
    const direction = parts[1] as 'asc' | 'desc';

    dispatch(PostListSlice.actions.setSortColumn(column));
    dispatch(PostListSlice.actions.setSortDirection(direction));
  }

  const onSetVision = (value: "table" | "list") => {
    dispatch(PostListSlice.actions.setVision(value));
  }

  const {data: posts, isLoading, isError, error} = useGetPosts(params);
  const axiosError = error as AxiosError<{ message: string }>;
  return (
    <>
      <Layout style={{ minHeight: '100vh', background: neutral, padding: '12px 32px'}}>
        <Header  style={{
          display: 'flex',
          gap: 16,
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: "100%",
          background: neutral, 
          padding: '0 24px',
        }}>
          
          <Flex style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
          >
            <Typography.Title level={2} style={{margin: 0}}>Мои объявления</Typography.Title>
            {isLoading ?(
              <Skeleton.Input active size="small" />
            ) : (
              <Typography.Title level={4} style={{margin: 0, fontWeight: 400, color: "#848388"}}>{
                posts?.total 
                ? posts?.total + ' ' + (posts?.total === 1 ? 'объявление' : 'объявления')
                : "Нет объявлений"
              }</Typography.Title>
            )}
          </Flex>
          <Flex style={{
            alignItems: 'center',
            padding: "12px",
            borderRadius: "8px",
            width: "100%",
            gap: 24,
            backgroundColor: bg
          }}>
            <Input.Search placeholder="Найти объявление..." variant="filled" onSearch={onSearch}/>
            <Flex style={{alignItems: 'center', gap: 16}}>
              <Segmented onChange={onSetVision} style={{backgroundColor: neutral}} defaultValue={vision}
                options={[
                  { value: 'table', icon: <AppstoreOutlined /> },
                  { value: 'list', icon: <BarsOutlined /> },
                ]}
              />
              <Select
                defaultValue="createdAt_asc"
                onChange={onSelectSort}
                options={[
                  { value: 'createdAt_asc', label: 'По новизне (сначала новые)' },
                  { value: 'createdAt_desc', label: 'По новизне (сначала старые)' },
                  { value: 'title_desc', label: 'По названию (Я → А)' },
                  { value: 'title_asc', label: 'По названию (А → Я)' },
                  { value: 'price_asc', label: 'По возрастанию цены' },
                  { value: 'price_desc', label: 'По убыванию цены' },
                ]}
              />
            </Flex>
          </Flex>
        </Header>

        <Layout style={{padding: '12px 32px', backgroundColor: neutral}}>
          <Sider 
            width={250} 
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: neutral,
            }} 
          >
            <AppMenu />
          </Sider>

          <Content style={{
            paddingLeft: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 10}}>
            {
              isLoading && <Spin style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            }
            {
              isError && <Result title={axiosError.response?.status.toString()}  subTitle="Sorry, something went wrong."/>
              
            }
            {
              posts?.total === 0 ? (
               <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
                  <Typography.Text> Нет объявлений </Typography.Text>
                }/>
              ) : (posts?.items &&  
              <>
                <PostsList posts={posts?.items}/>
                <Pagination total={posts?.total} defaultCurrent={1} current={page} pageSize={10} onChange={onChange}/>
              </>
            )}            
          </Content>
        </Layout>
      </Layout>
      
      
    </>
  )
}

export default PagePostsList