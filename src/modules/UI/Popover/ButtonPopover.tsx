import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Popover, Spin, Typography } from "antd";
import { useState, type ReactNode } from "react";
import { diffWords } from "diff";

type buttonPopoverType = {
  isPending: boolean;
  isError: boolean;
  oldData?: string;
  data: string;
  applyHandler: () => void;
  children: ReactNode;
  withCompare?: boolean;
};

const ButtonPopover = ({
  isPending,
  isError,
  oldData,
  data,
  applyHandler,
  children,
  withCompare = false,
}: buttonPopoverType) => {
  const [open, setOpen] = useState<boolean>(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setOpen(true);
    }
  };

  const errorStyle = "#FEE9E7";
  const successStyle = "#fff";

  const difference = withCompare ? diffWords(oldData || "", data || "") : [];

  return (
    <Popover
      content={
        <Flex vertical gap={8}>
          {isPending ? (
            <Spin
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}
            />
          ) : isError ? (
            <>
              <Typography.Text
                strong
                style={{ margin: 0, padding: 0, color: "#C00F0C" }}
              >
                Произошла ошибка при запросе к AI
              </Typography.Text>
              <Typography.Text style={{ margin: 0, padding: 0 }}>
                Попробуйте повторить запрос или закройте уведомление
              </Typography.Text>
              <Button
                type="text"
                onClick={hide}
                style={{ backgroundColor: "#FCB3AD", width: "fit-content" }}
              >
                Закрыть
              </Button>
            </>
          ) : (
            <>
              <Typography.Text strong style={{ margin: 0, padding: 0 }}>
                Ответ AI:
              </Typography.Text>
              {withCompare ? (
                <Typography.Text style={{ margin: 0, padding: 0 }}>
                  {difference.map((word, index) => {
                    if (word.added) {
                      return (
                        <span
                          key={index}
                          style={{
                            background: "#D9F7BE",
                            color: "#237804",
                            borderRadius: 4,
                            padding: 2,
                          }}
                        >
                          {word.value}
                        </span>
                      );
                    } else if (word.removed) {
                      return (
                        <span
                          key={index}
                          style={{
                            background: "#FCB3AD",
                            color: "#C00F0C",
                            borderRadius: 4,
                            padding: 2,
                            textDecoration: "line-through",
                          }}
                        >
                          {word.value}
                        </span>
                      );
                    } else {
                      return <span key={index}>{word.value}</span>;
                    }
                  })}
                </Typography.Text>
              ) : (
                <Typography.Text style={{ margin: 0, padding: 0 }}>
                  {data}
                </Typography.Text>
              )}
              <Flex gap={10}>
                <Button
                  type="primary"
                  onClick={() => {
                    applyHandler();
                    hide();
                  }}
                >
                  Применить
                </Button>
                <Button
                  type="text"
                  onClick={hide}
                  style={{ width: "fit-content" }}
                >
                  Закрыть
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="topRight"
      styles={{ container: { padding: 8, maxWidth: "50dvw" } }}
      color={isError ? errorStyle : successStyle}
    >
      {children}
    </Popover>
  );
};

export default ButtonPopover;
