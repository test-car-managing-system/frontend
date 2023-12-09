import { Pagination as BasePagination, Select } from 'antd';
import { TPageRequest } from '../../apis/type/commonRequest';
import { useEffect, useState } from 'react';

interface PageSizeSelectProps {
  totalElements: number;
  pageSize: number;
  children?: React.ReactNode;
  onchange?: ({ page, size }: TPageRequest) => void;
}

function Pagination({
  totalElements,
  pageSize,
  children,
  onchange,
}: PageSizeSelectProps) {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize]);
  return (
    <BasePagination
      defaultPageSize={10}
      pageSize={pageSize}
      current={currentPage}
      total={totalElements}
      onChange={(value, size) => {
        if (onchange) {
          onchange({ page: (value as number) - 1, size: pageSize });
        }
        setCurrentPage(value);
      }}
    />
  );
}

export default Pagination;
