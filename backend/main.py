from fastapi import FastAPI
from utils.pyterrier_utils import load_data

DATA_PATH = "../data/output.jsonl"

app = FastAPI()


@app.get("/")
def read_root():
    return {load_data(DATA_PATH)}
