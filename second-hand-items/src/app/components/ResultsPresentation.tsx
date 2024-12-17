'use client';

import { Document, ParsedCluster } from '@/store/models';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPresentation from './DocumentPresentation';

const ITEMS_PER_PAGE = 10;

const ResultsPresentation = () => {
  const dispatch = useDispatch();
  const clusters: ParsedCluster[] = useSelector(
    (state: any) => state.documents.resultDocuments
  );

  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setPage(0); // Reset to the first page
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const allDocuments = clusters.flatMap((cluster) => cluster.documents);

  const categories = clusters.reduce((acc: any, cluster: ParsedCluster) => {
    if (!acc[cluster.label]) {
      acc[cluster.label] = [];
    }
    acc[cluster.label].push(...cluster.documents);
    return acc;
  }, {});

  const sortedCategoryKeys = Object.keys(categories).sort(
    (a, b) => categories[b].length - categories[a].length
  );

  const totalPages =
    value === 0
      ? Math.ceil(allDocuments.length / ITEMS_PER_PAGE)
      : sortedCategoryKeys.length > 0 &&
        categories[sortedCategoryKeys[value - 1]]
      ? Math.ceil(
          categories[sortedCategoryKeys[value - 1]].length / ITEMS_PER_PAGE
        )
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
          <Tab key="all" label={`All (${allDocuments.length})`} />
          {sortedCategoryKeys.map((category, index) => (
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
        {value === 0
          ? allDocuments
              .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
              .map((document: Document) => (
                <Grid key={document.docno}>
                  <DocumentPresentation document={document} />
                </Grid>
              ))
          : sortedCategoryKeys.length > 0 &&
            categories[sortedCategoryKeys[value - 1]]
              .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
              .map((document: Document) => (
                <Grid key={document.docno}>
                  <DocumentPresentation document={document} />
                </Grid>
              ))}
      </Grid>
      <Divider />
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
            value === 0
              ? (page + 1) * ITEMS_PER_PAGE >= allDocuments.length
              : sortedCategoryKeys.length === 0 ||
                (page + 1) * ITEMS_PER_PAGE >=
                  categories[sortedCategoryKeys[value - 1]].length
          }
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default ResultsPresentation;
