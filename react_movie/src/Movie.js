import React, { Component } from 'react';
import './Movie.css';

class Movie extends Component {
	render() {
		return (
			<div>
				<MoviePoster />
				<h1> Hello Movie App</h1>
			</div>
		);
	}
}

class MoviePoster extends Component {
	render() {
		return (
			<img src="https://ia.media-imdb.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
		);
	}
}

export default Movie;