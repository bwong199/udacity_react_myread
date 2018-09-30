import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import FinishedReading from './FinishedReading';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { get, getAll, update, search } from '../actions/BooksAPI'

class App extends React.Component {


  constructor() {
    super();
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

    update(bookID,status).then(data => console.log(data))

    getAll().then(data => this.setState({ books: data }, function () {
      console.log(this.state)
      this.forceUpdate()
    }))
  }

  getAllBooks() {
    getAll()
    .then(data => this.setState({ books: data }, function () {

      console.log(data);

      const currentlyReading =  data.filter(book => book.shelf == "currentlyReading")
      
      this.setState({currentlyReading})
      const wantToRead =  data.filter(book => book.shelf == "wantToRead")

      this.setState({wantToRead})

      const finishedReading =  data.filter(book => book.shelf == "read")

      this.setState({finishedReading})
    }))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={event => console.log(event.target.value)} placeholder="Search by title or author" />

              </div>
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
                <CurrentlyReading books={this.state.currentlyReading} onSelectReadStatus={this.handleReadStatus} />
                <WantToRead books={this.state.wantToRead} onSelectReadStatus={this.handleReadStatus} />
                <FinishedReading books={this.state.finishedReading} onSelectReadStatus={this.handleReadStatus} />
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