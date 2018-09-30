import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import {search} from '../actions/BooksAPI'

class Search extends React.Component {

    bookSearch = (queryText) => {
        console.log(queryText);

        search().then( data => console.log(data))
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

                </div>
            </div>
        )
    }
}

export default Search