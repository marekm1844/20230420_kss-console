import { Injectable, Logger } from '@nestjs/common';
import { CandleDto } from '../../dtos/candle.dto';

@Injectable()
export class CandleAnalyzerService {
  analyze(candleData: CandleDto): { symbol: string; priceDifference: number } {
    Logger.log('CandleAnalyzerService candle data:', candleData.open);
    const priceDifference = candleData.open - candleData.close;

    return {
      symbol: candleData.symbol,
      priceDifference,
    };
  }
}
