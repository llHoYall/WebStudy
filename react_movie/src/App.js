import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

const movieTitles = [
  "Avengers: Infinity War"
]

const movieImages = [
  "https://ia.media-imdb.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movie title={movieTitles[0]} poster={movieImages[0]} />
      </div>
    );
  }
}

export default App;
