import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGuestCount, setGamePhase } from '../redux/slices/gameSlice';
import { setPlayerCount } from '../redux/slices/playersSlice';
import { Card, Title, Input, Button, ErrorText } from '../styles/Components';

function GuestCountPage() {
  const dispatch = useDispatch();
  const playerStatus = useSelector((state) => state.playerPool.status);
  const [count, setCount] = useState('');
  const [error, setError] = useState('');

  const isLoading = playerStatus === 'prefetching';

  const handleSubmit = () => {
    const num = parseInt(count);
    
    if (isNaN(num) || num < 3 || num > 10) {
      setError('Please enter a number between 3 and 10');
      return;
    }

    dispatch(setGuestCount(num));
    dispatch(setPlayerCount(num));
    dispatch(setGamePhase('enterNames'));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card>
      <Title>⚽ Mr. White Football Card Game</Title>
      <p style={{ textAlign: 'center', color: '#7E1532', marginBottom: '30px' }}>
        How many guests are playing?
      </p>
      {isLoading && (
        <p style={{ textAlign: 'center', color: '#27ae60', marginBottom: '15px', fontSize: '0.9rem' }}>
          ⚡ Loading players...
        </p>
      )}
      <Input
        type="number"
        min="3"
        max="10"
        placeholder="Enter number (3-10)"
        value={count}
        onChange={(e) => {
          setCount(e.target.value);
          setError('');
        }}
        onKeyPress={handleKeyPress}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Button onClick={handleSubmit}>Continue</Button>
    </Card>
  );
}

export default GuestCountPage;