import { createSlice } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_SOCKET_SERVER_URL}${import.meta.env.VITE_GRAPHQL_ENDPOINT}`, // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});


const CURRENT_USER = gql`
  query GetCurrentLoggedInUser {
    getCurrentLoggedInUser {
      id
      fullName
      dateOfBirth
      mobileNumber
      email
    }
  }
`;

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.data = action.payload; // Save user data
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Save error message
    },
  },
});

// Export actions and reducer
export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} = userSlice.actions;

export default userSlice.reducer;

// Thunk to fetch user data
export const fetchLoggedInUser = () => async (dispatch) => {
  dispatch(fetchUserStart());

  try {
    const token = getTokenFromCookies('token'); // Function to get token from cookies
    const { data } = await client.query({
      query: CURRENT_USER,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      },
    });

    dispatch(fetchUserSuccess(data.getCurrentLoggedInUser));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
  }
};

// Helper function to get token from cookies
function getTokenFromCookies(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
