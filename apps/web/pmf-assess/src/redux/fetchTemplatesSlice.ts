import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTemplates = createAsyncThunk(
    'templates/fetchTemplates',
    async ()=>{
        const templatesResponse = await fetch('http://localhost:4000/api/templates/get-templates',{
            method : "GET",
            headers : {
                'Content-type' : 'application/json'
            }
        });

        const result = await templatesResponse.json();
        if(!templatesResponse.ok){
            throw new Error('Error in fetching templates')
        }
        return result.templates;
    }
)

export interface Template{
    templates : [],
    status : string,
    error : string
}

const initialState : Template = {
    templates : [],
    status : 'idle',
    error : ''
}


const fetchTemplatesSlice = createSlice({
    name : 'templates',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(fetchTemplates.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchTemplates.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.templates = action.payload;
        })
        .addCase(fetchTemplates.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message || 'Error in fetching templates';
        })
    }
})

export default fetchTemplatesSlice.reducer;