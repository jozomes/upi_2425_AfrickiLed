const axios = require('axios');
const JedinstvenMail = require('./JedinstvenMail'); 
const SendData = require('./SendData'); 
jest.mock('axios'); 
jest.mock('./JedinstvenMail', () => jest.fn()); 

const mockNavigate = jest.fn();

global.alert = jest.fn(); 
global.navigate = mockNavigate; 

describe('SendData', () => {
    let event;
    let formaPodaci;

    beforeEach(() => {
        jest.clearAllMocks();
        formaPodaci = {
            email: '',
            lozinka: '',
            ponovi_lozinku: ''
        };
        event = {
            preventDefault: jest.fn()
        };
    });

    it('ispisat alert ako mail nije unique', async () => {
        formaPodaci.email = 'jmestrovi@pmfst.hr';
        formaPodaci.lozinka = 'password';
        formaPodaci.ponovi_lozinku = 'password';

        JedinstvenMail.mockResolvedValue(false); 

        await SendData(event, formaPodaci);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(JedinstvenMail).toHaveBeenCalledWith('jmestrovi@pmfst.hr');
        expect(global.alert).toHaveBeenCalledWith('Ovaj mail se vec koristi');
    });

    it('ucitati login ukoliko je registracija uspjesna', async () => {
        formaPodaci.email = 'test@pmfst.hr';
        formaPodaci.lozinka = 'password';
        formaPodaci.ponovi_lozinku = 'password';

        JedinstvenMail.mockResolvedValue(true); 
        axios.post.mockResolvedValue({}); 

        await SendData(event, formaPodaci);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/users', expect.anything());
        expect(global.navigate).toHaveBeenCalledWith('/');
    });
    it('ispisat alert u slučaju bilo koje druge greške', async () => {
        formaPodaci.email = 'test@pmfst.hr';
        formaPodaci.lozinka = 'password';
        formaPodaci.ponovi_lozinku = 'password';
    
        JedinstvenMail.mockResolvedValue(true); 
        axios.post.mockRejectedValue(new Error('Network error')); 
    
        await SendData(event, formaPodaci);
    
        expect(event.preventDefault).toHaveBeenCalled(); 
        expect(JedinstvenMail).toHaveBeenCalledWith('test@pmfst.hr'); 
        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/users', expect.anything()); 
        expect(global.alert).toHaveBeenCalledWith('Došlo je do greške prilikom registracije.'); 
    });
    
});
