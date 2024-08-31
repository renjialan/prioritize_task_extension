import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import TaskMatrix from './components/taskmatrix';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
    color: #333;
    overflow: hidden;
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <TaskMatrix />
      </AppContainer>
    </>
  );
};

export default App;