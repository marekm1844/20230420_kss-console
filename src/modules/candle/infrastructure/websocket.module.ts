// websocket.module.ts
import { Module } from '@nestjs/common';
import { BinanceWebSocketProvider } from './providers/binance.websocket.provider';
import { WEB_SOCKET_PROVIDER } from '../domain/interfaces/websocket.provider.interface';

@Module({
  providers: [
    {
      provide: WEB_SOCKET_PROVIDER,
      useClass: BinanceWebSocketProvider,
    },
  ],
  exports: [WEB_SOCKET_PROVIDER],
})
export class WebSocketModule {}
