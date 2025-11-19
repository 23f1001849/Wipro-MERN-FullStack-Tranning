import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AuthorInfo.css';

class AuthorInfo extends Component {
  componentDidMount() {
    const { author } = this.props;
    console.log(
      author
        ? `Author profile loaded for ${author.name}`
        : 'Author profile ready — waiting for a selection.'
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.author?.name !== prevProps.author?.name) {
      console.log(
        this.props.author
          ? `Author switched to ${this.props.author.name}`
          : 'Author cleared — no selection.'
      );
    }
  }

  renderTopBooks(topBooks = []) {
    return topBooks.map((book) => <li key={book}>{book}</li>);
  }

  render() {
    const { author, bookTitle } = this.props;

    if (!author) {
      return (
        <section className="author-card empty shadow-sm">
          <p className="text-uppercase text-muted mb-2">Author Spotlight</p>
          <h2 className="h4">Select a book</h2>
          <p className="mb-0">
            Click on any book card to learn more about the mind behind the story.
          </p>
        </section>
      );
    }

    return (
      <section className="author-card shadow-sm">
        <p className="text-uppercase text-muted mb-2">Author Spotlight</p>
        <h2 className="h4 mb-2">{author.name}</h2>
        {bookTitle && (
          <p className="current-book mb-3">
            Currently exploring: <span>{bookTitle}</span>
          </p>
        )}
        <p className="author-bio">{author.bio}</p>
        <h3 className="h6 mt-4">Top books</h3>
        <ul className="list-unstyled top-books mb-0">
          {this.renderTopBooks(author.topBooks)}
        </ul>
      </section>
    );
  }
}

AuthorInfo.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    topBooks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  bookTitle: PropTypes.string,
};

AuthorInfo.defaultProps = {
  author: null,
  bookTitle: '',
};

export default AuthorInfo;
