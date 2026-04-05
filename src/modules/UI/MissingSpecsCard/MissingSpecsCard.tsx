import { ExclamationCircleFilled } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
import { useAppColors } from "../../../services/hooks/useAppColors";

const MissingSpecsCard = ({ missingSpecs }: { missingSpecs: string[] }) => {
  const { bgGold, textGold } = useAppColors();
  return (
    <Card
      styles={{
        root: {
          backgroundColor: bgGold,
          padding: "12px 16px",
          borderRadius: 8,
          boxShadow:
            "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)",
        },
        body: { padding: 0 },
      }}
    >
      <Card.Meta
        avatar={
          <ExclamationCircleFilled style={{ color: textGold, fontSize: 18 }} />
        }
        title={
          <Typography.Text style={{ fontSize: 16 }} strong>
            Требует доработок
          </Typography.Text>
        }
        description={
          <Flex vertical>
            <Typography.Text style={{ margin: 0 }}>
              У объявления не заполнены поля:
            </Typography.Text>
            <ul style={{ margin: 0 }}>
              {missingSpecs.map((item: string, index: number) => (
                <li key={index}>
                  <Typography.Text>{item}</Typography.Text>
                </li>
              ))}
            </ul>
          </Flex>
        }
      />
    </Card>
  );
};

export default MissingSpecsCard;
