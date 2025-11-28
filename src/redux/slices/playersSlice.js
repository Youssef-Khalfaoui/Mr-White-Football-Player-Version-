import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playerList: [], // Array of guests { id, name }
  playerCount: 0, // Maximum number of guests
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayerCount: (state, action) => {
      state.playerCount = action.payload;
    },
    addPlayer: (state, action) => {
      state.playerList.push({
        id: Date.now(),
        name: action.payload,
      });
    },
    removePlayer: (state, action) => {
      state.playerList = state.playerList.filter(
        (player) => player.id !== action.payload
      );
    },
    resetPlayers: (state) => {
      state.playerList = [];
      state.playerCount = 0;
    },
  },
});

export const { setPlayerCount, addPlayer, removePlayer, resetPlayers } =
  playersSlice.actions;

export default playersSlice.reducer;