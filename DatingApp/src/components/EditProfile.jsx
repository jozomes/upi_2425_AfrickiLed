import { useState } from 'react'
import stil from '../cssFiles/LoginForm.module.css'

function EditProfile() {
    const [formaPodaci, postaviPodatke] = useState({
        short_desc: "",
        fav_language: "",
        github: "",
        leetcode: "",
      });

    const prog_lang = ["python", "c#", "javascript", "c++", "c", "java", "php", "rust", "tajna je :)"];

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    return (
      <div className={stil.container}>
        <div className={stil.header}>
            <div className={stil.text}>Uređivanje profila</div>
            <div className={stil.underline}></div>
        </div>
        <form>
            <div>
                <label htmlFor="description">Malo duži opis:</label>
                <div className={stil.inputs}>
                <div className={stil.input}>
                    <textarea id="description"
                    name="short_desc"
                    minLength="1"
                    maxLength="100"
                    onChange={promjenaUlaza}
                    placeholder='Duži opis'>
                  </textarea>      
                </div>
            </div>
            <div>
                <label>
                    Najdrazi programski jezik
                    <div className={stil.input}>
                    <select
                    name='fav_language'
                    value={formaPodaci.fav_language}
                    onChange={promjenaUlaza}
                    required>
                        <option value=''>--":P"--</option>
                        {prog_lang.map(lang => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                    </div>
                </label>
                
            </div>
            <div>
                <label htmlFor="GitHubAccount">GitHub:</label>
                <div className={stil.input}>
                <input type="text" name="github" value={formaPodaci.github} onChange={promjenaUlaza} 
                placeholder='GitHub'>
                </input>
                </div>
            </div>
            <div>
                <label htmlFor="LeetCodeAccount">LeetCode:</label>
                <div className={stil.input}>
                    <input type="text" name="leetcode" value={formaPodaci.leetcode} onChange={promjenaUlaza} 
                    placeholder='LeetCode'>
                    </input>
                </div>
            </div>
            </div>
        </form>
      </div>
    )
  }
export default EditProfile
