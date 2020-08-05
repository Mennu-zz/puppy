import 'reflect-metadata';
import { FlightListDto } from './flightList.dto';
import 'jest';
const source1 = require('../../tests/fixtures/source1');

describe('FlightList DTO', () => {
    it('should return expected response', () => {
        const result = FlightListDto.toDto(source1);
        expect(result.data).toMatchObject(source1);
    });

    it('should return removing duplicated', () => {
        const {flights} = source1;

        const result = FlightListDto.toDto({ flights: [flights[0], flights[0]] });
        expect(result.data).toMatchObject(source1);
    })
})
