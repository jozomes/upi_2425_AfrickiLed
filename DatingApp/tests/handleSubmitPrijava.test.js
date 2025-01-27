const handleSubmit = require('./handleSubmitPrijava.js'); 
const axios = require('axios');
const jwtDecode = require('jwt-decode');


jest.mock('axios');
jest.mock('jwt-decode', () => jest.fn()); 

const mockNavigate = jest.fn();
const mockSetError = jest.fn();
const mockSetCurrentUser = jest.fn();

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => (store[key] = value || ''),
    clear: () => (store = {}),
  };
})();

global.localStorage = mockLocalStorage;

describe('handleSubmit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('izbaciti error ako fali email ili sifra', async () => {
    const email = ''; 
    const lozinka = ''; 

    await handleSubmit({ 
      email, 
      lozinka, 
      setError: mockSetError, 
      navigate: mockNavigate, 
      setCurrentUser: mockSetCurrentUser 
    });

    expect(mockSetError).toHaveBeenCalledWith('Sva polja moraju biti popunjena.');
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetCurrentUser).not.toHaveBeenCalled();
  });

  it('treba navigirati na admin stranicu ako je user stvarno admin', async () => {
    const email = 'admin@pmfst.hr';
    const lozinka = 'admin';
    const token = 'fakeToken';
    const decodedToken = { korisnik: { isAdmin: true } };

    axios.get.mockResolvedValueOnce({ data: { token } });
    jwtDecode.mockReturnValueOnce(decodedToken);

    await handleSubmit({ 
      email, 
      lozinka, 
      setError: mockSetError, 
      navigate: mockNavigate, 
      setCurrentUser: mockSetCurrentUser 
    });

    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:5000/login?email=${encodeURIComponent(email)}&lozinka=${encodeURIComponent(lozinka)}`
    );
    expect(localStorage.getItem('token')).toBe(token);
    expect(mockSetCurrentUser).toHaveBeenCalledWith(decodedToken.korisnik);
    expect(mockNavigate).toHaveBeenCalledWith('/admin-page');
  });

  it('treba navigirati na mainMenu ukoliko je user', async () => {
    const email = 'jmestrovi@pmfst.hr';
    const lozinka = 'volimnasilje';
    const token = 'fakeToken';
    const decodedToken = { korisnik: { isAdmin: false } };

    axios.get.mockResolvedValueOnce({ data: { token } });
    jwtDecode.mockReturnValueOnce(decodedToken);

    await handleSubmit({ 
      email, 
      lozinka, 
      setError: mockSetError, 
      navigate: mockNavigate, 
      setCurrentUser: mockSetCurrentUser 
    });

    expect(localStorage.getItem('token')).toBe(token);
    expect(mockSetCurrentUser).toHaveBeenCalledWith(decodedToken.korisnik);
    expect(mockNavigate).toHaveBeenCalledWith('/MainMenu');
  });

  it('error ako su uneseni krivi podaci', async () => {
    const email = 'user@test.com';
    const lozinka = 'wrongPassword';

    axios.get.mockRejectedValueOnce(new Error('Invalid credentials'));

    await handleSubmit({ 
      email, 
      lozinka, 
      setError: mockSetError, 
      navigate: mockNavigate, 
      setCurrentUser: mockSetCurrentUser 
    });

    expect(mockSetError).toHaveBeenCalledWith('Uneseni su krivi podaci.');
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetCurrentUser).not.toHaveBeenCalled();
  });
});