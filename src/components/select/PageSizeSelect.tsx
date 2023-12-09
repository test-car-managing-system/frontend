import { Select } from 'antd';
import { TPageRequest } from '../../apis/type/commonRequest';

interface PageSizeSelectProps {
  children?: React.ReactNode;
  onchange?: ({ page, size }: TPageRequest) => void;
}

function PageSizeSelect({ children, onchange }: PageSizeSelectProps) {
  return (
    <Select
      style={{ width: '150px' }}
      defaultValue={10}
      onChange={(value, option) => {
        if (onchange) onchange({ page: 0, size: value as number });
      }}
    >
      <Select.Option value={5}>5개씩 보기</Select.Option>
      <Select.Option value={10}>10개씩 보기</Select.Option>
      <Select.Option value={20}>20개씩 보기</Select.Option>
      <Select.Option value={50}>50개씩 보기</Select.Option>
    </Select>
  );
}

export default PageSizeSelect;
