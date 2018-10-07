import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import BookItem from './BookItem';
class BookList extends React.Component {

    handleReadStatus = (bookID, status) => {
        this.props.onSelectReadStatus(bookID, status)
    }

    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.shelf}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            this.props.books && this.props.books.length > 0 ?
                            this.props.books.map((book, index) => {
                                return (
                                    <BookItem key={book.id} book={book} onSelectReadStatus={this.handleReadStatus}/>
                                )
                            }): 
                            <div>
                                <p>No book in "{this.props.shelf}"</p>

                            </div>
                        }
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookList