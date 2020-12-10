import {
  Controller,
  Post,
  Body,
  Get,
  Param
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';

@Controller('movies')
export class MovieController {
  
  constructor( private movieService: MovieService) {}

  @Post()
  async addMovie(
    @Body('title') movieTitle: string,
    @Body('description') movieDesc: string,
    @Body('author') movieAuthor: string,
  ) {
    const created_at = new Date;
    const data = await this.movieService.insertProduct(
      movieTitle,
      movieDesc,
      movieAuthor,
      created_at
    );
    return {
      message: 'Movie has been succesfully added',
      data,
      created_at
    };
  }

  @Get()
  async getAllMovies() {
    const movies = await this.movieService.getAllMovies();
    return movies;
  }

  @Get('id')
  async getMovieID(@Param('id') id) {
    const movie = await this.movieService.getMovieByID(id);
    return movie;
  }

}