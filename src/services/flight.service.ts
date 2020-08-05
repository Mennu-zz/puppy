import { injectable, inject } from "inversify"
import {DiscoveryStubClient } from '../client/discovery-stub.client';
import { FlightListDto } from '../dtos/flightList.dto';
import { IFlightService, IFlightListResponse, IDiscoveryStubResponse } from '../interfaces/flight.interfaces';
import TYPES from '../constants/types';

@injectable()
export class FlightService implements IFlightService {
    
    constructor(@inject(TYPES.DiscoveryStubClient) private discoveryStubClient: DiscoveryStubClient) {}

    public async getFlightList(): Promise<IFlightListResponse> {
        let sourceData: IDiscoveryStubResponse[] = await Promise.all([
            await this.discoveryStubClient.getFlightListFromSource1(),
            await this.discoveryStubClient.getFlightListFromSource2(),
        ]);
        sourceData[0].flights = sourceData[0].flights.concat(sourceData[1].flights);
        return FlightListDto.toDto(sourceData[0]);
    }
}
