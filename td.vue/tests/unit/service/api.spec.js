import api from '@/service/api.js';
import httpClient from '@/service/httpClient.js';

describe('service/api.js', () => {
    const url = 'http://threatdragon.org/api/foobar';
    const mockResp = { data: 'foo' };
    const mockClient = {
        get: () => mockResp,
        post: () => mockResp
    };

    let res;

    beforeEach(() => {
        jest.spyOn(httpClient, 'get').mockReturnValue(mockClient);
        jest.spyOn(mockClient, 'get');
        jest.spyOn(mockClient, 'post');
    });

    describe('getAsync', () => {
        beforeEach(async () => {
            res = await api.getAsync(url);
        });

        it('calls client.get', () => {
            expect(mockClient.get).toHaveBeenCalledWith(url);
        });

        it('returns the data', () => {
            expect(res).toEqual(mockResp.data);
        });
    });

    describe('postAsync', () => {
        it('passes the url without a body', async () => {
            await api.postAsync(url);
            expect(mockClient.post).toHaveBeenCalledWith(url, undefined);
        });

        it('passes the body', async () => {
            const body = { foo: 'bar' };
            await api.postAsync(url, body);
            expect(mockClient.post).toHaveBeenCalledWith(expect.anything(), body);
        });

        it('returns the data', async () => {
            res = await api.postAsync(url);
            expect(res).toEqual(mockResp.data);
        });
    });
});
