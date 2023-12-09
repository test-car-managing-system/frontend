import { CarType } from '../type/car';

// 한글을 Enum 으로 매핑하는 유틸함수
function parseKorToCarType(kor: string): string {
  for (const [key, value] of Object.entries(CarType)) {
    if (value === kor) {
      return key;
    }
  }
  return CarType.NULL;
}

export default parseKorToCarType;
