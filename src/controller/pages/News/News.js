import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const MediaPage  = () => {
  const [mediaList, setMediaList] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [commentVisibleIndex, setCommentVisibleIndex] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchedComments, setFetchedComments] = useState({});

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('http://localhost:8080/media');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMediaList(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleCommentVisibility = async (index, mediaId) => {
    if (commentVisibleIndex === index) {
      setCommentVisibleIndex(null);
    } else {
      setCommentVisibleIndex(index);
      if (!fetchedComments[mediaId]) {
        try {
          const response = await axios.get(`http://localhost:8080/action/${mediaId}/comment`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });
          setFetchedComments((prevComments) => ({
            ...prevComments,
            [mediaId]: response.data,
          }));
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    }
  };

  const handleLike = async (id) => {
    await updateMediaInteraction(id, 'like');
  };

  const handleDislike = async (id) => {
    await updateMediaInteraction(id, 'dislike');
  };

  const updateMediaInteraction = async (id, action) => {
    try {
      const response = await fetch(`http://localhost:8080/media/${id}/${action}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await fetch('http://localhost:8080/media');
      const newData = await data.json();
      setMediaList(newData || []);
    } catch (error) {
      console.error('Error updating media interaction:', error.message);
      setErrorMessage(error.message);
    }
  };

  const handleCommentSubmit = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/action/${id}/comment`,
        { text: commentText[id] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );

      // Assuming the response returns the newly created comment
      const newComment = response.data; 

      // Update fetched comments immediately
      setFetchedComments((prevComments) => ({
        ...prevComments,
        [id]: [newComment, ...(prevComments[id] || [])],
      }));

      // Reset the comment text input
      setCommentText((prevCommentText) => ({
        ...prevCommentText,
        [id]: '',
      }));
    } catch (error) {
      console.error('There was an error submitting the comment!', error);
      setErrorMessage(error.response?.data?.message || 'Submission failed. Please try again.');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {Array.isArray(mediaList) && mediaList.length > 0 ? (
        mediaList.map((media, index) => (
          <article
            key={media.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              margin: '10px 0',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <video controls style={{ width: '100%', borderRadius: '5px' }}>
                  <source src={`path/to/media/${media.filename}`} type={media.mimetype} />
                  Your browser does not support the video tag.
                </video>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                    <div onClick={() => handleLike(media.id)} style={{ cursor: 'pointer', marginRight: '20px' }}>
                      <FontAwesomeIcon icon={faThumbsUp} /> ({media.likes})
                    </div>
                    <div onClick={() => handleDislike(media.id)} style={{ cursor: 'pointer', marginRight: '20px' }}>
                      <FontAwesomeIcon icon={faThumbsDown} /> ({media.dislikes})
                    </div>
                    <div onClick={() => toggleCommentVisibility(index, media.id)} style={{ cursor: 'pointer', marginRight: '20px' }}>
                      <FontAwesomeIcon icon={faComment} />
                    </div>
                  </div>
                  {commentVisibleIndex === index && (
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleCommentSubmit(media.id);
                        }}
                        style={{ display: 'flex', marginTop: '10px' }}
                      >
                        <input
                          type="text"
                          value={commentText[media.id] || ''}
                          onChange={(e) =>
                            setCommentText({ ...commentText, [media.id]: e.target.value })
                          }
                          placeholder="Add a comment..."
                          style={{
                            flex: 1,
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            marginRight: '5px',
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                          disabled={!commentText[media.id]}
                        >
                          Add
                        </button>
                      </form>
                      <div style={{ marginTop: '10px' }}>
                        <h4>Comments:</h4>
                        <ul style={{ padding: '0', listStyleType: 'none' }}>
                          {fetchedComments[media.id] && fetchedComments[media.id].length > 0 ? (
                            fetchedComments[media.id].map((comment) => (
                              <li
                                key={comment.id}
                                style={{
                                  margin: '5px 0',
                                  padding: '5px',
                                  backgroundColor: '#f8f8f8',
                                  borderRadius: '5px',
                                }}
                              >
                                {comment.text}
                              </li>
                            ))
                          ) : (
                            <li>No comments yet.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginLeft: '20px', flex: '1' }}>
                <h2 style={{ margin: '0', fontSize: '1.5em' }}>{media.title}</h2>
                <div style={{ margin: '10px 0' }}>
                  {expandedIndex === index
                    ? media.description.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    : media.description.length > 1500
                    ? `${media.description.substring(0, 1500)}...`
                    : media.description}
                  {media.description.length > 1500 && (
                    <span
                      onClick={() => toggleDescription(index)}
                      style={{ color: '#007bff', cursor: 'pointer' }}
                    >
                      {expandedIndex === index ? ' Read Less' : ' Read More'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div style={{ textAlign: 'center', fontSize: '20px' }}>No media available.</div>
      )}
      {errorMessage && (
        <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default MediaPage ;
