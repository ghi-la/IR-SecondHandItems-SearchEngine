# SecondHand Items Search Engine

## An Information Retrieval Project

**Authors**: Ghilardini Matteo & Toscano Sasha

**Files**: All of our files are publicly findable in our repository `https://github.com/ghi-la/IR-SecondHandItems-SearchEngine`

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

Our backend will rely on a **Python** base using **fastAPI**; indexing will be done by **PyTerrier** and as scraper we use **Scrapy**.

### Frontend

As the main core of our frontend, we will use **React** and **TypeScript**. To enhance the interface, we will also use the React components provided by **MaterialUI**.

## Steps

### Design

 Still todo: Add a picture of the design and the working of the application.
How backend will work (backend itself with PyTerrier), how data are handled, structured, and stored. Show also how frontend and backend will communicate together providing a "documentation-like" fo the RestAPI

### Crawler (Scrapy)

 We decided to use Scrapy and have already successfully implemented it and ran it. The output of our spider `secondhand_spider.py` can be seen in `output.json`. We implemented it in such a way that our spider goes on `secondhand.org.uk`, it extracts all the links that compose the site (removing duplicates) that correspond to different categories. Then in each of the pages we extract (for now) name of the article, price of the article and the link to the image of the article. The format of our output is the following:

 ``` json
[{
    "category": "Name of the category", 
    "items": 
        [{
            "title": "name of the item", 
            "price": "price of the item", 
            "image": "link to the image"
        }, {
            "title": "name of the item", 
            "price": "price of the item", 
            "image": "link to the image"
        }, 
        {...}]},
{
    "category": "Name of the category", 
    "items":[...]
}]
 ```

### Search Engine Implementation

 Still todo: how the search engine is actually implemented. Related with the design providing more details related with the implementation; also how the data are provided to the frontend.Plus how the frontend and the backend will communicate

### Search Interface Implementation

 Still todo: how the frontend is implemented

### Evaluation

 Still todo: How we perform the userEvaluation, what influence our system,...
