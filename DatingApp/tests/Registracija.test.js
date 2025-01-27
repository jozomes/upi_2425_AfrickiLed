const SendData = require('./SendData');
const axios = require('axios');
jest.mock('axios');

// Mock dependencies
jest.mock('./JedinstvenMail', () => jest.fn());
const mockJedinstvenMail = require('./JedinstvenMail');

describe('SendData', () => {
    let mockAlert, mockNavigate, mockPohranaSlike, mockEvent;

    beforeEach(() => {
        mockAlert = jest.fn();
        mockNavigate = jest.fn();
        mockPohranaSlike = jest.fn();
        mockEvent = { preventDefault: jest.fn() };

        jest.clearAllMocks();
    });

    it('izbacit alert ukoliko mail ne zavrsava sa pmfst.hr', async () => {
        const formData = {
            email: 'student@gmail.com',
            lozinka: 'password123',
            ponovi_lozinku: 'password123',
        };

        await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert);

        expect(mockAlert).toHaveBeenCalledWith("Unesite pmfst.hr domenu");
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(mockPohranaSlike).not.toHaveBeenCalled();
    });

    it('alert ukoliko se ne podudaraju lozinke', async () => {
        const formData = {
            email: 'student@pmfst.hr',
            lozinka: 'password123',
            ponovi_lozinku: 'differentPassword',
        };

        await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert);

        expect(mockAlert).toHaveBeenCalledWith("Lozinke se ne podudaraju");
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(mockPohranaSlike).not.toHaveBeenCalled();
    });

    it('alert ukoliko se unosi vec postojeci email', async () => {
        const formData = {
            email: 'jmestrovi@pmfst.hr',
            lozinka: 'password123',
            ponovi_lozinku: 'password123',
        };

        mockJedinstvenMail.mockResolvedValue(false);

        await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert);

        expect(mockAlert).toHaveBeenCalledWith("Ovaj mail se vec koristi");
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(mockPohranaSlike).not.toHaveBeenCalled();
    });

    it('uspjesna registracija', async () => {
        const formData = {
            email: 'student@pmfst.hr',
            lozinka: 'password123',
            ponovi_lozinku: 'password123',
        };

        mockJedinstvenMail.mockResolvedValue(true);
        axios.post.mockResolvedValue({ data: { success: true } });

        await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert);

        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/users', {
            email: formData.email,
            password: formData.lozinka,
        });
        expect(mockPohranaSlike).toHaveBeenCalled();
        expect(mockAlert).toHaveBeenCalledWith("Registracija uspješna!");
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it('registration failure (API error)', async () => {
        const formData = {
            email: 'student@pmfst.hr',
            lozinka: 'password123',
            ponovi_lozinku: 'password123',
        };

        mockJedinstvenMail.mockResolvedValue(true);
        axios.post.mockRejectedValue(new Error('Network Error'));

        await SendData(mockEvent, formData, mockNavigate, mockPohranaSlike, mockAlert);

        expect(mockAlert).toHaveBeenCalledWith("Došlo je do greške prilikom registracije.");
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(mockPohranaSlike).not.toHaveBeenCalled();
    });
});
