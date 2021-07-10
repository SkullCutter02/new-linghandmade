import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

const PORT = 5000 || process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
      credentials: true,
    },
  });

  app.use(cookieParser());

  await app.listen(PORT);

  console.log(`Server started on port ${PORT}`);
}

bootstrap();
