import './GuessBox.css';
import React from 'react';

function GuessBox({ guesses, correctChampion }) {
    const totalRows = 5;
    const columns = 6;
    const emptyRows = totalRows - guesses.length;

    const isCorrect = (guessAttr, correctAttr) => guessAttr === correctAttr;
    const isHigher = (guessAttr, correctAttr) => guessAttr > correctAttr;

    console.log(correctChampion);

    return (
        <div className="guess-box">
            {/* headers */}
            <div className="grid-item header">Champion</div>
            <div className="grid-item header">Role</div>
            <div className="grid-item header">Affiliation</div>
            <div className="grid-item header">Movement</div>
            <div className="grid-item header">Health</div>
            <div className="grid-item header">Version</div>

            {guesses.map((champion, index) => (
                <React.Fragment key={`guess-${index}`}>
                    <div className={`grid-item champion ${isCorrect(champion.name, correctChampion.name) ? 'correct' : 'incorrect'}`}>
                        <img src={champion.image} alt={champion.name} />
                        <div>{champion.name}</div>
                    </div>

                    <div className={`grid-item role ${isCorrect(champion.role, correctChampion.role) ? 'correct' : 'incorrect'}`}>

                      {/* Role icons */}
                      {champion.role === 'Support' && <img src="/roles/support.png" alt="Support" />}
                      {champion.role === 'Front Line' && <img src="/roles/front_line.png" alt="Front Line" />}
                      {champion.role === 'Flank' && <img src="/roles/flank.png" alt="Flank" />}
                      {champion.role === 'Damage' && <img src="/roles/damage.png" alt="Damage" />}
                    </div>
                    <div className={`grid-item text ${isCorrect(champion.affiliation, correctChampion.affiliation) ? 'correct' : 'incorrect'}`}>
                        {champion.affiliation}
                    </div>
                    <div className={`grid-item text ${isCorrect(champion.movementAbility, correctChampion.movementAbility) ? 'correct' : 'incorrect'
                    }`}>
                        {champion.movementAbility}
                    </div>
                    <div className={`grid-item number ${isCorrect(champion.health, correctChampion.health) ? 'correct' : 'incorrect'}`}>
                        {(champion.health !== correctChampion.health) && (
                            <img src={isHigher(champion.health, correctChampion.health) ? "/down-arrow.png" : "/up-arrow.png"} alt="health comparison" />
                        )}
                        {champion.health}
                    </div>
                    <div className={`grid-item number ${isCorrect(champion.releaseVersion, correctChampion.releaseVersion) ? 'correct' : 'incorrect'}`}>
                        {(champion.releaseVersion !== correctChampion.releaseVersion) && (
                            <img src={isHigher(champion.releaseVersion, correctChampion.releaseVersion) ? "/down-arrow.png" : "/up-arrow.png"} alt="version comparison" />
                        )}
                        {champion.releaseVersion}
                    </div>
                </React.Fragment>
            ))}

            {/* Empty rows */}
            {[...Array(emptyRows)].map((_, rowIndex) => (
                <React.Fragment key={`empty-${rowIndex}`}>
                    {[...Array(columns)].map((_, colIndex) => (
                        <div className="grid-item" key={`empty-${rowIndex}-${colIndex}`}>
                            <img src="logo.png" alt="icon" />
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

export default GuessBox;
