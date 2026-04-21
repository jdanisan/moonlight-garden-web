import { InputLabel } from "../molecules/InputLabel";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export function Filters({
  filters = {},
  handleChange,
  options = {},
  filterType = "characters",
  resetFilters,
}) {
  return (
    <section className="w-3/4 max-w-7xl mx-auto p-6 flex flex-wrap gap-5 justify-center items-center bg-primary-500 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-border mb-1.5">
      <form className="flex flex-wrap gap-4 justify-center items-center">
        {filterType === "characters" && (
          <>
            <Input
              label="Input a name:"
              id="name"
              name="name"
              type="text"
              className="flex-1 min-w-30 py-2 px-3 rounded-md bg-card text-primary-50 text-sm outline-none transition-all duration-200 ease-in-out focus:border-primary-400 focus:shadow-primary-300"
              value={filters.name || ""}
              onChange={handleChange}
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
                { label: "Ascendancy", value: "asc" },
                { label: "Descendant", value: "desc" },
              ]}
            />
            <Button
              label="Remove Filters"
              id="remove-filters"
              class="remove-filters"
              variant="removeFilters"
              type="button"
              onClick={resetFilters}
            />
          </>
        )}

        {filterType === "locations" && (
          <>
            <InputLabel
              label="Select type: "
              type="select"
              name="type"
              value={filters.type || ""}
              onChange={handleChange}
              placeholder="Type of Locations"
              options={options.type || []}
            />
            <Button
              label="Remove Filters"
              id="remove-filters"
              variant="removeFilters"
              type="button"
              onClick={resetFilters}
            />
          </>
        )}
      </form>
    </section>
  );
}
