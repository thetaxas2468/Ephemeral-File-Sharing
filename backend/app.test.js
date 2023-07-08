const request = require('supertest');
const app = require('./app');

// jest.useFakeTimers();

describe('File Upload and Retention', () => {
   
    test('should upload a file and remove it after retention time expires', async () => {
        const filePath = `${__dirname}/tests/main_page_background.jpg`;
        const retentionTime = 1;

        const response = await request(app)
            .put('/v1/file')
            .attach('file', filePath)
            .set('RetentionTime', retentionTime);

        const { url } = response.body;
        
        expect(url).toMatch(/^\/v1\/.*\.jpg$/);

        const tempResponse = await request(app).get(url);

        expect(tempResponse.status).toBe(200);
        
        // jest.advanceTimersByTime(retentionTime * 60 * 1000);
        await new Promise((resolve) => setTimeout(resolve, retentionTime * 60 * 1000));

        const getFileResponse = await request(app).get(url);
        expect(getFileResponse.status).toBe(404);
    },1 * 65 * 1000);
});