import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { Menu } from "../../../domain/models";
import { usecasesFactory } from "../../../main";

export interface MenuState {
  menu: Menu | null;
  loading: boolean;
}

const initialState: MenuState = {
  menu: null,
  loading: false,
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
      state.loading = false;
    },
    fetchMenuFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchMenuStart, fetchMenuSuccess, fetchMenuFailure } =
  menuSlice.actions;

export const menuReducer = menuSlice.reducer;

export const fetchMenu = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchMenuStart());
    const getMenuUsecase = usecasesFactory.menu.makeGetMenuUsecase();
    const data = await getMenuUsecase.execute();
    dispatch(fetchMenuSuccess(data));
  } catch (error) {
    dispatch(fetchMenuFailure());
    console.error("Erro ao buscar dados do menu:", error);
  }
};
