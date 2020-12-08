export const loadingComments = () => {
  return (dispatch) => {
    dispatch({type: 'start'})
    fetch("https://jsonplaceholder.typicode.com/comments/?_limit=20")
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'load',
          payload: json
        })
      })
  }
}

export const removeComment = (id) => {
  return (dispatch) => {
    dispatch({type: 'start-deleting', payload: id})
    fetch(`https://jsonplaceholder.typicode.com/comments/?_limit=20${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'delete',
          payload: id
        })
      })
  }
}

export const checkComment = (id, completed) => {
  return (dispatch) => {
    dispatch({type: 'start-checking', payload: id})
    fetch(`https://jsonplaceholder.typicode.com/comments/?_limit=20${id}`, {
      method: 'PATCH',
      body: JSON.stringify({completed: !completed}),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'check',
          payload: id
        })
      })
  }
}