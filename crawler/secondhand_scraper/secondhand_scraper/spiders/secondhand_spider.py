import os

import scrapy


class SecondHandSpider(scrapy.Spider):
    name = "secondhand"
    allowed_domains = ["secondhand.org.uk"]
    start_urls = ["https://www.secondhand.org.uk/"]

    custom_settings = {
        "FEEDS": {
            "../../../../data/secondhand_output.json": {
                "format": "jsonlines",
                "encoding": "utf8",
                "overwrite": True,
            }
        }
    }

    # # delete the output file if it already exists
    # if os.path.exists("../../../../data/output.json"):
    #     os.remove("../../../../data/output.json")

    def parse(self, response):
        # Extract the links from the page
        links = response.css("a::attr(href)").extract()

        # remove duplicates
        links = set(links)

        # Debug: Print the number of links found
        self.log(f"Found {len(links)} links on {response.url}")

        for link in links:
            # Ensure the link is absolute
            if link.startswith("/"):
                link = response.urljoin(link)

            yield scrapy.Request(link, callback=self.parse_category)

    def parse_category(self, response):
        category = response.css(
            "li.ubermenu-current-menu-ancestor > a > span::text"
        ).extract_first()
        subcategory = response.css(
            "div.usercontent > h1::text").extract_first()

        # Extract all items from the page
        listings = response.css("table#listings > tr")

        for item in listings:
            # Extract title, price and image link from the page
            title = item.css("td#title > a  > p::text").extract_first()
            price = item.css("td#price > p::text").extract_first()
            shippingCost = item.css(
                "td#price >div.shipping-cost > p::text").extract_first()
            itemURI = item.css(
                "td#price > div.view-item > a::attr(href)").extract_first()
            bestOffer = item.css(
                "td#price > div.best-offer > p::text").extract_first() or ""
            imageURI = item.css("td#image img::attr(src)").extract_first()

            yield {
                "category": category,
                "subcategory": subcategory,
                "title": title,
                "price": price,
                "bestOffer": bestOffer,
                "shippingCost": shippingCost,
                "itemURI": itemURI,
                "imageURI": imageURI,
            }
