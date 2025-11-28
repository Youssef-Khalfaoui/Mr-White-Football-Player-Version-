import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GuestCountPage from './pages/GuestCountPage';
import EnterNamesPage from './pages/EnterNamesPage';
import PlayerListPage from './pages/PlayerListPage';
import VotingPage from './pages/VotingPage';
import { prefetchPlayers } from './redux/slices/playerPoolSlice';

function App() {
  const dispatch = useDispatch();
  const gamePhase = useSelector((state) => state.game.gamePhase);
  const playerStatus = useSelector((state) => state.playerPool.status);

  useEffect(() => {
    if (playerStatus === 'idle') {
      dispatch(prefetchPlayers());
    }
  }, [dispatch, playerStatus]);

  return (
    <>
      {gamePhase === 'guestCount' && <GuestCountPage />}
      {gamePhase === 'enterNames' && <EnterNamesPage />}
      {gamePhase === 'playerList' && <PlayerListPage />}
      {gamePhase === 'voting' && <VotingPage />}
    </>
  );
}

export default App;