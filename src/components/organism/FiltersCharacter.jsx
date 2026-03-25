export function FiltersCharacter({type}){
  if (!['characters', 'locations'].includes(type))
    return null;

    return(
        <section className="filters-menu">
        <form id="filter-chat" className="filter-chat">

          <div className="input-group">
            <label for="browser-name">Input a name:</label>
            <input type="text" id="browser-name" />
          </div>

          <div className="input-group">
            <label for="species-characters">{label}</label>
            <select id="species-characters" name="species-characters">
              <option value="index">Select specie</option>
            </select>
          </div>

          <div className="input-group">
            <label for="status-characters">Status:</label>
            <select id="status-characters" name="status-characters">
              <option value="index">Select status</option>
            </select>
          </div>

          <div className="input-group">
            <label for="gender-characters">Gender:</label>
            <select id="gender-characters" name="gender-characters">
              <option value="index">Select gender</option>
            </select>
          </div>

          <div className="input-group">
            <label for="order-select">Order:</label>
            <select id="order-select" name="orderAZ">
              <option value="index" selected>Without order</option>
              <option value="az">Order A-Z</option>
              <option value="za">Order Z-A</option>
            </select>
          </div>

          <div className="input-group">
            <button id="remove-filters" className="remove-filters" type="button">
              Remove filters
            </button>
          </div>
        </form>
      </section>
    )
}