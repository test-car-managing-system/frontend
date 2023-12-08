import { CarType } from '../type/car';

function mapKoreanToCarType(koreanType: string): CarType | undefined {
  if (!koreanType) return undefined;
  for (const [key, value] of Object.entries(CarType)) {
    if (koreanType && value.includes(koreanType)) {
      return CarType[value as keyof typeof CarType];
    }
  }
  return CarType.NULL;
}

export default mapKoreanToCarType;
