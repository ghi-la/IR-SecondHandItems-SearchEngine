import { Document } from '@/store/models';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPresentation from './DocumentPresentation';

const ResultsPresentation = () => {
  const dispatch = useDispatch();

  const documents: Document[] = useSelector(
    (state: any) => state.documents.resultDocuments
  );

  return (
    <div>
      {documents.map((doc) => (
        <div key={doc.docno}>
          <DocumentPresentation document={doc} />
        </div>
      ))}
    </div>
  );
};

export default ResultsPresentation;
