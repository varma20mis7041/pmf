import {configureStore} from '@reduxjs/toolkit'
import fetchTemplatesSliceReducer from './fetchTemplatesSlice'

export const store = configureStore({
    reducer : {
        templates : fetchTemplatesSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;