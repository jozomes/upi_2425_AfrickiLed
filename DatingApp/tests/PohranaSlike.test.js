const PohranaSlike = require('./PohranaSlike');

global.fetch = jest.fn(); 

describe('PohranaSlike', () => {
    let formaPodaci;
    let postaviPodatke;

   
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    
    afterAll(() => {
        console.log.mockRestore();
        console.error.mockRestore();
    });

    beforeEach(() => {
        formaPodaci = {
            putanjaZaSliku: new File(['dummy content'], 'profile.png', { type: 'image/png' }),
            email: 'student@pmfst.hr',
        };

        postaviPodatke = jest.fn(); 
        global.fetch.mockClear(); 
    });

    it('should upload an image successfully and reset profileImage to null', async () => {
        const mockResponseData = { message: 'Upload successful' };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponseData),
        });

        await PohranaSlike(formaPodaci, postaviPodatke);

        // Verify fetch was called with correct arguments
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/upload-profile-picture', {
            method: 'POST',
            body: expect.any(FormData),
        });

        // Check that postaviPodatke was called
        expect(postaviPodatke).toHaveBeenCalledWith(expect.any(Function));

        // Verify that fetch's response was logged
        expect(console.log).toHaveBeenCalledWith('Slika uspješno spremljena:', mockResponseData);
    });

    it('should handle an unsuccessful image upload and log the error message', async () => {
        // Mock fetch response for failure
        const mockErrorData = { message: 'Invalid image format' };
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: jest.fn().mockResolvedValueOnce(mockErrorData),
        });

        await PohranaSlike(formaPodaci, postaviPodatke);

        // Verify fetch was called with correct arguments
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/upload-profile-picture', {
            method: 'POST',
            body: expect.any(FormData),
        });

        // Ensure postaviPodatke is not called
        expect(postaviPodatke).not.toHaveBeenCalled();

        // Verify that the error message was logged
        expect(console.error).toHaveBeenCalledWith('Greska pri uploadu slike', mockErrorData.message);
    });

    it('should handle a network error during the fetch request', async () => {
        // Mock fetch to throw a network error
        const mockError = new Error('Network error');
        global.fetch.mockRejectedValueOnce(mockError);

        await PohranaSlike(formaPodaci, postaviPodatke);

        // Verify fetch was called with correct arguments
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/upload-profile-picture', {
            method: 'POST',
            body: expect.any(FormData),
        });

        // Ensure postaviPodatke is not called
        expect(postaviPodatke).not.toHaveBeenCalled();

        // Verify that the network error was logged
        expect(console.error).toHaveBeenCalledWith('Greška prilikom slanja slike:', mockError);
    });
});
