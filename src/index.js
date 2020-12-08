import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  comments: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'start':
      return {
        ...state,
        loading: true
      }

    case 'load':
      return {
        ...state,
        comments: action.payload,
        loading: false
      }

    case 'start-deleting':
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.payload) {
            return {
              ...comment,
              deleting: true
            }
          }

          return comment;
        })
      }

    case 'delete':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload)
      }

    case 'start-checking':
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.payload) {
            return {
              ...comment,
              checking: true
            }
          }

          return comment;
        })
      }

    case 'check':
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.payload) {
            return {
              ...comment,
              completed: !comment.completed,
              checking: false
            }
          }

          return comment;
        })
      }

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);