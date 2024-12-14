import { fetchAllItems, searchItems } from '@/services/documents';
import {
  isLoaded,
  isLoading,
  setAuction,
  setFilterByPrice,
  setFilterCategories,
  setPriceMax,
  setPriceMin,
  setResultDocuments,
  toggleIncludeShippingCost,
} from '@/store/actions';
import { Filter, isAuction } from '@/store/models';
import { filterDocuments } from '@/utils/documentsUtils';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Filters = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state: any) => state.documents.categories);
  const filter: Filter = useSelector((state: any) => state.filter);

  const ABSOLUTE_MAX_PRICE = filter.priceMax;

  const [query, setQuery] = useState('');

  function handleSearch() {
    dispatch(isLoading());
    if (!filter.filterByPrice) {
      dispatch(setPriceMax(ABSOLUTE_MAX_PRICE));
      dispatch(setPriceMin(0));
    }
    if (query) {
      searchItems(query)
        .then((items) => {
          dispatch(setResultDocuments(filterDocuments(items, filter)));
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    } else {
      fetchAllItems()
        .then((items) => {
          dispatch(setResultDocuments(filterDocuments(items, filter)));
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    }
  }

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setQuery(e.target.value)}
      />

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
        value={filter.categories}
        onChange={(e, value) =>
          dispatch(setFilterCategories(value as string[]))
        }
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
      <FormControlLabel
        control={
          <Switch
            onChange={() => dispatch(setFilterByPrice(!filter.filterByPrice))}
          />
        }
        label="Filter by price"
      />
      {filter.filterByPrice && (
        <>
          <TextField
            label="Min Price"
            variant="outlined"
            type="number"
            value={filter.priceMin}
            onChange={(e) => dispatch(setPriceMin(parseFloat(e.target.value)))}
          />
          <TextField
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
      <Autocomplete
        options={Object.values(isAuction)}
        value={filter.isAuction}
        onChange={(e, value) => dispatch(setAuction(value as isAuction))}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Consider only Auctions, only Fixed Price, or Both?"
            variant="outlined"
          />
        )}
      />
      <Button onClick={handleSearch}>Search</Button>
    </>
  );
};
export default Filters;
