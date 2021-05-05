from extract import get_file_list, write_file_list
from scrap import get_links, download_links

existingFiles = get_file_list('./covid-reports/')
builtDictionary = {}
for val in existingFiles:
    builtDictionary[val]=True

currentLinks = get_links()
nonDownloadedLinks = []
for l in currentLinks:
    tr = '_' + l.split('/')[-1].split('.pdf')[0]
    if tr not in builtDictionary:
        nonDownloadedLinks.append(l)

print('\n*******Non downloaded links******\n',nonDownloadedLinks)
download_links(nonDownloadedLinks, '.pdf')
write_file_list()