import { useNavigate, useParams } from "react-router";
import { useGetSinglePost } from "../services/hooks/useSinglePost";
import { Button, Divider, Flex, Input, notification, Result, Select, Spin, Typography } from "antd";
import type { SingleItemGetOut } from "../services/types/SinglePost.type";
import ItemSpecsInputs from "../modules/UI/ItemSpecs/ItemSpecsInputs";
import { useEffect, useState} from "react";
import { AxiosError } from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { api } from "../services/api/api";


const PageEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {data, isLoading, isError, error } = useGetSinglePost(id!);
  const axiosError = error as AxiosError<{ message: string }>;
  const [newData, setNewData] = useState<SingleItemGetOut | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [noticeApi, contextHolder] = notification.useNotification();

  const openNotification = (result: string) => {
    if(result === 'success') {
      noticeApi.success({
      title: "Изменения сохранены",
      placement: "topRight",
      duration: 2
    });
    } else {
      noticeApi.error({
      title: "Ошибка сохранения",
      description: "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
      placement: "topRight",
      duration: 3
    });
    }
    
  };
  
  useEffect(() => {
    const data = localStorage.getItem("newData");
    if (data) {
      setNewData(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    if (data && !newData) {
      setNewData(data);
    }
  }, [data]);

  useEffect(() => {
    if (!newData) return; 
    localStorage.setItem("newData", JSON.stringify(newData));
  }, [newData])

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {id, needsRevision, createdAt, updatedAt, ...toUpdate} = newData!;
      if(toUpdate.category === "auto") {
        toUpdate.params.yearOfManufacture = Number(toUpdate.params.yearOfManufacture);
        toUpdate.params.enginePower = Number(toUpdate.params.enginePower);
        toUpdate.params.mileage = Number(toUpdate.params.mileage);
      }
      if(toUpdate.category === "real_estate") {
        toUpdate.params.area = Number(toUpdate.params.area);
        toUpdate.params.floor = Number(toUpdate.params.floor);
      }
      const response = await api.put(`/items/${id}`, {...toUpdate, "price": Number(toUpdate.price)});
      console.log(response);
      openNotification('success');
      setTimeout(() => navigate(`/ads/${id}`), 800);
    } catch (e) {
      openNotification('error');
    } finally {
      setIsSaving(false);
    }
  }

  const handleCancel = () => {
    navigate(-1);
  }

  const handleSelect = (key: string, value: string | number | undefined) => {
    setNewData((prev) => {
      if (!prev) return null;
      if (key === "category") {
        return { ...prev, category: value as string };
      }
      return {
        ...prev,
        params: {
          ...(prev.params as any),
          [key]: value
        }
      }
    });
  }

  const handleInput = (key: string, value: string) => {
    setNewData((prev: SingleItemGetOut | null) => {
      if (!prev) return null;
      return {
        ...prev,
        [key]: value
      }
    });
  }
  
  if(isLoading || !newData) return (
    <Spin style={{width: '100dvw', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  )
  if(isError) return (
    <Result title={axiosError.response?.status.toString()}  subTitle="Sorry, something went wrong."/>
  )
  
  return (
    <>
      {contextHolder}
      <Flex vertical gap={18} style={{padding: 32}}>
        <Typography.Title level={2} style={{margin: 0, padding: 0}}>Редактирование объявления</Typography.Title>

        <Flex vertical gap={8}>
          <Typography.Title level={4} style={{margin: 0, padding: 0}}>Категория</Typography.Title>
          <Select
            defaultValue={data?.category}
            options={[
            { value: 'auto', label: 'Авто' },
            { value: 'electronics', label: 'Электроника' },
            { value: 'real_estate', label: 'Недвижимость' },
            ]} 
            style={{width: 256}}
            onChange={(newValue) => handleSelect("category", newValue)}
            />
        </Flex>

        <Divider style={{margin: 0, padding: 0}}/>

        <Flex vertical gap={8}>
          <Flex gap={8} align="center">
            <span style={{color: "#FF4D4F"}}>*</span>
            <Typography.Title level={4} style={{display: "inline", margin: 0, padding: 0}}>Название</Typography.Title>
          </Flex>
          <Input placeholder="Название товара" status={newData.title ? "" : "error"} value={newData.title} onChange={(newValue) => handleInput("title", newValue.target.value)} styles={{root: {width: 456}}} allowClear={true}/>
          { !newData.title &&
            <Typography.Text style={{color: "#FF4D4F"}}>Название должно быть заполнено</Typography.Text> 
          }
        </Flex>

        <Divider style={{margin: 0, padding: 0}}/>

        <Flex vertical gap={8}>
          <Flex gap={8} align="center">
            <span style={{color: "#FF4D4F"}}>*</span>
            <Typography.Title level={4} style={{display: "inline", margin: 0, padding: 0}}>Цена</Typography.Title>
          </Flex>
          <Flex gap={24}>
            <Flex vertical gap={8}>
              <Input placeholder="Цена товара" status={newData.price ? "" : "error"} value={String(newData.price)} onChange={(newValue) => handleInput("price", newValue.target.value)} styles={{root: {width: 456}}} allowClear={true}/>
              { !newData.price &&
                <Typography.Text style={{color: "#FF4D4F"}}>Цена должна быть заполнена</Typography.Text> 
              }
            </Flex>
            
            <Button type="primary">Кнопка с магией</Button>
          </Flex>
        </Flex>
        
        <Divider style={{margin: 0, padding: 0}}/>
        
        <Flex vertical gap={8}>
            <Typography.Title level={4} style={{margin: 0, padding: 0}}>Характеристики</Typography.Title>
          <Flex vertical gap={12}>
            <ItemSpecsInputs category={newData.category} params={newData.params} onSelect={handleSelect}/>
          </Flex>
        </Flex>
        
        <Divider style={{margin: 0, padding: 0}}/>

        <Flex vertical gap={8}>
          <Typography.Title level={4} style={{display: "inline", margin: 0, padding: 0}}>Описание</Typography.Title>
            <Input.TextArea status={newData.description ? "" : "warning"} placeholder="Описание товара" showCount maxLength={1000} value={newData.description} onChange={(newValue) => handleInput("description", newValue.target.value)} style={{width: 942}} allowClear={true}/>
            <Button type="primary" style={{width: "fit-content"}}>Кнопка с магией</Button>
        </Flex>

        <Flex gap={10}>
          <Button loading={isSaving} type="primary" disabled={!newData.title || !newData.price } onClick={handleSave}>Сохранить</Button>
          <Button styles={{root: {background: "#D9D9D9", color: "#5A5A5A" }}} onClick={handleCancel}>Отменить</Button>
        </Flex>
      </Flex>
    </>
  )
}

export default PageEdit