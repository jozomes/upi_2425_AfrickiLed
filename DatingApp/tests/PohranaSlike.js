const PohranaSlike = async (formaPodaci, postaviPodatke) => {
    const formData = new FormData();
    formData.append('profileImages', formaPodaci.putanjaZaSliku);
    formData.append('email', formaPodaci.email);

    try {
        const response = await fetch('http://localhost:5000/upload-profile-picture', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Greska pri uploadu slike', errorData.message);
            return;
        }

        const data = await response.json();
        console.log('Slika uspješno spremljena:', data); // Check server response
        postaviPodatke((prevState) => ({ ...prevState, profileImage: null }));
    } catch (error) {
        console.error('Greška prilikom slanja slike:', error);
    }
};

module.exports = PohranaSlike;
