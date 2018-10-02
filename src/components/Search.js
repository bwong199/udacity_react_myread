import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import {search} from '../actions/BooksAPI'
import BookList from './BookList';
import { get, getAll, update } from '../actions/BooksAPI'

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
          /**
           * TODO: Instead of using this state variable to keep track of which page
           * we're on, use the URL in the browser's address bar. This will ensure that
           * users can use the browser's back and forward buttons to navigate between
           * pages, as well as provide a good URL they can bookmark and share.
           */
          searchResults: []
        }
      }

      
    bookSearch = (queryText) => {
        search(queryText)
        .then( data => 
            this.setState({ searchResults: data})
        ).then( () => console.log(this.state.searchResults))
    }
    handleReadStatus = (bookID, status) => {
        console.log(bookID)
        console.log(status)
    
        update(bookID, status).then(data => console.log(data)).then(
          getAll().then(
            this.forceUpdate()
    
          )
        )
      }
    render() {
        return (
            <div>
                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text" onChange={event =>  this.bookSearch(event.target.value)} placeholder="Search by title or author" />
                    <div className="list-books-title">
                <h1>Search Results</h1>
                <BookList shelf="Search Results" books={this.state.searchResults} onSelectReadStatus={this.handleReadStatus} />
              </div>
                </div>
            </div>
        )
    }
}

export default Search