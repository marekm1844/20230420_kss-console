import { NestFactory } from '@nestjs/core';
import { CommandModule } from './commands/command.module';
import { AppCommand } from './commands/app.command';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CommandModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'], // enable all logs);
  });

  const appCommand = app.get(AppCommand);

  try {
    await appCommand.analyzeCandlestick(
      process.argv[3],
      process.argv[4] as any,
    );
  } catch (error) {
    console.error('Error executing command:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
