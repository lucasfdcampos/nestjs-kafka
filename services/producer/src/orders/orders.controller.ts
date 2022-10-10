import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer,
  ) {}

  @Post()
  async create(@Body() body: any): Promise<void> {
    await this.kafkaProducer.send({
      topic: 'orders3',
      messages: [{ key: 'orders3', value: JSON.stringify(body) }],
    });
    console.log('Producer', body);
  }
}
