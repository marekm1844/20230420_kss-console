import { Module } from '@nestjs/common';
import { CandleModule } from '../modules/candle/candle.module';
import { CommandService } from './command.service';
import { ConsoleModule } from 'nestjs-console';
import { AppCommand } from './app.command';

@Module({
  imports: [ConsoleModule, CandleModule],
  providers: [CommandService, AppCommand],
})
export class CommandModule {}
