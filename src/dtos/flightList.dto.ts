import { IDiscoveryStubResponse, IFlightJourney, IFlightListResponse } from '../interfaces/flight.interfaces';

export class FlightListDto {

    static transformFlightData(flightList: IDiscoveryStubResponse) {
        let flightData: IFlightJourney[] = [], uniqueFlights: any = {};
        flightList.flights.map(flight => {
            const { slices } = flight;
            const uniqueIdentifier = slices[0].flight_number + slices[0].arrival_date_time_utc
                                       + slices[1].flight_number + slices[1].arrival_date_time_utc;
            if(!uniqueFlights[uniqueIdentifier]) {
                flightData.push(flight);
                uniqueFlights[uniqueIdentifier] = true;
            }
        });
        return { flights: flightData };
    }

    public static toDto(response: IDiscoveryStubResponse): IFlightListResponse {
        const transformedFlightData = FlightListDto.transformFlightData(response);
        const result:IFlightListResponse = {
            data: transformedFlightData,
        };
        return result;
    }
}