import { Flex, Input, Select, Typography } from "antd";
import type { specType } from "../../../services/types/SpecType.type";
import {
  autoOptions,
  electronicsOptions,
  realEstateOptions,
} from "./ItemsParams/ItemSpecsSelectors";
import {
  autoLabels,
  electronicsLabels,
  realEstateLabels,
} from "./ItemsParams/ItemSpecsName";
import {
  AutoSpecsKey,
  ElectronicsSpecsKey,
  RealEstateSpecsKey,
} from "./ItemsParams/ItemSpecsKey";

type ItemSpecsInputsProps = {
  category: string;
  params: Record<string, string | number | undefined>;
  onSelect: (key: string, value: string | number | undefined) => void;
};

export const ItemSpecsInputs = ({
  category,
  params,
  onSelect,
}: ItemSpecsInputsProps) => {
  let specKeys: string[] = [];
  let selectorsOptions: Record<string, { value: string; label: string }[]> = {};
  let labels: Record<string, string> = {};

  switch (category) {
    case "auto":
      specKeys = AutoSpecsKey;
      selectorsOptions = autoOptions;
      labels = autoLabels;
      break;
    case "real_estate":
      specKeys = RealEstateSpecsKey;
      selectorsOptions = realEstateOptions;
      labels = realEstateLabels;
      break;
    case "electronics":
      specKeys = ElectronicsSpecsKey;
      selectorsOptions = electronicsOptions;
      labels = electronicsLabels;
      break;
    default:
      specKeys = [];
      selectorsOptions = {};
      labels = {};
  }

  const specsList: specType[] = specKeys.map((key) => ({
    key,
    label: labels[key],
    value: params[key],
  }));

  return (
    <>
      {specsList.map((spec, index) => (
        <Flex vertical key={spec.key + index} gap={8}>
          <Typography.Text>{spec.label}</Typography.Text>
          {Object.keys(selectorsOptions).includes(spec.key) ? (
            <Select
              status={spec.value ? "" : "warning"}
              placeholder={spec.label}
              value={spec.value}
              style={{ width: 456 }}
              allowClear={true}
              options={selectorsOptions[spec.key]}
              onChange={(newValue) => onSelect(spec.key, newValue)}
            />
          ) : (
            <Input
              status={spec.value ? "" : "warning"}
              placeholder={spec.label}
              value={spec.value}
              style={{ width: 456 }}
              allowClear={true}
              onChange={(newValue) => onSelect(spec.key, newValue.target.value)}
            />
          )}
        </Flex>
      ))}
    </>
  );
};

export default ItemSpecsInputs;
