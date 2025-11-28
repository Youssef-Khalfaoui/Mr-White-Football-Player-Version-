import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame } from '../redux/slices/gameSlice';
import { resetPlayers } from '../redux/slices/playersSlice';
import { resetPlayerPool, prefetchPlayers } from '../redux/slices/playerPoolSlice';
import {
  Card,
  Title,
  Button,
  ProgressText,
  GuestButton,
} from '../styles/Components';

function VotingPage() {
  const dispatch = useDispatch();
  const playerList = useSelector((state) => state.players.playerList);
  const mrWhiteGuestId = useSelector((state) => state.playerPool.mrWhiteGuestId);
  const principalPlayer = useSelector((state) => state.playerPool.principalPlayer);
  const secondaryPlayer = useSelector((state) => state.playerPool.secondaryPlayer);
  
  const [selectedVote, setSelectedVote] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleVote = (guestId) => {
    setSelectedVote(guestId);
  };

  const handleRevealResult = () => {
    setShowResult(true);
  };

  const handleNewGame = () => {
    dispatch(resetGame());
    dispatch(resetPlayers());
    dispatch(resetPlayerPool());
    dispatch(prefetchPlayers());
  };

  const isCorrectGuess = selectedVote === mrWhiteGuestId;
  const mrWhiteGuest = playerList.find(p => p.id === mrWhiteGuestId);

  if (showResult) {
    return (
      <Card>
        <Title>🎭 Results 🎭</Title>
        
        <div style={{ 
          padding: '20px', 
          background: isCorrectGuess 
            ? 'linear-gradient(135deg, #27ae60, #2ecc71)' 
            : 'linear-gradient(135deg, #e74c3c, #c0392b)',
          borderRadius: '15px',
          marginBottom: '20px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '10px' }}>
            {isCorrectGuess ? '🎉 Correct!' : '❌ Wrong!'}
          </h2>
          <p style={{ fontSize: '1.2rem' }}>
            Mr. White was: <strong>{mrWhiteGuest?.name}</strong>
          </p>
        </div>

        <div style={{ 
          padding: '15px', 
          background: '#f8f9fa', 
          borderRadius: '10px',
          marginBottom: '15px'
        }}>
          <p style={{ color: '#7e1532', fontWeight: 'bold', marginBottom: '10px' }}>
            Principal Player (Most guests had):
          </p>
          <p style={{ fontSize: '1.1rem', color: '#333' }}>
            ⚽ {principalPlayer?.name} - {principalPlayer?.team}
          </p>
        </div>

        <div style={{ 
          padding: '15px', 
          background: '#fff3cd', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p style={{ color: '#856404', fontWeight: 'bold', marginBottom: '10px' }}>
            Mr. White's Player:
          </p>
          <p style={{ fontSize: '1.1rem', color: '#333' }}>
            🎭 {secondaryPlayer?.name} - {secondaryPlayer?.team}
          </p>
        </div>

        <Button onClick={handleNewGame} style={{ marginBottom: '10px' }}>
          🔄 New Game (New Players)
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <Title>🗳️ Vote for Mr. White</Title>
      <ProgressText>
        Who do you think has a different player?
      </ProgressText>

      {playerList.map((player) => (
        <GuestButton
          key={player.id}
          revealed={selectedVote === player.id}
          onClick={() => handleVote(player.id)}
          style={{
            background: selectedVote === player.id 
              ? 'linear-gradient(135deg, #9b59b6, #8e44ad)' 
              : 'white',
            borderColor: selectedVote === player.id ? '#8e44ad' : '#7e1532',
          }}
        >
          {player.name} {selectedVote === player.id ? '🎯' : ''}
        </GuestButton>
      ))}

      {selectedVote && (
        <Button 
          onClick={handleRevealResult}
          style={{ marginTop: '20px', background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}
        >
          🎭 Reveal Mr. White
        </Button>
      )}

      <Button
        onClick={handleNewGame}
        style={{ marginTop: '10px', background: '#95a5a6' }}
      >
        Cancel Game
      </Button>
    </Card>
  );
}

export default VotingPage;
