import { useState, useEffect } from "react";
function ProfileEditor() {
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
      <div>
        <form>
            <div>
                <label htmlFor="description">Product description:</label>
                <textarea id="description"
                    name="short_desc"
                    minLength="1"
                    maxLength="100"
                    onChange={promjenaUlaza}>
                </textarea>
            </div>
            <div>
                <label>
                    Najdrazi programski jezik
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
                </label>
            </div>
            <div>
                <label htmlFor="GitHubAccount">GitHub:</label>
                <input type="text" name="github" value={formaPodaci.github} onChange={promjenaUlaza} >
                </input>
            </div>
            <div>
                <label htmlFor="LeetCodeAccount">LeetCode:</label>
                <input type="text" name="leetcode" value={formaPodaci.leetcode} onChange={promjenaUlaza} >
                </input>
            </div>
        </form>
      </div>
    )
  }
  
export default ProfileEditor