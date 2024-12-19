import "./GameProfil.css"

function GameProfil() {

    return ( 
        <>
        <div className="profil-container">
            <div className="profil-text">
            <h2>Lapinou62</h2>
            <p>Level 1</p>
            <button className="profil-button" type="button">Accueil</button>
            </div>
            <img className="profil-img" src="./src/assets/images/profil.png" alt="avatar boy" />
        </div>
        </>
     );
}

export default GameProfil;