import { Flex, Input, Select, Typography } from "antd";
import type { specType } from "../../../services/types/SpecType.type";
import { autoOptions, electronicsOptions, realEstateOptions } from "./ItemsParams/ItemSpecsSelectors";
import { autoLabels, electronicsLabels, realEstateLabels } from "./ItemsParams/ItemSpecsName";

type ItemSpecsInputsProps = {
    category: string;
    params: Record<string, string | number | undefined>;
    onSelect: (key: string, value: string | number | undefined) => void
}

export const ItemSpecsInputs = ({ category, params, onSelect }: ItemSpecsInputsProps) => {
    let selectorsOptions: Record<string, { value: string; label: string}[]> = {};
    let labels: Record<string, string> = {};

    switch (category) {
      case "auto":
        selectorsOptions = autoOptions;
        labels = autoLabels;
        break;
      case "real_estate":
        selectorsOptions = realEstateOptions;
        labels = realEstateLabels;
        break;
      case "electronics":
        selectorsOptions = electronicsOptions
        labels = electronicsLabels;
        break;
      default:
        selectorsOptions = {};
        labels = {};
    }

    const specsList: specType[] = Object.entries(params).map(([key, value]) => ({
      key,
      label: labels[key],
      value: value,
    }));

  return (
    <>
      {specsList.map((spec, index) => (
        <Flex vertical key={index} gap={8}>
          <Typography.Text style={{color: "rgba(0, 0, 0, 0.85)"}}>{spec.label}</Typography.Text>
          { Object.keys(selectorsOptions).includes(spec.key) ? (
                <Select placeholder={spec.label} value={spec.value} style={{width: 456}} allowClear={true} options={selectorsOptions[spec.key]} onChange={(newValue) => onSelect(spec.key, newValue)}/>
            ) : (
                <Input placeholder={spec.label} value={spec.value} style={{width: 456}} allowClear={true} onChange={(newValue) => onSelect(spec.key, newValue.target.value)}/>
            ) 
          }
        </Flex>
      ))}
    </>
  );
};

export default ItemSpecsInputs;