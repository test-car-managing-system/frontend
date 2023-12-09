import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../common/theme';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * 기본, 테두리강조, 색칠
   */
  property?: 'default' | 'update' | 'logout' | 'delete';
  /**
   * 버튼 내용
   */
  label?: string;
  /**
   * 버튼 활성화 상태
   */
  state?: boolean;
  /**
   * 너비 고정, 가운데 정렬인 버튼 (모달->삭제하기)
   */
  fixed?: boolean;
}

function Button({
  property = 'default',
  label,
  state = true,
  fixed = false,
  ...props
}: ButtonProps) {
  return (
    <Wrapper property={property}>
      <button onClick={props.onClick} disabled={!state}>
        {label}
      </button>
    </Wrapper>
  );
}

export default Button;

const handleColorType = (
  property: 'default' | 'update' | 'logout' | 'delete',
) => {
  const defaultColor = theme.palette.main.gray;
  const updateColor = theme.palette.main.blue;
  const logout = theme.palette.main.darkBlue;
  const deleteColor = theme.palette.main.red;

  switch (property) {
    case 'default':
      return defaultColor;
    case 'update':
      return updateColor;
    case 'logout':
      return logout;
    case 'delete':
      return deleteColor;
  }
};

const Wrapper = styled.div<{
  property: 'default' | 'update' | 'logout' | 'delete';
}>`
  width: 76px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  button {
    transition: ${({ theme }) => theme.transition.onHover};
    background-color: ${({ property }) => handleColorType(property)};
    color: ${({ theme }) => theme.palette.main.white};
    ${({ theme }) => {
      const selected = theme.palette.main.darkBlue;
      return css`
        &:active {
          background: ${selected};
        }
      `;
    }}

    &:disabled {
      cursor: not-allowed;
      opacity: 50%;
    }

    ${({ theme }) => theme.typo.button.Secondary_T_13_EB}
    font-weight: 500;

    border-radius: 8px;
    width: 100%;
    height: 40px;

    &:hover {
      opacity: 80%;
    }
  }
`;
