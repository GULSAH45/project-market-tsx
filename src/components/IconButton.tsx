import styled from 'styled-components';
import { Trash2 } from 'lucide-react';

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #dc3545;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #bb2d3b;
    transform: scale(1.1);
  }
`;

interface IconButtonProps {
  onClick: () => void;
}

export const IconButton = ({ onClick }: IconButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <Trash2 size={20} />
    </StyledButton>
  );
};