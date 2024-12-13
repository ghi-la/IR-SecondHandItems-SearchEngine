import { Document, DocumentsInfo, InputDocument } from '@/store/models';
import { parseDocument } from '@/utils/documentsUtils';
import axios from 'axios';
import dotenv from 'dotenv';

const PYTERRIER = 'http://localhost:8000';
const PYTERRIER_API = 'http://localhost:8000/api';

dotenv.config();

export const getHealth = async () => {
  try {
    const response = await axios.get(`${PYTERRIER}/health`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching health:', error);
  }
};
export const fetchAllItems = async () => {
  try {
    const response = await axios.get(`${PYTERRIER_API}/all`);
    const documents: Document[] = response.data.map((doc: InputDocument) =>
      parseDocument(doc)
    );

    return documents;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const searchItems = async (query: string) => {
  try {
    const response = await axios.get(`${PYTERRIER_API}/search`, {
      params: { query },
    });
    const documents: Document[] = response.data.map((doc: InputDocument) =>
      parseDocument(doc)
    );

    return documents;
  } catch (error) {
    console.error('Error searching items:', error);
    throw error;
  }
};

export const getDocumentsInfo = async () => {
  try {
    const response = await axios.get(`${PYTERRIER_API}/all`);
    const documents: Document[] = response.data.map((doc: InputDocument) =>
      parseDocument(doc)
    );
    const categories = documents.map((doc: Document) => doc.category);
    const maxPrice = Math.max(...documents.map((doc: Document) => doc.price));
    const documentsInfo: DocumentsInfo = {
      categories: Array.from(new Set(categories)),
      priceMax: maxPrice,
    };
    return documentsInfo;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
