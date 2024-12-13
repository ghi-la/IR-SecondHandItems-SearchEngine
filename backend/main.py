from contextlib import asynccontextmanager

from fastapi import FastAPI
from utils.pyterrier_utils import Indexer

DATA_PATH = "../data/output.jsonl"
INDEX_PATH = "../data/index"


@asynccontextmanager
async def lifespan(app: FastAPI):
    indexer = Indexer(INDEX_PATH)

    # Load the dataset
    print("Loading dataset...")
    documents = indexer.load_dataset(DATA_PATH)

    # Create the index
    print("Creating index...")
    index_ref = indexer.create_index(documents)

    # Confirm index creation
    print(f"Index created at {index_ref}")
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)
