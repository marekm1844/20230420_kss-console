// candle-analyzer.module.ts
import { Module } from '@nestjs/common';
import { CandleAnalyzerService } from './services/candle.analyzer.service';

@Module({
  providers: [CandleAnalyzerService],
  exports: [CandleAnalyzerService],
})
export class CandleAnalyzerModule {}
