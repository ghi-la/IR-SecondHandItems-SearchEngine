# SecondHand Items Search Engine

## An Information Retrieval Project

**Authors**: Ghilardini Matteo & Toscano Sasha

## How to run

To setup Scrapy:

```bash
python -m venv .venv
source .venv/bin/activate
pip install scrapy
```

To run a spider `spiderName` run:

```bash
cd crawler/secondhand_scraper/secondhand_scraper/spiders
scrapy crawl spiderName -o ../../../../data/output.json 
```

## Technologies

### Backend

Our backend will rely on a **Python** base using **fastAPI**; indexing will be done by **PyTerrier**.

### Frontend

As the main core of our frontend, we will use **Next.js** together with **React** and **TypeScript**. To enhance the interface, we will also use the React components provided by **MaterialUI**.

## Steps

### Design
<!-- TODO: Add a picture of the design and the working of the application.
How backend will work (backend itself with PyTerrier), how data are handled, structured, and stored. Show also how frontend and backend will communicate together providing a "documentation-like" fo the RestAPI -->

### Search Engine Implementation
<!-- TODO: how the search engine is actually implemented. Related with the design providing more details related with the implementation; also how the data are provided to the frontend.
<!-- TODO: have a look at scrapy.org
RELATED WITH THE BACKEND -->

### Search Interface Implementation
<!-- TODO: how the frontend is implemented -->

### Evaluation
<!-- TODO: How we perform the userEvaluation, what this influence our system,... -->