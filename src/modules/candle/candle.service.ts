import { Inject, Injectable } from '@nestjs/common';
import {
  CandleChartIntervalEnum,
  IWebSocketProvider,
  WEB_SOCKET_PROVIDER,
} from './domain/interfaces/websocket.provider.interface';
import { CandleAnalyzerService } from './domain/services/candle.analyzer.service';
import { CandleDto } from './dtos/candle.dto';

@Injectable()
export class CandleService {
  constructor(
    @Inject(WEB_SOCKET_PROVIDER)
    private readonly webSocketProvider: IWebSocketProvider,
    @Inject(CandleAnalyzerService)
    private readonly candleAnalyzerService: CandleAnalyzerService,
  ) {}

  async startCandlestickAnalysis(
    symbol: string,
    interval: CandleChartIntervalEnum,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const stream = await this.webSocketProvider.getKlinesStream(
        symbol,
        interval,
      );

      stream.on('data', (candle: CandleDto) => {
        const analysisResult = this.candleAnalyzerService.analyze(candle);
        //format analysis result to 7 decimal places
        const formatted = (analysisResult.priceDifference = parseFloat(
          analysisResult.priceDifference.toFixed(7),
        ));

        console.log('Analysis result:', formatted);
        resolve(analysisResult);
      });

      stream.on('error', (error) => {
        console.error('Error in candlestick analysis stream:', error);
        reject(error);
      });

      stream.on('end', () => {
        console.log('Candlestick analysis stream ended.');
      });
    });
  }
}
