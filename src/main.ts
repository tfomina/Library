import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TranfrormInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TranfrormInterceptor());
  await app.listen(3000);
}
bootstrap();
