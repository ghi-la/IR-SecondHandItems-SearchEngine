'use client';

import { fetchAllItems, searchItems } from '@/services/documents';
import { isLoaded, isLoading } from '@/store/actions';
import { Filter } from '@/store/models';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResultsPresentation from '../components/ResultsPresentation';

const Results = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); // Access the query parameter
  const documents = useSelector((state: any) => state.documents);
  const filters: Filter = useSelector((state: any) => state.filter);

  useEffect(() => {
    dispatch(isLoading());
    console.log(documents.useFilters, filters);

    if (query) {
      // Call the searchItems function from the documents service
      // Set the results state with the response
      searchItems(query)
        .then((response) => {
          console.log(response);
          //   const filteredDocuments = filterDocuments(
          //     response,
          //     documents.useFilters,
          //     filters
          //   );
          //   console.log(filteredDocuments);
          //   dispatch(setResultDocuments(filteredDocuments));
        })
        .catch((error) => {
          console.error('Error searching items:', error);
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    } else {
      fetchAllItems()
        .then((response) => {
          console.log(response);
          //   const filteredDocuments = filterDocuments(
          //     response,
          //     documents.useFilters,
          //     filters
          //   );
          //   console.log(filteredDocuments);
          //   dispatch(setResultDocuments(filteredDocuments));
        })
        .catch((error) => {
          console.error('Error searching items:', error);
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    }
  }, [query]);

  return (
    <>
      <div>
        <h1>Query Parameter Page</h1>
        <span>Query: {query}</span>
        <span>Results count: {documents.resultDocuments.length}</span>
      </div>

      <ResultsPresentation />
    </>
  );
};

export default Results;
