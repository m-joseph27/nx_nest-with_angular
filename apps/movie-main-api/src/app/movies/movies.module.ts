import { Module } from '@nestjs/common';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './models/movie.product'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MoviesModule {}
