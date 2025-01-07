import React, { useState } from 'react';
import axios from 'axios'
const RegistrationTest = () => {
    const [formData, setFormData] = useState({
        email: '',
        ime: '',
        prezime: '',
        putanjaZaSliku: '',
        lozinka: '',
        smjer: '',
        opis: '',
        najdraziProgramskiJezik: '',
        github: '',
        leetcode: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users', {
                ...formData,
                detalji: {
                    opis: formData.opis,
                    najdraziProgramskiJezik: formData.najdraziProgramskiJezik,
                    github: formData.github,
                    leetcode: formData.leetcode
                }
            });

            setResponseMessage('User registered successfully!');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setResponseMessage(error.response?.data?.error || 'Error registering user');
        }
    };

    return (
        <div>
            <h1>Register User</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="ime" placeholder="Ime" value={formData.ime} onChange={handleChange} required />
                <input type="text" name="prezime" placeholder="Prezime" value={formData.prezime} onChange={handleChange} required />
                <input type="text" name="putanjaZaSliku" placeholder="Putanja za Sliku" value={formData.putanjaZaSliku} onChange={handleChange} required />
                <input type="password" name="lozinka" placeholder="Lozinka" value={formData.lozinka} onChange={handleChange} required />
                <input type="text" name="smjer" placeholder="Smjer" value={formData.smjer} onChange={handleChange} required />
                <input type="text" name="opis" placeholder="Opis" value={formData.opis} onChange={handleChange} required />
                <input type="text" name="najdraziProgramskiJezik" placeholder="Najdraži Programski Jezik" value={formData.najdraziProgramskiJezik} onChange={handleChange} required />
                <input type="text" name="github" placeholder="GitHub" value={formData.github} onChange={handleChange} required />
                <input type="text" name="leetcode" placeholder="LeetCode" value={formData.leetcode} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default RegistrationTest;
