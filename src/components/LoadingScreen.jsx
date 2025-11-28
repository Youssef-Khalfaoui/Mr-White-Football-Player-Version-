import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Card } from '../styles/Components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(126, 21, 50, 0.1);
  border-top: 4px solid #7e1532;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #7e1532;
  font-size: 1.1rem;
  margin-top: 15px;
`;

function LoadingScreen() {
  return (
    <Card>
      <h1 style={{ textAlign: 'center', color: '#7e1532', marginBottom: '20px' }}>
        ⚽ Mr. White Football Card Game
      </h1>
      <Spinner />
      <LoadingText>Loading players...</LoadingText>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginTop: '10px' }}>
        Fetching the latest football stars from API-Football
      </p>
    </Card>
  );
}

export default LoadingScreen;