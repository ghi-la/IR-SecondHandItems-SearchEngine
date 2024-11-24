import scrapy

class SecondHandSpider(scrapy.Spider):
    name = "secondhand"
    allowed_domains = ["secondhand.org.uk"]
    start_urls = ["https://www.secondhand.org.uk/"]

    def parse(self, response):
        # Extract the links from the page
        links = response.css("a::attr(href)").extract()

        # Debug: Print the number of links found
        self.log(f"Found {len(links)} links on {response.url}")

        # # Debug: Print the number of links found
        # self.log(f"Found {len(links)} links on {response.url}")
        
        # for link in links:
        #     # Ensure the link is absolute
        #     if link.startswith("/"):
        #         link = response.urljoin(link)

        #     yield {'link': link}
