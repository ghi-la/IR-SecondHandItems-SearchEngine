import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Filters = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state: any) => state.documents.categories);

  return (
    <>
      <h1>Filters, cat = {categories.length}</h1>

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
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
    </>
  );
};
export default Filters;
