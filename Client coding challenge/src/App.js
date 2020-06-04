import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      apiUrl : "https://www.googleapis.com/books",
      response : {}
    }
  }

  handleSearch = (event) => {
    event.preventDefault();

    const searchTerm = event.currentTarget.searchBox.value;

    const url = `${this.state.apiUrl}/v1/volumes?q=${searchTerm}`;

    const settings = {
      method : 'GET'
    };

    fetch(url, settings)
      .then(response => {
        if( response.ok ){
          return response.json();
        }
        throw new Error( response.statusText );
      })
      .then( responseJSON => {
        console.log(responseJSON);
        this.state.response = responseJSON;
      })
      .catch(err => {
        console.log(err);
      })
  };

  render(){
    return(
      <div>
        <form onSubmit={this.handleSearch}>
          <div>
            <input type="text" name="searchBox" id="searchBox"/>
          </div>
          <button type="submit">
            Search
          </button>
        </form>
        <section>
          
        </section>
        <p>

        </p>
      </div>
    )
  }

}

export default App;
