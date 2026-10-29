import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatsModule } from './modules/cats/cats.module.js';
import { CatsController } from './modules/cats/cats.controller.js';

import { LoggerMiddleware, noClassLoger } from './middlewares/index.js';
import { DogsModule } from './modules/dogs/dogs.module.js';
import { provideAuthGuard } from './guards/auth/auth.guard.js';

@Module({
  imports: [CatsModule, DogsModule],
  controllers: [AppController],
  providers: [AppService, provideAuthGuard()],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware, noClassLoger).forRoutes(CatsController);
  }
}
