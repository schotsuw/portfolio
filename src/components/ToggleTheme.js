import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const ToggleContainer = styled(motion.div)`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${({ theme }) => theme.toggle};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ToggleBall = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  left: ${({ isDark }) => (isDark ? '2px' : '28px')};
  transition: left 0.3s ease;
`;

const Icon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 13px;
  z-index: 1;
`;

const ToggleTheme = ({ isDark, toggleTheme }) => {
  return (
    <ToggleContainer
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon>
        <BsSunFill />
      </Icon>
      <Icon>
        <BsMoonFill />
      </Icon>
      <ToggleBall
        isDark={isDark}
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      />
    </ToggleContainer>
  );
};

export default ToggleTheme; 