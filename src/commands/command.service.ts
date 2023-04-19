import { Inject, Injectable, Logger } from '@nestjs/common';
import { CandleService } from '../modules/candle/candle.service';
import { CandleChartIntervalEnum } from '../modules/candle/domain/interfaces/websocket.provider.interface';

@Injectable()
export class CommandService {
  constructor(
    @Inject(CandleService) private readonly candleService: CandleService,
  ) {}

  async execute(command: string, ...args: string[]): Promise<string> {
    switch (command) {
      case 'analyze-candlestick':
        if (args.length < 2) {
          return 'Error: Insufficient arguments. Usage: analyze-candlestick <symbol> <interval>';
        }

        const symbol = args[0];
        const interval = args[1] as CandleChartIntervalEnum;

        Logger.log(
          `Starting analysisfor symbol: ${symbol}, interval: ${interval}`,
        );

        const validIntervals: CandleChartIntervalEnum[] = [
          CandleChartIntervalEnum.ONE_MINUTE,
          CandleChartIntervalEnum.THREE_MINUTES,
          CandleChartIntervalEnum.ONE_HOUR,
          CandleChartIntervalEnum.ONE_DAY,
        ];

        if (!validIntervals.includes(interval as CandleChartIntervalEnum)) {
          return 'Error: Invalid interval. Allowed intervals are: 1m, 3m, 1h, 1d';
        }

        try {
          await this.candleService.startCandlestickAnalysis(symbol, interval);
        } catch (error) {
          console.error('Error while analyzing candlestick data:', error);
        }

      // Add more command cases here as needed

      default:
        return 'Error: Unknown command';
    }
  }
}
