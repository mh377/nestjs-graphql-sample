import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './controllers/app.controller';
import { LoggerModule } from './logger.module';
import { AppResolver } from './resolvers/app.resolver';
import { AppService } from './services/app.service';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          cors: false,
          playground: configService.get<boolean>('graphql.playground'),
          autoSchemaFile: true,
      }),
      inject: [ConfigService],
    })
  
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
