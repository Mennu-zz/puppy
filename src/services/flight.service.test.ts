import 'reflect-metadata';
import { FlightService } from './flight.service';
import { DiscoveryStubClient } from '../client/discovery-stub.client';
import 'jest';

const source1 = require('../../tests/fixtures/source1');
const source2 = require('../../tests/fixtures/source2');

describe('Flight Service', () => {
    const discoveryStubClient = new DiscoveryStubClient();
    const mockSource1 = jest.spyOn(discoveryStubClient, 'getFlightListFromSource1');
    const mockSource2 = jest.spyOn(discoveryStubClient, 'getFlightListFromSource2');

    const flightService = new FlightService(discoveryStubClient);
    
    afterEach(jest.clearAllMocks);

    it('Should return success response with one flight when same response is recieved', async () => {
        mockSource1.mockReturnValueOnce(source1);
        mockSource2.mockReturnValueOnce(source1);
        
        const result = await flightService.getFlightList();
        expect(result.data.flights.length).toBe(1);
    });

    it('Should return success response', async () => {
        mockSource1.mockReturnValueOnce(source1);
        mockSource2.mockReturnValueOnce(source2);
    
        const result = await flightService.getFlightList();
        expect(result.data.flights.length).toBe(2);
    });
})