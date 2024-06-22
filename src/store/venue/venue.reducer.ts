import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { Venue } from "../../domain/models";
import { usecasesFactory } from "../../main";

export interface VenueState {
  venue: Venue | null;
  loading: boolean;
}

const initialState: VenueState = {
  venue: null,
  loading: false,
};

const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    fetchVenueStart: (state) => {
      state.loading = true;
    },
    fetchVenueSuccess: (state, action: PayloadAction<Venue>) => {
      state.venue = action.payload;
      state.loading = false;
    },
    fetchVenueFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchVenueStart, fetchVenueSuccess, fetchVenueFailure } =
  venueSlice.actions;
export const venueReducer = venueSlice.reducer;

export const fetchVenue = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchVenueStart());
    const getVenueUsecase = usecasesFactory.venue.makeGetVenueUsecase();
    const data = await getVenueUsecase.execute();
    dispatch(fetchVenueSuccess(data));
  } catch (error) {
    dispatch(fetchVenueFailure());
    console.error("Erro ao buscar dados do venue:", error);
  }
};
