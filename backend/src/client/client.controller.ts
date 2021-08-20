import { Controller, Get, Render } from '@nestjs/common';

@Controller('client')
export class ClientController {
  constructor() {}

  @Get()
  @Render('index')
  root() {}
}
