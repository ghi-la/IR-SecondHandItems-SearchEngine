import { Document } from '@/store/models';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPresentation from './DocumentPresentation';

const ResultsPresentation = () => {
  const dispatch = useDispatch();

  const documents: Document[] = useSelector(
    (state: any) => state.documents.resultDocuments
  );

  const categories = useSelector((state: any) => state.documents.categories);

  const [resultsData, setResultsData] = useState<any>([]);

  useEffect(() => {
    const results = categories.map((category: string) => ({
      category,
      count: documents.filter((document) => document.category === category)
        .length,
    }));
    setResultsData(results);
  }, [documents]);

  return (
    <div>
      {resultsData
        .filter((result: any) => result.count > 0)
        .map((result: any) => (
          <div key={result.category}>
            <Accordion>
              <AccordionSummary>
                {result.category}: {result.count} results
              </AccordionSummary>

              <AccordionDetails>
                {documents
                  .filter((document) => document.category === result.category)
                  .map((document) => (
                    <DocumentPresentation
                      key={document.docno}
                      document={document}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </div>
  );
};

export default ResultsPresentation;
