import type { SingleItemGetOut } from "../../../services/types/SinglePost.type";

export const getMainInfo = (item: SingleItemGetOut): string => {
  const { category, params, ...other } = item;

  switch (category) {
    case 'auto':
      return [
        Object.entries(other),
        params.brand,
        params.model,
        params.yearOfManufacture ? `${params.yearOfManufacture} г.` : null,
        params.transmission === 'automatic' ? 'АКПП' : params.transmission === 'manual' ? 'МКПП' : null,
        params.mileage ? `${params.mileage.toLocaleString()} км` : null,
      ]
        .filter(Boolean)
        .join(', ');

    case 'real_estate':
      const typeMap = { flat: 'Квартира', house: 'Дом', room: 'Комната' };
      return [
        Object.entries(other),
        params.type ? typeMap[params.type] : null,
        params.area ? `${params.area} м²` : null,
        params.floor ? `${params.floor} этаж` : null,
        params.address,
      ]
        .filter(Boolean)
        .join(', ');

    case 'electronics':
      const conditionMap = { new: 'новый', used: 'б/у' };
      return [
        Object.entries(other),
        params.brand,
        params.model,
        params.condition ? conditionMap[params.condition] : null,
        params.color,
      ]
        .filter(Boolean)
        .join(', ');

    default:
      return '';
  }
};