import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playMode: false,
}

const featureSlice = createSlice({
    name: "feature",
    initialState,
    reducers: {
        togglePlayMode: (state) => {
            state.playMode = !state.playMode;
        },
    },
});

export const { togglePlayMode } = featureSlice.actions;
export default featureSlice.reducer;
