import { useNavigate, useParams } from "react-router";
import { useGetSinglePost } from "../services/hooks/useSinglePost";
import { Button, Divider, Flex, Input, Select, Typography } from "antd";
import type { SingleItemGetOut } from "../services/types/SinglePost.type";
import ItemSpecsInputs from "../modules/UI/ItemSpecs/ItemSpecsInputs";
import { useEffect, useState} from "react";


const PageEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {data, isLoading, isError } = useGetSinglePost(id!);

  const [newData, setNewData] = useState<SingleItemGetOut | null>(null);

  useEffect(() => {
    if (data && !localStorage.getItem("newData")) {
      setNewData(data);
    } else if (localStorage.getItem("newData")) {
      setNewData(JSON.parse(localStorage.getItem("newData")!));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("newData", JSON.stringify(newData));
  }, [newData])

  const handleSave = () => {
    console.log(newData);
  }

  const handleCancel = () => {
    navigate(-1);
  }

  const handleSelect = (key: string, value: string | number | undefined) => {
    setNewData((prev: SingleItemGetOut | null) => {
      if (!prev) return null;
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
  
  if(isLoading || !newData) return <div>Loading...</div>;
  if(isError) return <div>Error</div>;
  
  return (
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
          <Input.TextArea placeholder="Описание товара" showCount maxLength={1000} value={newData.description} style={{width: 942}} allowClear={true}/>
          <Button type="primary" style={{width: "fit-content"}}>Кнопка с магией</Button>
      </Flex>

      <Flex gap={10}>
        <Button type="primary" disabled={newData.title === undefined || newData.price === undefined} onClick={handleSave}>Сохранить</Button>
        <Button styles={{root: {background: "#D9D9D9", color: "#5A5A5A" }}} onClick={handleCancel}>Отменить</Button>
      </Flex>
    </Flex>
  )
}

export default PageEdit