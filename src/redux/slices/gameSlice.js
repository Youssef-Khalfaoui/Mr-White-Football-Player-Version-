import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gamePhase: 'guestCount', // 'guestCount' | 'enterNames' | 'playerList' | 'voting' | 'result'
  guestCount: 0,
  selectedPlayer: null,
  revealedCards: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGuestCount: (state, action) => {
      state.guestCount = action.payload;
    },
    setGamePhase: (state, action) => {
      state.gamePhase = action.payload;
    },
    selectPlayerForCard: (state, action) => {
      state.selectedPlayer = action.payload;
    },
    markCardRevealed: (state, action) => {
      if (!state.revealedCards.includes(action.payload)) {
        state.revealedCards.push(action.payload);
      }
    },
    resetGame: () => {
      return initialState;
    },
  },
});

export const {
  setGuestCount,
  setGamePhase,
  selectPlayerForCard,
  markCardRevealed,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;