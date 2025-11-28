import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayerForCard,
  markCardRevealed,
  resetGame,
  setGamePhase,
} from '../redux/slices/gameSlice';
import { resetPlayers } from '../redux/slices/playersSlice';
import { resetPlayerPool } from '../redux/slices/playerPoolSlice';
import {
  Card,
  Title,
  Button,
  ProgressText,
  GuestButton,
  PlayerCard,
  PlayerCardModal,
  PlayerImage,
  PlayerImageContainer,
  PlayerName,
  PlayerStats,
  StatItem,
  PositionBadge,
  CardHeader,
  Overlay,
  CloseHint,
} from '../styles/Components';

function PlayerListPage() {
  const dispatch = useDispatch();
  const playerList = useSelector((state) => state.players.playerList);
  const playerAssignments = useSelector(
    (state) => state.playerPool.playerAssignments
  );
  const revealedCards = useSelector((state) => state.game.revealedCards);
  const selectedPlayer = useSelector((state) => state.game.selectedPlayer);
  
  const [isClosing, setIsClosing] = useState(false);
  const [displayedPlayer, setDisplayedPlayer] = useState(null);

  const allCardsRevealed = revealedCards.length === playerList.length && playerList.length > 0;

  // Auto-navigate to voting when all cards are revealed
  useEffect(() => {
    if (allCardsRevealed && !selectedPlayer && !isClosing) {
      // Small delay to let user see all cards revealed
      const timer = setTimeout(() => {
        dispatch(setGamePhase('voting'));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [allCardsRevealed, selectedPlayer, isClosing, dispatch]);

  const handlePlayerClick = (player) => {
    // Don't allow re-clicking already revealed cards
    if (revealedCards.includes(player.id) && selectedPlayer?.id !== player.id) {
      return;
    }

    if (selectedPlayer?.id === player.id) {
      handleCloseCard();
    } else {
      // Set the displayed player immediately for opening
      const footballPlayer = playerAssignments[player.id];
      if (footballPlayer) {
        setDisplayedPlayer(footballPlayer);
        setIsClosing(false);
      }
      dispatch(selectPlayerForCard(player));
      if (!revealedCards.includes(player.id)) {
        dispatch(markCardRevealed(player.id));
      }
    }
  };

  const handleCloseCard = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(selectPlayerForCard(null));
      setIsClosing(false);
      setDisplayedPlayer(null);
    }, 500);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start a new game?')) {
      dispatch(resetGame());
      dispatch(resetPlayers());
      dispatch(resetPlayerPool());
    }
  };

  const handleGoToVoting = () => {
    dispatch(setGamePhase('voting'));
  };

  const showModal = displayedPlayer && (selectedPlayer || isClosing);

  return (
    <>
      {showModal && displayedPlayer && (
        <>
          <Overlay 
            className={isClosing ? 'exiting' : 'entering'} 
            onClick={handleCloseCard} 
          />
          <PlayerCardModal 
            className={isClosing ? 'exiting' : 'entering'} 
            onClick={handleCloseCard}
          >
            <PlayerCard>
              <CardHeader>
                <h2>⚽ Your Player ⚽</h2>
              </CardHeader>
              
              <PlayerImageContainer>
                <PlayerImage
                  src={displayedPlayer.image}
                  alt={displayedPlayer.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Player';
                  }}
                />
              </PlayerImageContainer>
              
              <PlayerName>{displayedPlayer.name}</PlayerName>
              <PositionBadge>{displayedPlayer.position}</PositionBadge>
              
              <PlayerStats>
                <StatItem>
                  <div className="stat-icon">🏟️</div>
                  <div className="stat-label">Team</div>
                  <div className="stat-value">{displayedPlayer.team}</div>
                </StatItem>
                <StatItem>
                  <div className="stat-icon">🌍</div>
                  <div className="stat-label">Country</div>
                  <div className="stat-value">{displayedPlayer.country}</div>
                </StatItem>
                <StatItem>
                  <div className="stat-icon">🎂</div>
                  <div className="stat-label">Age</div>
                  <div className="stat-value">{displayedPlayer.age} years</div>
                </StatItem>
                <StatItem>
                  <div className="stat-icon">🔢</div>
                  <div className="stat-label">ID</div>
                  <div className="stat-value">#{displayedPlayer.id}</div>
                </StatItem>
              </PlayerStats>
              
              <CloseHint>✨ Tap anywhere to close ✨</CloseHint>
            </PlayerCard>
          </PlayerCardModal>
        </>
      )}

      <Card dimmed={showModal}>
        <Title>Click Your Name to Reveal</Title>
        <ProgressText>
          {revealedCards.length} of {playerList.length} cards revealed
          {allCardsRevealed && ' ✅'}
        </ProgressText>

        {playerList.map((player) => {
          const isRevealed = revealedCards.includes(player.id);

          return (
            <div key={player.id}>
              <GuestButton
                revealed={isRevealed}
                onClick={() => handlePlayerClick(player)}
                style={{ 
                  opacity: isRevealed && selectedPlayer?.id !== player.id ? 0.7 : 1,
                  cursor: isRevealed && selectedPlayer?.id !== player.id ? 'default' : 'pointer'
                }}
              >
                {player.name} {isRevealed ? '✓' : '?'}
              </GuestButton>
            </div>
          );
        })}

        {allCardsRevealed && (
          <Button
            onClick={handleGoToVoting}
            style={{ marginTop: '20px', background: 'linear-gradient(135deg, #3498db, #2980b9)' }}
          >
            🗳️ Go to Voting
          </Button>
        )}

        <Button
          onClick={handleReset}
          style={{ marginTop: '10px', background: '#e74c3c' }}
        >
          New Game
        </Button>
      </Card>
    </>
  );
}

export default PlayerListPage;