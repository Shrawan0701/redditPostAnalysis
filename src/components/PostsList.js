import React, { useState } from 'react';
import '../styles/PostsList.css';

const PostsList = ({ posts }) => {
  const [sortBy, setSortBy] = useState('upvotes');
  const [filterSentiment, setFilterSentiment] = useState('all');

  if (!posts || posts.length === 0) {
    return <div className="no-posts">No posts data available</div>;
  }

  const filteredAndSortedPosts = posts
    .filter(post => filterSentiment === 'all' || post.sentiment === filterSentiment)
    .sort((a, b) => {
      switch (sortBy) {
        case 'upvotes':
          return b.upvotes - a.upvotes;
        case 'createdTime':
          return new Date(b.createdTime) - new Date(a.createdTime);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#4CAF50';
      case 'negative':
        return '#F44336';
      default:
        return '#FFC107';
    }
  };

  return (
    <div className="posts-list">
      <div className="posts-controls">
        <div className="control-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="upvotes">Upvotes</option>
            <option value="createdTime">Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="control-group">
          <label>Filter by sentiment:</label>
          <select value={filterSentiment} onChange={(e) => setFilterSentiment(e.target.value)}>
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <div className="posts-count">
          Showing {filteredAndSortedPosts.length} of {posts.length} posts
        </div>
      </div>

      <div className="posts-container">
        {filteredAndSortedPosts.map((post, index) => (
          <div key={post.id || index} className="post-card">
            <div className="post-header">
              <h3 className="post-title">{post.title || 'Untitled'}</h3>
              <div className="post-meta">
                <span className="post-author">u/{post.author}</span>
                <span className="post-date">{formatDate(post.createdTime)}</span>
                <span 
                  className="post-sentiment"
                  style={{ color: getSentimentColor(post.sentiment) }}
                >
                  {post.sentiment}
                </span>
              </div>
            </div>

            <div className="post-content">
              <p>{post.content || 'No content available'}</p>
            </div>

            <div className="post-stats">
              <div className="stat">
                <span className="stat-label">Upvotes:</span>
                <span className="stat-value">{post.upvotes}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Comments:</span>
                <span className="stat-value">{post.realCommentCount || 0}</span>
              </div>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;