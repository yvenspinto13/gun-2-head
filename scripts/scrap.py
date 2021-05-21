import requests
from bs4 import BeautifulSoup
from download import download

archiveLink = "https://www.goa.gov.in/covid-19-archives/"
currentLink = "https://www.goa.gov.in/covid-19/"

def get_links():
    links = []
    page = requests.get(currentLink)
    soup = BeautifulSoup(page.content, 'html.parser')
    # Media-B
    for item in soup.select("a[href*='Media']"):
        # print(item['href'])
        links.append(item['href'])
    return links

def download_link(link, exten= None):
    return download(link, '../data/covid-reports', '', exten)

def download_links(links, exten = None):
    for i in links:
        download(i, '../data/covid-reports', '', exten)