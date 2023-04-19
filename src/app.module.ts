import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { AppCommand } from './commands/app.command';
import { CommandModule } from './commands/command.module';

@Module({
  imports: [ConsoleModule, CommandModule],
  providers: [AppCommand],
})
export class AppModule {}
