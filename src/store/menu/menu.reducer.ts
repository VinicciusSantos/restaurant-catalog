import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { Menu } from "../../domain/models";
import { usecasesFactory } from "../../main";
import { UnknownAction } from "redux";

export interface MenuState {
  menu: Menu | null;
  loading: boolean;
  openSections: string[];
}

const initialState: MenuState = {
  menu: null,
  loading: false,
  openSections: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    fetchMenuStart: (state) => {
      state.loading = true;
    },
    fetchMenuSuccess: (state, action: PayloadAction<Menu>) => {
      state.menu = action.payload;
      state.openSections = action.payload.sections.map((section) =>
        section.id.toString()
      );
      state.loading = false;
    },
    fetchMenuFailure: (state) => {
      state.loading = false;
    },
    syncOpenSections: (state, action: PayloadAction<string[]>) => {
      state.openSections = action.payload;
    },
  },
});

export const {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
  syncOpenSections,
} = menuSlice.actions;

export const menuReducer = menuSlice.reducer;

export const fetchMenu = () =>
  (async (dispatch: Dispatch) => {
    try {
      dispatch(fetchMenuStart());
      const getMenuUsecase = usecasesFactory.menu.makeGetMenuUsecase();
      const data = await getMenuUsecase.execute();
      dispatch(fetchMenuSuccess(data));
    } catch (error) {
      dispatch(fetchMenuFailure());
    }
  }) as unknown as UnknownAction;
