import json
import os
from typing import List, TypedDict

import pyterrier as pt


# Define the structure of the document
class Document(TypedDict):
    docno: str
    category: str
    title: str
    price: str
    bestOffer: str
    shippingCost: str
    itemURI: str
    imageURI: str


class IndexDocument(TypedDict):
    docno: str
    text: str


class Indexer:

    def __init__(self, index_destination_path: str):
        # Save the index destination path
        self.index_destination_path = index_destination_path

    @staticmethod
    def load_dataset(dataset_path: str) -> List[Document]:
        """
        Load the dataset from a JSONL file and return a list of documents.

        Parameters
        ----------
        dataset_path : str
            Path to the dataset file.

        Returns
        -------
        List[Document]
            A list of documents loaded from the JSONL file.
        """
        if not os.path.isfile(dataset_path):
            raise FileNotFoundError("Dataset file not found")
        if not dataset_path.endswith(".jsonl"):
            raise ValueError("Dataset file must be in JSONL format")

        documents = []
        with open(dataset_path, "r", encoding="utf-8") as file:
            for idx, line in enumerate(file):
                data = json.loads(line)
                documents.append(
                    Document(
                        docno=f"d{idx + 1}",  # Generate a unique document number
                        category=data.get("category", ""),
                        title=data.get("title", ""),
                        price=data.get("price", ""),
                        bestOffer=data.get("bestOffer", ""),
                        shippingCost=data.get("shippingCost", ""),
                        itemURI=data.get("itemURI", ""),
                        imageURI=data.get("imageURI", ""),
                    ))
        return documents

    def create_index(
        self,
        documents: List[Document],
        overwrite=False,
        stemmer="porter",
        stopwords="terrier",
        tokeniser="UTFTokeniser",
        threads=1,
    ):
        """
        Create an index from a list of documents.

        Parameters
        ----------
        documents : List[Document]
            A list of documents to index.
        overwrite : bool
            Whether to overwrite the existing index.
        stemmer : str
            Stemming method to use.
        stopwords : str
            Stopwords handling method.
        tokeniser : str
            Tokeniser to use.
        threads : int
            Number of threads to use for indexing.

        Returns
        -------
        str
            Reference to the created index.
        """
        # Check if the index already exists
        index_exists = os.path.exists(os.path.join(self.index_destination_path, "data.properties"))
        if index_exists and not overwrite:
            raise FileExistsError("Index already exists. Use overwrite=True to overwrite it.")
        if not os.path.exists(self.index_destination_path):
            os.makedirs(self.index_destination_path)

        def process_document(doc: Document):
            """
            Process a document into a single string of text.

            Parameters
            ----------
            doc : Document
                The document to process.

            Returns
            -------
            str
                A string representation of the document.
            """
            text = f"""
            {doc['category']}
            {doc['title']}
            {doc['price']}
            {doc['bestOffer']}
            {doc['shippingCost']}
            {doc['itemURI']}
            {doc['imageURI']}
            """
            return text

        # Transform documents into a format compatible with PyTerrier
        indexed_docs = [
            IndexDocument(docno=doc["docno"], text=process_document(doc))
            for doc in documents
        ]

        # Create the index
        indexer = pt.IterDictIndexer(
            self.index_destination_path,
            overwrite=True,
            threads=threads,
            stemmer=stemmer,
            stopwords=stopwords,
            tokeniser=tokeniser,
        )
        index_ref = indexer.index(indexed_docs, meta=["docno"])
        return index_ref

    @staticmethod
    def retrieve_index(index_ref: str):
        """
        Retrieve an index from the given index reference.

        Parameters
        ----------
        index_ref : str
            Path to the index reference.

        Returns
        -------
        pt.IndexFactory
            The loaded PyTerrier index.
        """
        return pt.IndexFactory.of(index_ref)
