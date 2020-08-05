import 'reflect-metadata';
import 'jest';
import request from 'supertest';
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import app from '../src/app';
const source1 = require('./fixtures/source1');
const source2 = require('./fixtures/source2');

const mock = new MockAdapter(axios);
const { DISCOVERY_STUB_SERVICE_URL } = process.env;

describe('Flight Service API', () => {
    it('returns 500 response when downstream throws error', async () => {
        mock.onGet(`${DISCOVERY_STUB_SERVICE_URL}/source1`).replyOnce(500);
        mock.onGet(`${DISCOVERY_STUB_SERVICE_URL}/source2`).replyOnce(500);
        const response = await request(app).get('/api/flights');
        expect(response.status).toEqual(500);
    });

    it('returns 200 response success response', async () => {
        mock.restore();
        mock.onGet(`${DISCOVERY_STUB_SERVICE_URL}/source1`).reply(200, source1);
        mock.onGet(`${DISCOVERY_STUB_SERVICE_URL}/source2`).reply(200, source2);
        const response = await request(app).get('/api/flights');
        expect(response.status).toEqual(200);
    });
})