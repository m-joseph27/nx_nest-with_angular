import { HttpException, Injectable, NotAcceptableException } from '@nestjs/common';
import { Movie } from '../models/movie.product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
  private movie: Movie[] = [];

  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>
  ) {}

  async insertProduct(
    title: string,
    desc: string,
    author: string,
    created_at: Date
  ) {
    const newMovie = new this.movieModel({
      title,
      description: desc,
      author,
      created_at,
    });
    const res = await newMovie.save();
    return res;
  }

  async getAllMovies() {
    const movies = await this.movieModel.find().exec();
    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      author: movie.author,
      created_at: movie.created_at,
    }));
  }

  async getMovieByID(movieId: string) {
    const movie = await this.findMovie(movieId);
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      author: movie.author,
      created_at: movie.created_at,
    };
  }

  async updateMovie(
    _movieId: string,
    _title: string,
    _description: string,
    _author: string
    ) {
    const movie = await this.findMovie(_movieId);
    if (_title) {
      movie.title = _title;
    }
    if (_description) {
      movie.description = _description;
    }
    if (_author) {
      movie.author = _author;
    }
    movie.save();
  }

  async deleteMovie(movieId: string) {
    const movie = await this.movieModel.deleteOne({ _id: movieId });
    if (movie.n >= 1 ) {
      throw new HttpException('Movie Succesfully Deleted', 200)
    } else {
      throw new NotAcceptableException('Movie Does Not Exist!!!')
    }
  }

  private async findMovie(movieId: string): Promise<Movie> {
    let movie;
    try {
      movie = await this.movieModel.findById(movieId);
    } catch (error) {
      throw new NotAcceptableException('Could not found the movie'); 
    }
    if (!movie) {
      throw new NotAcceptableException('Could not found the movie');
    }
    return movie;
  }
}
