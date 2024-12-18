import {
  setAuction,
  setFilterByPrice,
  setFilterCategories,
  setPriceMax,
  setPriceMin,
  toggleIncludeShippingCost,
} from "@/store/actions";
import { Filter, isAuction } from "@/store/models";
import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

interface FiltersProps {
  showCategoryFilter?: boolean;
  alignRight?: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  showCategoryFilter = false,
  alignRight = false,
}) => {
  const dispatch = useDispatch();

  const categories = useSelector((state: any) => state.documents.categories);
  const filter: Filter = useSelector((state: any) => state.filter);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: alignRight ? "column" : "row",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: alignRight ? "flex-end" : "center",
        alignItems: alignRight ? "flex-end" : "center",
      }}
    >
      {showCategoryFilter && (
        <Autocomplete
          disableCloseOnSelect
          multiple
          options={categories}
          renderOption={(props, option: any, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option}
              </li>
            );
          }}
          value={filter.clusters}
          onChange={(e, value) =>
            dispatch(setFilterCategories(value as string[]))
          }
          renderInput={(params) => (
            <TextField
              style={{
                margin: "10px",
                width: "fit-content",
                minWidth: "300px",
              }}
              {...params}
              label="Category"
              variant="outlined"
            />
          )}
        />
      )}
      <Autocomplete
        options={Object.values(isAuction)}
        value={filter.isAuction}
        onChange={(e, value) => dispatch(setAuction(value as isAuction))}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: "10px", width: "fit-content", minWidth: "400px" }}
            label="Consider only Auctions, only Fixed Price, or Both?"
            variant="outlined"
          />
        )}
      />
      <FormControlLabel
        control={
          <Switch
            onChange={() => dispatch(setFilterByPrice(!filter.filterByPrice))}
          />
        }
        style={{ margin: "10px" }}
        label="Filter by price"
      />
      {filter.filterByPrice && (
        <>
          <Divider style={{ width: "100%", visibility: "hidden" }} />
          <TextField
            style={{ margin: "10px", width: "fit-content" }}
            label="Min Price"
            variant="outlined"
            type="number"
            value={filter.priceMin}
            onChange={(e) => dispatch(setPriceMin(parseFloat(e.target.value)))}
          />
          <TextField
            style={{ margin: "10px", width: "fit-content" }}
            label="Max Price"
            variant="outlined"
            type="number"
            value={filter.priceMax}
            onChange={(e) => dispatch(setPriceMax(parseFloat(e.target.value)))}
          />
          <FormControlLabel
            control={
              <Switch
                checked={filter.includeShippingCost}
                onChange={() => dispatch(toggleIncludeShippingCost())}
              />
            }
            label="Include Shipping Cost"
          />
        </>
      )}
    </div>
  );
};

export default Filters;
