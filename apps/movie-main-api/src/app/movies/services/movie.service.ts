import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../models/movie.product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
  private movie: Movie[] = [];

  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async insertProduct(title: string, desc: string, author: string, created_at: Date) {
    const newMovie = new this.movieModel({
      title,
      description: desc,
      author,
      created_at
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
      created_at: movie.created_at
    }));
  }

  async getMovieByID(movieId: string) {
    const movie = await this.movieModel.findById(movieId)
    return movie;
  }

  private async findMovie(movieId: string): Promise<Movie> {
    let movie;
    try {
      movie = await this.movieModel.findById(movieId);
    } catch (error) {
      throw new NotFoundException('Movie does not exist');
    }
    if (!movie) {
      throw new NotFoundException('Movie does not exist');
    }

    return movie;
  }

}