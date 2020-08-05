export interface IDiscoveryStub {
    getFlightListFromSource1(): Promise<IDiscoveryStubResponse>;
    getFlightListFromSource2(): Promise<IDiscoveryStubResponse>;
}

export interface IFlightDetails {
    origin_name: string,
    destination_name: string,
    departure_date_time_utc: string,
    arrival_date_time_utc: string,
    flight_number: string,
    duration: string,
}

export interface IFlightJourney {
    slices: IFlightDetails[],
    price: Number,
}

export interface IDiscoveryStubResponse {
    flights: IFlightJourney[]
}

export interface IFlightListResponse {
    data: IDiscoveryStubResponse
}

export interface IFlightService {
    getFlightList(): Promise<IFlightListResponse>;
}