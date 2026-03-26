import TemplateCharacters from '../templates/TemplateCharacters'
import { FiltersCharacter } from '../organism/FiltersCharacter';
import { Cards } from '../molecules/Cards';
import { GoTopBTN } from '../atoms/GoTopBTN';

export default function CharactersPage() {
  return (
    <TemplateCharacters>
      <h1>Personajes</h1>
      <div className="cards">
          <FiltersCharacter type={1}/>
          <Cards character={1} />
          <GoTopBTN />
        </div>
    </TemplateCharacters>
  );
}