import { Injectable, Logger } from '@nestjs/common';
import {
  CandleChartIntervalEnum,
  IWebSocketProvider,
} from '../../domain/interfaces/websocket.provider.interface';
import Binance, { Candle } from 'binance-api-node';
import { Readable } from 'stream';
import { CandleDto } from '../../dtos/candle.dto';
import { validate } from 'class-validator';

@Injectable()
export class BinanceWebSocketProvider implements IWebSocketProvider {
  private client = Binance();

  async getKlinesStream(
    symbol: string,
    interval: CandleChartIntervalEnum,
  ): Promise<Readable> {
    const { Readable } = await import('stream');

    return new Promise((resolve) => {
      const stream = new Readable({
        objectMode: true,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        read() {},
      });

      this.client.ws.candles(symbol, interval, async (candle: Candle) => {
        if (candle.isFinal) {
          const candleData = this.mapCandleToDto(candle);
          const candleDto = new CandleDto();
          Object.assign(candleDto, candleData);

          // Validate the CandleDto
          const errors = await validate(candleDto);

          if (errors.length > 0) {
            console.error('CandleDto validation failed:', errors);
            return;
          }

          stream.push(candleDto);
        }
      });

      resolve(stream);
    });
  }

  private mapCandleToDto(candle: any): Partial<CandleDto> {
    return {
      openTime: new Date(candle.startTime),
      open: parseFloat(candle.open),
      high: parseFloat(candle.high),
      low: parseFloat(candle.low),
      close: parseFloat(candle.close),
      volume: parseFloat(candle.volume),
      closeTime: new Date(candle.closeTime),
      quoteAssetVolume: parseFloat(candle.quoteVolume),
      numberOfTrades: candle.trades,
      takerBuyBaseAssetVolume: parseFloat(candle.buyVolume),
      takerBuyQuoteAssetVolume: parseFloat(candle.quoteBuyVolume),
      symbol: candle.symbol,
    };
  }
}
