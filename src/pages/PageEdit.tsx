import { useNavigate, useParams } from "react-router";
import { useGetSinglePost } from "../services/hooks/useSinglePost";
import {
  Button,
  Divider,
  Flex,
  Input,
  notification,
  Result,
  Select,
  Spin,
  Typography,
} from "antd";
import type { SingleItemGetOut } from "../services/types/SinglePost.type";
import ItemSpecsInputs from "../modules/UI/ItemSpecs/ItemSpecsInputs";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import {
  BulbOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { api } from "../services/api/api";
import { descPromt, pricePrompt } from "../services/ollama/basePromt";
import { getMainInfo } from "../modules/UI/ItemSpecs/getMainInfo";
import { useAskOllama } from "../services/hooks/useOllama";
import ButtonPopover from "../modules/UI/Popover/ButtonPopover";
import { useAppColors } from "../services/hooks/useAppColors";

const PageEdit = () => {
  const { textGold, bgGold, textNeutral, bgNeutral } = useAppColors();
  const abortControllerRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSinglePost(id!);
  const axiosError = error as AxiosError<{ message: string }>;
  const [newData, setNewData] = useState<SingleItemGetOut | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const {
    mutate: generateText,
    isPending: isOllamaPending,
    isError: isOllamaError,
    data: ollamaData,
  } = useAskOllama();

  const [noticeApi, contextHolder] = notification.useNotification();
  const openNotification = (result: string) => {
    if (result === "success") {
      noticeApi.success({
        title: "Изменения сохранены",
        placement: "topRight",
        duration: 2,
      });
    } else {
      noticeApi.error({
        title: "Ошибка сохранения",
        description:
          "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
        placement: "topRight",
        duration: 3,
      });
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("newData");
    if (data) {
      setNewData(JSON.parse(data));
    }
    return abortControllerRef.current?.abort();
  }, []);

  useEffect(() => {
    if (data && !newData) {
      setNewData(data);
    }
  }, [data]);

  useEffect(() => {
    if (!newData) return;
    localStorage.setItem("newData", JSON.stringify(newData));
  }, [newData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { id, needsRevision, createdAt, updatedAt, ...toUpdate } = newData!;
      if (toUpdate.category === "auto") {
        const { yearOfManufacture, enginePower, mileage } = toUpdate.params;
        if (Number(yearOfManufacture)) {
          toUpdate.params.yearOfManufacture = Number(yearOfManufacture);
        }
        if (Number(enginePower)) {
          toUpdate.params.enginePower = Number(enginePower);
        }
        if (Number(mileage)) {
          toUpdate.params.mileage = Number(mileage);
        }
      }
      if (toUpdate.category === "real_estate") {
        const { area, floor } = toUpdate.params;
        if (Number(area)) {
          toUpdate.params.area = Number(area);
        }
        if (Number(floor)) {
          toUpdate.params.floor = Number(floor);
        }
      }
      const response = await api.put(`/items/${id}`, {
        ...toUpdate,
        price: Number(toUpdate.price),
      });
      console.log(response);
      openNotification("success");
      setTimeout(() => navigate(`/ads/${id}`), 800);
    } catch (e) {
      openNotification("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/ads/${id}`);
  };

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
          [key]: value,
        },
      };
    });
  };

  const handleInput = (key: string, value: string) => {
    setNewData((prev: SingleItemGetOut | null) => {
      if (!prev) return null;
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleAskOllama = async (question: string) => {
    if (!newData || isOllamaPending) return;
    generateText({
      prompt: question,
      signal: abortControllerRef.current?.signal,
    });
  };

  if (isLoading || !newData)
    return (
      <Spin
        style={{
          width: "100dvw",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    );
  if (isError)
    return (
      <Result
        title={axiosError.response?.status.toString()}
        subTitle="Sorry, something went wrong."
      />
    );

  return (
    <>
      {contextHolder}
      <Flex vertical gap={18} style={{ padding: 32 }}>
        <Typography.Title level={2} style={{ margin: 0, padding: 0 }}>
          Редактирование объявления
        </Typography.Title>
        <Button
          styles={{
            root: {
              background: bgNeutral,
              color: textNeutral,
              width: "fit-content",
            },
          }}
          onClick={handleCancel}
        >
          Отменить
        </Button>

        {/* ======================= Category ======================= */}
        <Flex vertical gap={8}>
          <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>
            Категория
          </Typography.Title>
          <Select
            defaultValue={data?.category}
            options={[
              { value: "auto", label: "Авто" },
              { value: "electronics", label: "Электроника" },
              { value: "real_estate", label: "Недвижимость" },
            ]}
            styles={{ root: { width: 256 } }}
            onChange={(newValue) => handleSelect("category", newValue)}
          />
        </Flex>

        <Divider style={{ margin: 0, padding: 0 }} />

        {/* ======================= Title ======================= */}
        <Flex vertical gap={8}>
          <Flex gap={8} align="center">
            <span style={{ color: "#FF4D4F" }}>*</span>
            <Typography.Title
              level={4}
              style={{ display: "inline", margin: 0, padding: 0 }}
            >
              Название
            </Typography.Title>
          </Flex>
          <Input
            placeholder="Название товара"
            status={newData.title ? "" : "error"}
            value={newData.title}
            onChange={(newValue) => handleInput("title", newValue.target.value)}
            styles={{ root: { width: 456 } }}
            allowClear={true}
          />
          {!newData.title && (
            <Typography.Text style={{ color: "#FF4D4F" }}>
              Название должно быть заполнено
            </Typography.Text>
          )}
        </Flex>

        <Divider style={{ margin: 0, padding: 0 }} />

        {/* ======================= Price ======================= */}
        <Flex vertical gap={8}>
          <Flex gap={8} align="center">
            <span style={{ color: "#FF4D4F" }}>*</span>
            <Typography.Title
              level={4}
              style={{ display: "inline", margin: 0, padding: 0 }}
            >
              Цена
            </Typography.Title>
          </Flex>
          <Flex gap={24}>
            <Flex vertical gap={8}>
              <Input
                placeholder="Цена товара"
                status={newData.price ? "" : "error"}
                value={String(newData.price)}
                onChange={(newValue) =>
                  handleInput("price", newValue.target.value)
                }
                styles={{ root: { width: 456 } }}
                allowClear={true}
              />
              {!newData.price && (
                <Typography.Text style={{ color: "#FF4D4F" }}>
                  Цена должна быть заполнена
                </Typography.Text>
              )}
            </Flex>
            <ButtonPopover
              isPending={isOllamaPending}
              isError={isOllamaError}
              data={ollamaData ? ollamaData.split("@")[1] : ""}
              applyHandler={() => {
                if (ollamaData)
                  handleInput("price", ollamaData.split("@")[0].trim());
              }}
            >
              <Button
                loading={isOllamaPending}
                icon={ollamaData ? <ReloadOutlined /> : <BulbOutlined />}
                variant="filled"
                style={{
                  width: "fit-content",
                  border: "none",
                  color: textGold,
                  backgroundColor: bgGold,
                }}
                onClick={() =>
                  handleAskOllama(pricePrompt(getMainInfo(newData), true))
                }
              >
                {isOllamaPending
                  ? "Выполняется запрос"
                  : ollamaData || isOllamaError
                    ? "Повторить запрос"
                    : "Узнать рыночную цену"}
              </Button>
            </ButtonPopover>
          </Flex>
        </Flex>

        <Divider style={{ margin: 0, padding: 0 }} />

        {/* ======================= Specs ======================= */}
        <Flex vertical gap={8}>
          <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>
            Характеристики
          </Typography.Title>
          <Flex vertical gap={12}>
            <ItemSpecsInputs
              category={newData.category}
              params={newData.params}
              onSelect={handleSelect}
            />
          </Flex>
        </Flex>

        <Divider style={{ margin: 0, padding: 0 }} />

        {/* ======================= Description ======================= */}
        <Flex vertical gap={8}>
          <Typography.Title
            level={4}
            style={{ display: "inline", margin: 0, padding: 0 }}
          >
            Описание
          </Typography.Title>
          <Input.TextArea
            status={newData.description ? "" : "warning"}
            placeholder="Описание товара"
            showCount
            maxLength={1000}
            value={newData.description}
            onChange={(newValue) =>
              handleInput("description", newValue.target.value)
            }
            style={{ width: 942 }}
            autoSize={{ minRows: 2, maxRows: 6 }}
            allowClear={true}
          />
          <ButtonPopover
            isPending={isOllamaPending}
            isError={isOllamaError}
            oldData={newData.description || ""}
            data={ollamaData || ""}
            applyHandler={() => {
              handleInput("description", ollamaData!);
            }}
            withCompare={true}
          >
            <Button
              loading={isOllamaPending}
              icon={ollamaData ? <ReloadOutlined /> : <BulbOutlined />}
              variant="filled"
              style={{
                width: "fit-content",
                border: "none",
                color: textGold,
                backgroundColor: bgGold,
              }}
              onClick={() => handleAskOllama(descPromt(getMainInfo(newData)))}
            >
              {isOllamaPending
                ? "Выполняется запрос"
                : ollamaData || isOllamaError
                  ? "Повторить запрос"
                  : newData.description
                    ? "Улучшить описание"
                    : "Придумать описание"}
            </Button>
          </ButtonPopover>
        </Flex>

        {/* ======================= Buttons ======================= */}
        <Flex gap={10}>
          <Button
            loading={isSaving}
            type="primary"
            disabled={!newData.title || !newData.price}
            onClick={handleSave}
          >
            Сохранить
          </Button>
          <Button
            styles={{ root: { background: bgNeutral, color: textNeutral } }}
            onClick={handleCancel}
          >
            Отменить
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default PageEdit;
