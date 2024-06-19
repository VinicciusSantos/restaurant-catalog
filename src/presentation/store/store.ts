import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';

// const enhancer: StoreEnhancer = compose(
//   applyMiddleware(thunk as ThunkMiddleware, logger)
// );

export const store = configureStore({
    reducer: rootReducer
});
