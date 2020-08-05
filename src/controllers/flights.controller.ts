import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { IFlightService, IFlightListResponse } from '../interfaces/flight.interfaces';
import Catch from '../decorators/errorHandler.decorator';

@controller('/api/flights')
export class FlightsController {

    constructor (@inject(TYPES.FlightService) private flightService: IFlightService) {} 
    
    @httpGet('/')
    @Catch()
    public async list(): Promise<IFlightListResponse> {
        const result = this.flightService.getFlightList();
        return result;
    }
}