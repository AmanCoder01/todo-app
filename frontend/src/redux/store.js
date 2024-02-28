import { configureStore } from '@reduxjs/toolkit'
import { LoggedSlice } from './slices/IsLoggedIn'

export const store = configureStore({
  reducer: {
    app: LoggedSlice.reducer,
  },
})
