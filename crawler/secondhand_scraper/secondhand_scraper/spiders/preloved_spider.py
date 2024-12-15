import scrapy


class PrelovedSpider(scrapy.Spider):
    name = "preloved"
    allowed_domains = ["preloved.co.uk"]
    start_urls = ["https://www.preloved.co.uk/"]

    custom_settings = {
        "FEEDS": {
            "../../../../data/preloved_output.jsonl": {
                "format": "jsonlines",
                "encoding": "utf8",
                "overwrite": True,
            }
        }
    }

    def parse(self, response):
        links = response.css("a::attr(href)").extract()
        links = set(links)

        for link in links:
            if link.startswith("/"):
                link = response.urljoin(link)

            yield scrapy.Request(link, callback=self.parse_page)

    def parse_page(self, response):
        page_name = response.css("title::text").get().strip()
        yield {"url": response.url, "page_name": page_name}
