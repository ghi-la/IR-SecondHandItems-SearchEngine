import { Document } from '@/store/models';

const DocumentPresentation = ({ document }: { document: Document }) => {
  return (
    <>
      <img src={document.imageURI} alt={document.title} />
      <div>{document.title}</div>
      <div>{document.price}</div>
      <div>{document.currency}</div>
      <div>{document.shippingCost}</div>
    </>
  );
};

export default DocumentPresentation;
