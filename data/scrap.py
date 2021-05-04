import requests
from bs4 import BeautifulSoup
from download import download

archiveLink = "https://www.goa.gov.in/covid-19-archives/"
currentLink = "https://www.goa.gov.in/covid-19/"

page = requests.get(currentLink)
soup = BeautifulSoup(page.content, 'html.parser')
for item in soup.select("a[href*='Media-B']"):
    print(item['href'])
    download(item['href'], './covid-reports', '')