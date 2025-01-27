const axios = require('axios');
const GetMedusobniLike = require('./getMedusobniLike');

jest.mock('axios'); // Mockiranje axiosa

describe('GetMedusobniLike', () => {
  beforeEach(() => {
    // Mockiranje localStorage objekta
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };

    // Mockiranje setMedusobniLikeovi funkcije
    global.setMedusobniLikeovi = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Resetiranje mockova nakon svakog testa
  });

  it('ispravna provjera i update localStorage-a', async () => {
    // Priprema mockiranog odgovora
    const mockResponse = {
      data: { medusobniLike: ['like1', 'like2', 'like3'] },
    };
    axios.get.mockResolvedValue(mockResponse);

    // Mockiranje tokena u localStorage
    localStorage.getItem.mockReturnValue('mocked_token');

    // Izvođenje funkcije
    await GetMedusobniLike();

    // Provjere
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/usporediLikes', {
      headers: {
        Authorization: 'Bearer mocked_token',
      },
    });
    expect(setMedusobniLikeovi).toHaveBeenCalledWith(['like1', 'like2', 'like3']);
    expect(localStorage.setItem).toHaveBeenCalledWith('medusobniLike', ['like1', 'like2', 'like3']);
  });

  it('ispravno postupanje s greskama', async () => {
    // Mockiranje pogreške
    const mockError = new Error('Network error');
    axios.get.mockRejectedValue(mockError);

    // Mockiranje console.log
    console.log = jest.fn();

    // Izvođenje funkcije
    await GetMedusobniLike();

    // Provjere
    expect(console.log).toHaveBeenCalledWith(mockError);
  });
});
