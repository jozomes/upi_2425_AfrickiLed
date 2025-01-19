// handleSubmitEP.test.js
const handleSubmitEP = require('./handleSubmitEP.js'); 

global.fetch = jest.fn(); // Mock fetch
const setCurrentUser = jest.fn();

const formaPodaci = {
    profileImage: new Blob(['test image'], { type: 'image/jpeg' }),
};

const currentUser = {
    email: 'test@example.com',
    putanjaZaSliku: '',
};

describe('handleSubmitEP', () => {
    let event;

    beforeEach(() => {
        event = {
            preventDefault: jest.fn(),
        };
        global.fetch.mockClear();
        setCurrentUser.mockClear();
    });

    it('ispravan upload', async () => {
        const response = {
            ok: true,
            json: jest.fn().mockResolvedValue({ putanjaZaSliku: 'path/to/image.jpg' }),
        };
        global.fetch.mockResolvedValue(response);

        await handleSubmitEP(event, formaPodaci, currentUser, setCurrentUser);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/upload-profile-picture', expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData),
        }));
        expect(response.json).toHaveBeenCalled();
        expect(setCurrentUser).toHaveBeenCalledWith({ ...currentUser, putanjaZaSliku: 'path/to/image.jpg' });
    });

    it('failed upload', async () => {
        const response = {
            ok: false,
            json: jest.fn().mockResolvedValue({ message: 'Error uploading image' }),
        };
        global.fetch.mockResolvedValue(response);
        console.error = jest.fn();

        await handleSubmitEP(event, formaPodaci, currentUser, setCurrentUser);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/upload-profile-picture', expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData),
        }));
        expect(response.json).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('Greška pri uploadu slike:', 'Error uploading image');
    });

    it('network error', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));
        console.error = jest.fn();

        await handleSubmitEP(event, formaPodaci, currentUser, setCurrentUser);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/upload-profile-picture', expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData),
        }));
        expect(console.error).toHaveBeenCalledWith('Greška prilikom slanja slike:', expect.any(Error));
    });
});
