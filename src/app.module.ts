import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const userDB = configService.get<string>('DB_USERNAME');
        const passwordDB = configService.get<string>('DB_PASSWORD');
        const nameDB = configService.get<string>('DB_NAME');

        return {
          uri: `mongodb+srv://${userDB}:${passwordDB}@cluster0.m4q9c.mongodb.net/${nameDB}?retryWrites=true&w=majority`,
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    BooksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
