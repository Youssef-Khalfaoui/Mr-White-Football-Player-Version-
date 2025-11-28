import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGamePhase } from '../redux/slices/gameSlice';
import { addPlayer, removePlayer } from '../redux/slices/playersSlice';
import { assignPlayersToGuests, loadPlayersForRound, prefetchPlayers } from '../redux/slices/playerPoolSlice';
import {
  Card,
  Title,
  Input,
  Button,
  ErrorText,
  ProgressText,
  NameList,
  NameItem,
  RemoveButton,
} from '../styles/Components';

function EnterNamesPage() {
  const dispatch = useDispatch();
  const guestCount = useSelector((state) => state.game.guestCount);
  const playerList = useSelector((state) => state.players.playerList);
  const playerStatus = useSelector((state) => state.playerPool.status);
  
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const playersReady = playerStatus === 'ready';

  const handleAddPlayer = () => {
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    if (playerList.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError('Name already exists');
      return;
    }

    dispatch(addPlayer(name.trim()));
    setName('');
    setError('');
  };

  const handleRemovePlayer = (id) => {
    dispatch(removePlayer(id));
  };

  const handleContinue = async () => {
    if (playerList.length !== guestCount) {
      setError(`Please add all ${guestCount} guest names`);
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(loadPlayersForRound()).unwrap();
      dispatch(assignPlayersToGuests(playerList));
      dispatch(setGamePhase('playerList'));
      dispatch(prefetchPlayers());
    } catch (err) {
      setError('Failed to load players. Please try again.');
      dispatch(prefetchPlayers());
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <Card>
      <Title>Enter Guest Names</Title>
      <ProgressText>
        {playerList.length} of {guestCount} guests added
        {playersReady && <span style={{ color: '#27ae60', marginLeft: '10px' }}>✓ Players ready</span>}
      </ProgressText>

      <Input
        type="text"
        placeholder="Enter guest name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      {error && <ErrorText>{error}</ErrorText>}

      <Button
        onClick={handleAddPlayer}
        disabled={playerList.length >= guestCount || isLoading}
      >
        Add Guest
      </Button>

      {playerList.length > 0 && (
        <NameList>
          {playerList.map((player) => (
            <NameItem key={player.id}>
              <span>{player.name}</span>
              <RemoveButton 
                onClick={() => handleRemovePlayer(player.id)}
                disabled={isLoading}
              >
                Remove
              </RemoveButton>
            </NameItem>
          ))}
        </NameList>
      )}

      {playerList.length === guestCount && (
        <Button 
          onClick={handleContinue} 
          style={{ marginTop: '20px' }}
          disabled={isLoading}
        >
          {isLoading ? '⚽ Loading Players...' : '🎮 Start Game'}
        </Button>
      )}
    </Card>
  );
}

export default EnterNamesPage;