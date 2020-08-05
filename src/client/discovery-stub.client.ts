import { RestClient } from "./base.client";
import { injectable } from "inversify";
import { IDiscoveryStub, IDiscoveryStubResponse } from '../interfaces/flight.interfaces';
import Catch from '../decorators/errorHandler.decorator';

export enum ROUTES {
    SOURCE1 = "source1",
    SOURCE2 = "source2",
}

@injectable()
export class DiscoveryStubClient implements IDiscoveryStub {
    restClient: RestClient;

    authToken: string;

    constructor() {
        const baseUrl = `${process.env.DISCOVERY_STUB_SERVICE_URL}`;
        this.authToken = Buffer.from('ct_interviewee:supersecret', 'utf8').toString('base64');
        this.restClient = new RestClient(baseUrl);
    }

    @Catch()
    async getFlightListFromSource1(): Promise<IDiscoveryStubResponse> {
        const path = ROUTES.SOURCE1;
        const response = await this.restClient.get<IDiscoveryStubResponse>(path);
        return response;
    }

    @Catch()
    async getFlightListFromSource2(): Promise<IDiscoveryStubResponse> {
        const path = ROUTES.SOURCE2;
        const headers = {
            Authorization: `Basic ${this.authToken}`,
        };
        const response = await this.restClient.get<IDiscoveryStubResponse>(path, {}, headers);
        return response;
    }

    // async getFlightList(): Promise<IDiscoveryStubResponse> {
        // const results = await Promise.all([await this.getFlightListFromSource1(), await this.getFlightListFromSource2()]);
        // const mergedResults = { flights: results[0].flights.concat(results[1].flights) };
        // return results;
    // }
}