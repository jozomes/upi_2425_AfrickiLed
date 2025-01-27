import { useNavigate } from 'react-router-dom';
import '../cssFiles/mainMenu.css';
function About() {
    const navigate = useNavigate();

    // Funkcija za odjavu
    const Exit = () => {
        navigate("/MainMenu");
    };
    
  return (
    
    <div className='container'>
        <h2>Studenti:</h2>
        <ul>
            <li>Jozo Meštrović</li>
            <li>Mariela Uvodić</li>
            <li>Davor Skenderović</li>
            <li>Ivana Oreb</li>
            <li>Gabrijela Jurković</li>
        </ul>
        <div className="parent_logout">
            <button onClick={Exit}>Povratak</button>
        </div>
    </div>
  );
}

export default About;
