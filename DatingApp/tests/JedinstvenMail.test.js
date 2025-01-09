// JedinstvenMail.test.js
const axios = require('axios');
const JedinstvenMail = require('./JedinstvenMail.js'); // Adjust the import path accordingly

jest.mock('axios');

describe('JedinstvenMail', () => {
    it('treba vratit TRUE ako je email već na serveru (status 200)', async () => {
        axios.get.mockResolvedValue({ status: 200 });

        const result = await JedinstvenMail('jmestrovi@pmfst.hr');
        expect(result).toBe(true);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/users/jmestrovi@pmfst.hr');
    });

    it('treba vratit FALSE ako email nije već na serveru (status 400)', async () => {
        axios.get.mockRejectedValue({ response: { status: 400 } });

        const result = await JedinstvenMail('test@example.com');
        expect(result).toBe(false);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/users/test@example.com');
    });

    it('treba vratit false i ispisat bilo koju drugu grešku', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const errorMessage = 'Network Error';

        axios.get.mockRejectedValue(new Error(errorMessage));

        const result = await JedinstvenMail('test@example.com');
        expect(result).toBe(false);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/users/test@example.com');
        expect(console.error).toHaveBeenCalledWith('Dogodila se greska: ', expect.any(Error));

        consoleSpy.mockRestore();
    });
});
