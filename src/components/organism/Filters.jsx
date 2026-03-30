import { InputLabel } from "../molecules/InputLabel";
export function Filters({ filters = {}, handleChange, options = {} }) {
  return (
    <section className="filters-menu">
      <form className="filter-chat">
          <InputLabel
            label="Species "
            type="select"
            name="species"
            value={filters.species || ""}
            onChange={handleChange}
            placeholder="Select Species"
            options={options.species || []}
          />

          <InputLabel
            label="Status "
            type="select"
            name="status"
            value={filters.status || ""}
            onChange={handleChange}
            placeholder="Select Status"
            options={options.status || []}
          />

          <InputLabel
            label="Gender "
            type="select"
            name="gender"
            value={filters.gender || ""}
            onChange={handleChange}
            placeholder="Select Gender"
            options={options.gender || []}
          />
      </form>
    </section>
  );
}
