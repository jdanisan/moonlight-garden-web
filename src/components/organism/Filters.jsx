import { InputLabel } from "../molecules/InputLabel";
import { Button } from "../atoms/Button";

export function Filters({
  filters = {},
  handleChange,
  options = {},
  filterType = "characters",
  resetFilters,
}) {
  return (
    <section className="filters-menu">
      <form className="filter-chat">
        {filterType === "characters" && (
          <>
            <InputLabel
              label="Input a Name: "
              type="text"
              name="name"
              inputClassName="browser-name"
              value={filters.name || ""}
              onChange={handleChange}
              placeholder=""
            />

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

            <InputLabel
              label="Order "
              type="select"
              name="order"
              value={filters.order || ""}
              onChange={handleChange}
              placeholder="Without order"
              options={[
                { label: "Order A-Z", value: "asc" },
                { label: "Order Z-A", value: "desc" },
              ]}
            />
            <Button
              label="Remove Filters"
              id="remove-filters"
              class="remove-filters"
              type="button"
              onClick={resetFilters}
            />
          </>
        )}

        {filterType === "locations" && (
          <>
            <InputLabel
              label="Type "
              type="select"
              name="type"
              value={filters.type || ""}
              onChange={handleChange}
              placeholder="Select Type"
              options={options.type || []}
            />
            <Button
              label="Remove Filters"
              id="remove-filters"
              class="remove-filters"
              type="button"
              onClick={resetFilters}
            />
          </>
        )}
      </form>
    </section>
  );
}
