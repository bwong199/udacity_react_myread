import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import {get, getAll, update, search } from '../actions/BooksAPI'

class BookItem extends React.Component {

    handleReadStatus = (event) => {
        let status = event.target.value;
        const bookID = this.props.book.id;

        this.props.onSelectReadStatus(bookID, status)
        // console.log(this.props.book.id);
      }

    render() {

        return (
            <div>
                <li>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`  }}></div>
                            <div className="book-shelf-changer">
                                <select onChange={this.handleReadStatus}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value=""> </option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{this.props.book.title} </div>

                          {
                            this.props.book.authors ? this.props.book.authors.map((author, index) => {
                                return (
                                    <div key={index} className="book-authors">{author}</div>    
                                    )
                            }): <div/>
                        }
                    </div>
                </li>
            </div>
        )
    }
}

export default BookItem