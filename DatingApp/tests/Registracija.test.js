const SendData = require('./SendData');
const axios = require('axios');
const PohranaSlike = require('./PohranaSlike');
const JedinstvenMail = jest.fn(); 
// or
jest.mock('./JedinstvenMail', () => ({ 
  default: jest.fn() 
}));

jest.mock('axios');
jest.mock('./PohranaSlike');

describe('SendData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
  it('uspjesna registracija', async () => {
    const mockNavigate = jest.fn();
    const mockPohranaSlike = jest.fn();
    const mockAlert = jest.fn();
    jest.mocked(PohranaSlike).mockResolvedValueOnce(true);
    axios.post.mockResolvedValueOnce({ data: {} });

    const formData = { 
        email: 'antegoi@pmfst.hr', 
        lozinka: 'tajnaLozinka', 
        ponovi_lozinka: 'tajnaLozinka',
    };

    const mockEvent = { preventDefault: jest.fn() }; 

    await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert); 

    expect(mockAlert).toHaveBeenCalledTimes(1); 

  });

  it('"Unesite pmfst.hr domenu" alert', async () => {
    const mockNavigate = jest.fn();
    const mockPohranaSlike = jest.fn();
    const mockAlert = jest.fn(); 
    const formData = { 
        email: 'korisnik@gmail.hr', 
        lozinka: 'tajnaLozinka', 
        ponovi_lozinka: 'tajnaLozinka',
    };

    const mockEvent = { preventDefault: jest.fn() }; 

    await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert); 

    expect(mockAlert).toHaveBeenCalledWith("Unesite pmfst.hr domenu"); 
  });

  it('"Lozinke se ne podudaraju" alert', async () => {
    const mockNavigate = jest.fn();
    const mockPohranaSlike = jest.fn();
    const mockAlert = jest.fn();
    const formData = { 
      email: 'korisnik@pmfst.hr', 
      lozinka: 'tajnaLozinka', 
      ponovi_lozinka: 'drugaLozinka', 
    };

    const mockEvent = { preventDefault: jest.fn() }; 

    await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert); 

    expect(mockAlert).toHaveBeenCalledWith("Lozinke se ne podudaraju"); 
    expect(axios.post).not.toHaveBeenCalled(); 
    expect(mockPohranaSlike).not.toHaveBeenCalled(); 
    expect(mockNavigate).not.toHaveBeenCalled(); 
  });

  it('"Ovaj mail se vec koristi" alert', async () => {
    const mockNavigate = jest.fn();
    const mockPohranaSlike = jest.fn();
    const mockAlert = jest.fn();
    const formData = { 
      email: 'markolivaja@pmfst.hr', 
      lozinka: 'tajnaLozinka', 
      ponovi_lozinka: 'tajnaLozinka', 
    };

    
    JedinstvenMail.mockReturnValueOnce(false); 
    const mockEvent = { preventDefault: jest.fn() }; 
    await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert); 

    expect(axios.post).not.toHaveBeenCalled(); 
    expect(mockPohranaSlike).not.toHaveBeenCalled(); 
    expect(mockNavigate).not.toHaveBeenCalled(); 
  });
  
});