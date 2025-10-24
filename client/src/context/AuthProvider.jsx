import { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import * as api from '../api';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  user: null,
  isLoading: true
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload,
        isAuth: true,
        isLoading: false
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isLoading: false
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuth: false,
        user: null,
        isLoading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount
  useEffect(() => {
    if (state.token) {
      loadUser();
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await api.getMe();
      dispatch({ type: 'USER_LOADED', payload: data.user });
    } catch (error) {
      console.error('Load user error:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await api.login(credentials);
      localStorage.setItem('token', data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.token });
      await loadUser();
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await api.register(userData);
      localStorage.setItem('token', data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.token });
      await loadUser();
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const refreshUser = async () => {
    try {
      const { data } = await api.getMe();
      dispatch({ type: 'USER_LOADED', payload: data.user });
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    refreshUser,
    loadUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
