import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { checkComment, loadingComments, removeComment } from './actions'
import Header from './Header'
import './style.css'
import ReactLoading from 'react-loading'

function App() {
  const comments = useSelector(state => state.comments);
  const loading = useSelector(state => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingComments())
  }, []);

  const handleDelete = (id) => {
    dispatch(removeComment(id))
  };

  const handleCheck = (id, completed) => {
    dispatch(checkComment(id, completed))
  }

  return (
    <div className="comments">
      <Header />
      {loading ? 'идет загрузка...' : (
        comments.map(comment => {
          return (
            <div className="content">
              <div>
                {comment.checking ? (
                  <ReactLoading
                    type="spin"
                    color="#003399"
                    height={16}
                    width={16}
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={comment.completed}
                    onChange={() => handleCheck(comment.id, comment.completed)}
                  />
                )}

              </div>
              <div className="comment">
                <div className="name">
                  {comment.name}
                </div>
                <div className="email">
                  {comment.email}
                </div>
              </div>
              <div className="action">
                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={comment.deleting}
                >
                  delete
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  );
}

export default App;
