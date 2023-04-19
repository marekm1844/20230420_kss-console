// candle.module.ts
import { Module } from '@nestjs/common';
import { CandleService } from './candle.service';
import { WebSocketModule } from './infrastructure/websocket.module';
import { CandleAnalyzerModule } from './domain/candle-analyzer.module';

@Module({
  imports: [WebSocketModule, CandleAnalyzerModule],
  providers: [CandleService],
  exports: [CandleService],
})
export class CandleModule {}
