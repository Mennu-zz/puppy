import { Container } from 'inversify';
import TYPES from './constants/types';
import { FlightsController } from './controllers/flights.controller';
import { FlightService } from './services/flight.service';
import { DiscoveryStubClient } from './client/discovery-stub.client';
export class ContainerLoader {
    public static load(): Container {
        const container = new Container();
        container.bind<FlightsController>(TYPES.FlightsController).to(FlightsController);
        container.bind<FlightService>(TYPES.FlightService).to(FlightService);
        container.bind<DiscoveryStubClient>(TYPES.DiscoveryStubClient).to(DiscoveryStubClient);
        return container;
    }
}