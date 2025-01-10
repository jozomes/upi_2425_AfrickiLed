const JedinstvenMail = require('./JedinstvenMail'); // Import JedinstvenMail
const axios = require('axios');

/**
 * Handles sending form data, performing validations before sending.
 *
 * @param {Object} event - The event object from the form submission.
 * @param {Object} formaPodaci - The data from the form submission.
 * @param {string} formaPodaci.email - The email provided in the form.
 * @param {string} formaPodaci.lozinka - The password provided in the form.
 * @param {string} formaPodaci.ponovi_lozinku - The repeated password for confirmation.
 */
async function SendData(event, formaPodaci) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Validate the email domain
    if (!formaPodaci.email.endsWith('@pmfst.hr')) {
        alert('Unesite pmfst.hr domenu');
        return;
    }

    // Validate that passwords match
    if (formaPodaci.lozinka !== formaPodaci.ponovi_lozinku) {
        alert('Lozinke se ne podudaraju');
        return;
    }

    try {
        // Check if the email is unique using JedinstvenMail
        const isUnique = await JedinstvenMail(formaPodaci.email);

        if (!isUnique) {
            alert('Ovaj mail se vec koristi');
            return;
        }

        // Send form data to the server if all validations pass
        await axios.post('http://localhost:5000/users', {
            email: formaPodaci.email,
            lozinka: formaPodaci.lozinka
        });

        // Navigate to the homepage on success
        navigate('/');
    } catch (error) {
        // Handle errors during data submission
        alert('Došlo je do greške prilikom registracije.');
        console.error('Error during registration:', error);
    }
}

module.exports = SendData;
