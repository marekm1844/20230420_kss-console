// candle.dto.ts
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CandleDto {
  @IsDate()
  openTime: Date;

  @IsNumber()
  open: number;

  @IsNumber()
  high: number;

  @IsNumber()
  low: number;

  @IsNumber()
  close: number;

  @IsNumber()
  volume: number;

  @IsDate()
  closeTime: Date;

  @IsNumber()
  quoteAssetVolume: number;

  @IsNumber()
  numberOfTrades: number;

  @IsNumber()
  takerBuyBaseAssetVolume: number;

  @IsNumber()
  takerBuyQuoteAssetVolume: number;

  @IsString()
  symbol: string;
}
