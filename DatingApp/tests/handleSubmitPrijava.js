// path/to/your/function.js
const handleSubmit = async (email, lozinka, setError) => {
    if (!email || !lozinka) {
        setError("Sva polja moraju biti popunjena.");
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:5000/login?email=${encodeURIComponent(email)}&lozinka=${encodeURIComponent(lozinka)}`);
        const data = await response.json();

        if (!response.ok) {
            setError(data.error || "Neispravni podaci za prijavu");
            return;
        }

        setError("");
        alert("Prijava uspješna!");
    } catch (error) {
        setError("Došlo je do pogreške s poslužiteljem.");
        console.error("Greška: ", error);
    }
};

module.exports = handleSubmit;
