// Initial state for authentication
export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  users: [],
  error: null,
  loading: false,
  message: null,
};

// Reducer function that handles all auth actions
// Like a state machine that updates auth based on user actions
export function authReducer(state, action) {
  switch (action.type) {
    // When user creates new account
    case "SIGNUP":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
        loading: false,
        message: null,
      };

    // When user logs in
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
        loading: false,
        message: null,
      };

    // When user logs out
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, error: null, loading: false, message: null };

    // When there's an error (wrong password, user not found, etc)
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false, message: null };

    // Set loading state
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    // Set success message
    case "SET_MESSAGE":
      return { ...state, message: action.payload, error: null };

    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };

    // Default - no change to state
    default:
      return state;
  }
}
