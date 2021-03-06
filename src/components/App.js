import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { get, getAll, update } from '../actions/BooksAPI'
import Search from './Search';
import BookList from './BookList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      books: [],
      currentlyReading: [],
      wantToRead: [],
      finishedReading: []
    }

    this.handleReadStatus = this.handleReadStatus.bind(this);
  }

  getToken = () => {
    let token = localStorage.token
    if (!token) {
      token = localStorage.token = Math.random().toString(36).substr(-8)
    }

    return token;
  }

  componentDidMount() {
    this.getAllBooks();
  }

  handleReadStatus = (bookID, status) => {
    console.log(bookID)
    console.log(status)

    update(bookID, status).then(data => console.log(data)).then(this.getAllBooks())
  }

  getAllBooks() {
    let self = this;
    getAll().then(
      function(data){
        debugger;
        self.setState({
          currentlyReading: data.filter(book => book.shelf == "currentlyReading"),
          wantToRead: data.filter(book => book.shelf == "wantToRead"),
          finishedReading: data.filter(book => book.shelf == "read")
        })
      }
    ).then(
      () => {
        console.log(this.state);
      }
    )
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <Search />
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
              <div className="list-books-title">
                <h1>MyReads</h1>
                <BookList shelf="Currently Reading" books={this.state.currentlyReading} onSelectReadStatus={this.handleReadStatus} />
                <BookList shelf="Want to Read" books={this.state.wantToRead} onSelectReadStatus={this.handleReadStatus} />
                <BookList shelf="Read" books={this.state.finishedReading} onSelectReadStatus={this.handleReadStatus} />
              </div>
              <div className="list-books-content">
                <div>
                </div>
              </div>

            </div>
          )}
      </div>
    )
  }
}
export default App