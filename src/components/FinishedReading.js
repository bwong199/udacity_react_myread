import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import BookItem from './BookItem';

class FinishedReading extends React.Component {

    handleReadStatus = (bookID, status) => {
        this.props.onSelectReadStatus(bookID, status)
    }
    
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.length > 0 ?
                            this.props.books.map((book, index) => {
                                return (
                                    <BookItem key={index} book={book} onSelectReadStatus={this.handleReadStatus}/>
                                )
                            }): <div></div>
                        }
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default FinishedReading