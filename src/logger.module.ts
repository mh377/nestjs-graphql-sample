import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        pinoHttp: {
          level: 'trace',
          redact: configService.get<string[]>('logger.redact.fields'),
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: false,
              singleLine: true,
              levelFirst: false,
              translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
              messageFormat: '{req.headers.x-request-id} [{context}] {msg}',
              ignore: 'pid,hostname,context,req,res.headers',
              errorLikeObjectKeys: ['err', 'error'],
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class LoggerModule {}