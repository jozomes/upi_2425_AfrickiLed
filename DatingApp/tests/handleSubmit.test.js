
const handleSubmit  = require('./handleSubmit.js'); 

global.fetch = jest.fn(); // Mock fetch

describe('handleSubmit', () => {
    let setError;

    beforeAll(() => {
        global.alert = jest.fn(); 
    });

    beforeEach(() => {
        setError = jest.fn();
        fetch.mockClear(); 
        global.alert.mockClear(); 
    });

    afterAll(() => {
        delete global.alert; 
    });

    it('treba vratit grešku ako fali email ili lozinka', async () => {
        await handleSubmit('', 'password', setError);
        expect(setError).toHaveBeenCalledWith('Sva polja moraju biti popunjena.');

        await handleSubmit('test@example.com', '', setError);
        expect(setError).toHaveBeenCalledWith('Sva polja moraju biti popunjena.');
    });

    it('treba vratiti grešku ukoliko su podatci krivi', async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ error: 'Invalid login' }),
        });

        await handleSubmit('test@example.com', 'password', setError);
        expect(setError).toHaveBeenCalledWith('Invalid login');
        expect(global.alert).not.toHaveBeenCalled();
    });

    it('treba vratiti genericku error poruku ukoliko dode do bilo kakve druge greske', async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({}),
        });

        await handleSubmit('test@example.com', 'password', setError);
        expect(setError).toHaveBeenCalledWith('Neispravni podaci za prijavu');
        expect(global.alert).not.toHaveBeenCalled();
    });

    it('pokazati success alert ukoliko je prijava uspjesna', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        await handleSubmit('jmestrovi@pmfst.hr', 'volimnasilje', setError);
        expect(setError).toHaveBeenCalledWith('');
        expect(global.alert).toHaveBeenCalledWith('Prijava uspješna!');
    });

    it('ispisati server error ukoliko fetch ne radi', async () => {
        fetch.mockRejectedValue(new Error('Network error'));

        await handleSubmit('test@example.com', 'password', setError);
        expect(setError).toHaveBeenCalledWith('Došlo je do pogreške s poslužiteljem.');
        expect(global.alert).not.toHaveBeenCalled();
    });
});
