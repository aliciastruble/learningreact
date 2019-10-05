import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Paginator from "./common/pagination";
import { paginate } from "../utilities/paginate";
import GenreFilter from "./common/genreFilter";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movieId => {
    this.setState({
      movies: this.state.movies.filter(movie => movie._id !== movieId)
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePaginate = pageIndex => {
    this.setState({ currentPage: pageIndex });
  };

  handleFilterGenre = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const pagedMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: pagedMovies };
  };

  renderTable() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    if (this.state.movies.length > 0) {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-2">
                <GenreFilter
                  items={genres}
                  selectedItem={selectedGenre}
                  onItemSelect={this.handleFilterGenre}
                />
              </div>
              <div className="col">
                <p>Showing {totalCount} movies in database.</p>
                <MoviesTable
                  movies={movies}
                  sortColumn={sortColumn}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
                <Paginator
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  curPage={currentPage}
                  changePage={this.handlePaginate}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <div>
        <div>{this.renderTable()}</div>
      </div>
    );
  }
}

export default Movies;
