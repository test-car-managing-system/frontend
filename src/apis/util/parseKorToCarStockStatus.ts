import { CarStockStatus, CarType } from '../type/car';

// 한글을 Enum 으로 매핑하는 유틸함수
function parseKorToCarStockStatus(kor: string): string {
  for (const [key, value] of Object.entries(CarStockStatus)) {
    if (value === kor) {
      return key;
    }
  }
  return '';
}

export default parseKorToCarStockStatus;
