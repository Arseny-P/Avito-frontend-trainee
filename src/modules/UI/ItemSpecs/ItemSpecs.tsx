import { useEffect, useMemo } from "react";
import { Flex, Typography } from "antd";
import type { 
  AutoItemParams, 
  ElectronicsItemParams, 
  RealEstateItemParams 
} from "../../../services/types/QueryUpdatePost.type";
import { autoLabels, electronicsLabels, realEstateLabels } from "./ItemSpecsName";

type specsProps = {
  category: string;
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
  setMissingSpecs: React.Dispatch<React.SetStateAction<string[]>>;
};

const ItemSpecs = ({ category, params, setMissingSpecs }: specsProps) => {
  const { specsList, missing } = useMemo(() => {
    let specKeys: string[] = [];
    let labels: Record<string, string> = {};

    switch (category) {
      case "auto":
        specKeys = ["brand", "model", "yearOfManufacture", "transmission", "mileage", "enginePower"];
        labels = autoLabels;
        break;
      case "real_estate":
        specKeys = ["type", "address", "area", "floor"];
        labels = realEstateLabels;
        break;
      case "electronics":
        specKeys = ["type", "brand", "model", "condition", "color"];
        labels = electronicsLabels;
        break;
      default:
        specKeys = [];
        labels = {};
    }

    const missingFields: string[] = [];
    specKeys.forEach((key) => {
      if (params[key as keyof typeof params] === undefined) {
        missingFields.push(labels[key]);
      }
    });

    const ourSpecs = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => ({
        label: labels[key],
        value: String(value),
      }));

    return { specsList: ourSpecs, missing: missingFields };
  }, [category, params]);

  useEffect(() => {
    setMissingSpecs(missing);
  }, [missing, setMissingSpecs]);

  if(specsList.length === 0) {
    return <Typography.Text style={{ color: "rgba(0, 0, 0, 0.45)" }} strong>Отсутствуют</Typography.Text>;
  }
  return (
    <>
      {specsList.map((spec, index) => (
        <Flex key={index} gap={12} style={{ marginBottom: 8 }}>
          <Typography.Text style={{ width: 148, color: "rgba(0, 0, 0, 0.45)" }} strong>{spec.label}</Typography.Text>
          <Typography.Text>{spec.value}</Typography.Text>
        </Flex>
      ))}
    </>
  );
};

export default ItemSpecs;