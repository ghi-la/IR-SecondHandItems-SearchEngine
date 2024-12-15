'use client';

import { Document } from '@/store/models';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPresentation from './DocumentPresentation';

const ResultsPresentation = () => {
  const dispatch = useDispatch();
  const documents: Document[] = useSelector(
    (state: any) => state.documents.resultDocuments
  );

  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const categories = documents.reduce((acc: any, doc: Document) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {});

  const categoryKeys = Object.keys(categories);
  const totalPages =
    categoryKeys.length > 0
      ? Math.ceil(categories[categoryKeys[value]].length / 10)
      : 0;

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {categoryKeys.map((category, index) => (
            <Tab
              key={category}
              label={`${category} (${categories[category].length})`}
            />
          ))}
        </Tabs>
      </Box>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ width: '100%', margin: '0 auto' }}
      >
        {categoryKeys.length > 0 &&
          categories[categoryKeys[value]]
            .slice(page * 10, (page + 1) * 10)
            .map((document: Document) => (
              <Grid key={document.docno}>
                <DocumentPresentation document={document} />
              </Grid>
            ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </Button>
        <span style={{ margin: '0 10px' }}>
          Page {page + 1} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={
            categoryKeys.length === 0 ||
            (page + 1) * 10 >= categories[categoryKeys[value]].length
          }
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default ResultsPresentation;
