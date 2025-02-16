import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const StyledContainer = styled(Container)`
  padding: 2rem;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  margin-top: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledContainer>
      <h1 className="mb-4">Alışveriş Listesi</h1>
      {children}
    </StyledContainer>
  );
}; 