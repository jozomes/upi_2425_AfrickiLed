// path/to/your/function.js
const handleSubmitEP = async (event, formaPodaci, currentUser, setCurrentUser) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', formaPodaci.profileImage);
    formData.append('email', currentUser.email); // Dodaj email korisnika

    try {
        const response = await fetch('http://localhost:5000/upload-profile-picture', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Greška pri uploadu slike:', errorData.message);
            return;
        }

        const data = await response.json();
        console.log('Slika uspješno spremljena:', data);

        // Ažuriraj trenutno stanje korisnika
        setCurrentUser({ ...currentUser, putanjaZaSliku: data.putanjaZaSliku });
    } catch (error) {
        console.error('Greška prilikom slanja slike:', error);
    }
};

module.exports = handleSubmitEP;
