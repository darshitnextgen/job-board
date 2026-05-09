import { createContext, useContext, useReducer } from 'react'

const JobContext = createContext(null)

const initialState = {
    savedJobs: []
}

function jobReducer(state, action) {
    switch (action.type) {

        case 'SAVE_JOB': {
            const alreadySaved = state.savedJobs.find(
                (job) => job.id === action.payload.id
            )
            if (alreadySaved) return state
            return {
                ...state,
                savedJobs: [...state.savedJobs, action.payload]
            }
        }

        case 'REMOVE_JOB': {
            return {
                ...state,
                savedJobs: state.savedJobs.filter(
                    (job) => job.id !== action.payload
                )
            }
        }

        default:
            return state
    }
}

export function JobProvider({ children }) {
    const [state, dispatch] = useReducer(jobReducer, initialState)

    return (
        <JobContext.Provider value={{ state, dispatch }}>
            {children}
        </JobContext.Provider>
    )
}

export function useJobContext() {
    const context = useContext(JobContext)
    if (!context) {
        throw new Error('useJobContext must be used within JobProvider')
    }
    return context
}