import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import { generateCharacter } from "./generator";

const commonPhrasing = {
  skill: "a skill you picked up when",
  item: "random stuff",
};

function App() {
  const [character, setCharacter] = useState(generateCharacter());
  const [phrasing, setPhrasing] = useState(commonPhrasing);

  useEffect(() => {
    if (character?.background?.phrasing) {
      setPhrasing(character.background.phrasing);
      return;
    }

    setPhrasing(commonPhrasing);
  }, [character]);

  if (!character) return "";

  return (
    <main>
      <header>
        <p>
          <b>
            Unofficial <a href="https://frontierscum.com/">Frontier Scum</a>{" "}
            character generator
          </b>
          <small>
            {" "}
            by <a href="https://mb.maletta.space">Sbax</a>
          </small>
        </p>

        <p>
          <button onClick={() => setCharacter(generateCharacter())}>
            <h3>Roll a new cowboy</h3>
          </button>
        </p>
      </header>
      <section className="character">
        <div className="character-wrapper">
          <section className="main">
            <p>You go by the name</p>
            <h1>
              <b>{character.name}</b>
            </h1>
            <p>and you are</p>
            <h2>
              <b>Wanted {character.deadOrAlive}</b>
            </h2>

            <p>
              for the crime of <b>{character.crime}</b>
            </p>

            <p>
              you have a <b>{character.reward}s bounty</b> on your head.
            </p>
          </section>

          <section className="details">
            <article className="main">
              <ul className="stats">
                <li>
                  <b>GRIT</b>
                  <span>{character.grit}</span>
                </li>
                <li>
                  <b>SLICK</b>
                  <span> {character.slick}</span>
                </li>
                <li>
                  <b>WITS</b>
                  <span>{character.wits}</span>
                </li>
                <li>
                  <b>LUCK</b>
                  <span>{character.luck}</span>
                </li>
                <li>
                  <b>HP</b>
                  <span>{character.hp}</span>
                </li>
              </ul>
            </article>

            <p>
              You're a <b>{character.background.name}</b> with{" "}
              {character.outlaw
                .map((string) => string.toLowerCase())
                .map((string) => <b key={uuidv4()}>{string}</b>)
                .reduce((first, last) => [first, " and ", last])}
              .
            </p>
            <p>
              You have a skill {phrasing.skill}{" "}
              {character.background.skills
                .map((string) => string.toLowerCase())
                .map((string) => <b key={uuidv4()}>{string}</b>)
                .reduce((first, last) => [
                  first,
                  ` and one ${phrasing.skill} `,
                  last,
                ])}
              .
            </p>
            <p>
              You also have {commonPhrasing.skill}{" "}
              <b>{character.bonus.skill.toLowerCase()}</b>.
            </p>
            <div>
              You have some <b>{phrasing.item}</b>, meaning:
              <ul>
                {character.background.items.map((string) => (
                  <li key={uuidv4()}>
                    <b>{string}</b>
                  </li>
                ))}
                <span>you also have</span>
                <li>
                  <b>{character.bonus.item}</b>
                </li>
                <li>
                  <b>A canteen with a day's worth of water</b>
                </li>
                {character.silver ? (
                  <li>
                    <b>{character.silver} silver</b>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <p>
              You shoot a <b>{character.gun}</b> and you have an item slot's
              worth of ammunition.
            </p>
            <p>
              You wear a{" "}
              <b>
                {character.hat.condition} {character.hat.color}{" "}
                {character.hat.material} hat
              </b>{" "}
              and mount a stolen <b>{character.horse.type.toLowerCase()}</b> (
              <i>{character.horse.notes}</i>) with a{" "}
              <b>{character.horse.coat.toLowerCase()} coat</b> which likes{" "}
              <b>{character.horse.likes.toLowerCase()}</b> saddled and with
              saddlebags.
            </p>
          </section>
        </div>
      </section>

      <footer>
        <p>
          <b>FRONTIER SCUM</b> is copyright <b>Den of Druids.</b>
        </p>
        <p>
          This generator is an independent production by{" "}
          <a href="https://mb.maletta.space">Sbax</a> and is not affiliated with{" "}
          <b>Den of Druids</b>. It is published under the{" "}
          <a href="https://frontierscum.com/license">
            <b>FRONTIER SCUM Third-Party License.</b>
          </a>
        </p>
      </footer>
    </main>
  );
}

export default App;
