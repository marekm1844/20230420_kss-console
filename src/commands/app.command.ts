import { Command, Console } from 'nestjs-console';
import { CommandService } from './command.service';
import { CandleChartIntervalEnum } from '../modules/candle/domain/interfaces/websocket.provider.interface';
import * as readline from 'readline';

@Console()
export class AppCommand {
  constructor(private readonly commandService: CommandService) {}

  @Command({
    command: 'analyze-candlestick <symbol> <interval>',
    description: 'Start candlestick analysis for the given symbol and interval',
  })
  async analyzeCandlestick(
    symbol: string,
    interval: CandleChartIntervalEnum,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!symbol || !interval) {
        console.error(
          'Error: Invalid arguments. Usage: analyze-candlestick <symbol> <interval>',
        );
        process.exit(1);
      }

      try {
        await this.commandService.execute(
          'analyze-candlestick',
          symbol,
          interval,
        );
        resolve();
      } catch (error) {
        reject(error);
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      console.log('Press Enter to stop the analysis.');

      rl.on('line', () => {
        console.log('Stopping the analysis...');
        rl.close();
        process.exit();
      });
    });
  }
}
