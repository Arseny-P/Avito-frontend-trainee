import { useEffect, useMemo } from "react";
import { Flex, Typography } from "antd";
import type { 
  AutoItemParams, 
  ElectronicsItemParams, 
  RealEstateItemParams 
} from "../../../services/types/QueryUpdatePost.type";
import { autoLabels, electronicsLabels, realEstateLabels } from "./ItemsParams/ItemSpecsName";
import { useAppDispatch } from "../../../store";
import { ItemSpecsSLice } from "./ItemSpecs.slice";
import type { specType } from "../../../services/types/SpecType.type";
import { AutoSpecsKey, ElectronicsSpecsKey, RealEstateSpecsKey } from "./ItemsParams/ItemSpecsKey";

type specsProps = {
  category: string;
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
};

const ItemSpecs = ({ category, params}: specsProps) => {
  const dispatch = useAppDispatch();

  const { specsList, missingNames, exisitingSpecs } = useMemo(() => {
    let specKeys: string[] = [];
    let labels: Record<string, string> = {};

    switch (category) {
      case "auto":
        specKeys = AutoSpecsKey;
        labels = autoLabels;
        break;
      case "real_estate":
        specKeys = RealEstateSpecsKey;
        labels = realEstateLabels;
        break;
      case "electronics":
        specKeys = ElectronicsSpecsKey;
        labels = electronicsLabels;
        break;
      default:
        specKeys = [];
        labels = {};
    }

    const missing: string[] = [];
    specKeys.forEach((key) => {
      if (params[key as keyof typeof params] === undefined) {
         missing.push(labels[key]);
      }
    });

    const allCategorySpecs = specKeys.map((key) => ({
        key: key,
        label: labels[key],
        value: params[key as keyof typeof params],
      })) as specType[];
    
    const present = allCategorySpecs.filter(({key, label, value}) => value !== undefined)
    return { specsList: present, missingNames: missing, exisitingSpecs: allCategorySpecs };
  }, [category, params]);

  useEffect(() => {
    dispatch(ItemSpecsSLice.actions.setAllSpecs({
        existing: exisitingSpecs,
        missing: missingNames
    }));
  }, [exisitingSpecs, missingNames, dispatch]);

  if(specsList.length === 0) {
    return <Typography.Text style={{ color: "rgba(0, 0, 0, 0.45)" }} strong>Отсутствуют</Typography.Text>;
  }
  return (
    <>
      {specsList.map((spec, index) => (
        <Flex key={index} gap={12} style={{marginBottom: 8}}>
          <Typography.Text style={{ width: 148, color: "rgba(0, 0, 0, 0.45)"}} strong>{spec.label}</Typography.Text>
          <Typography.Text>{spec.label}</Typography.Text>
        </Flex>
      ))}
    </>
  );
};

export default ItemSpecs;