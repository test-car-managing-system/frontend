import { CarType } from '../type/car';

// 한글을 Enum 으로 매핑하는 유틸함수
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
