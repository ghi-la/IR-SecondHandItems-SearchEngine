import { setUseFilters } from '@/store/actions';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from './Filters';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filter = useSelector((state: any) => state.filter);
  const documents = useSelector((state: any) => state.documents);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  function handleSearch() {
    router.push(`/results?query=${query}`);
  }

  function toggleFilters() {
    setShowFilters(!showFilters);
    dispatch(setUseFilters(!showFilters));
  }

  return (
    <>
      <h1>Search</h1>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <FormControlLabel
        control={<Switch checked={showFilters} onChange={toggleFilters} />}
        label="Use Filters"
      />
      {showFilters && <Filters />}
    </>
  );
};

export default Search;
