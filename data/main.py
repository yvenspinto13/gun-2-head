from extract import get_file_list, write_file_list, extract_and_append_file
from scrap import get_links, download_links, download_link
from download import gen_filename


def download_extract_all():
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

def download_interactive():
    currentLinks = get_links()
    print(currentLinks)
    link = input('\n Enter the link you want to download:')
    fileN = download_link(link, '.pdf')
    extract_and_append_file(fileN.split('.pdf')[0])

# download_interactive()
fileN = input('\n Enter the file to extract:')
extract_and_append_file(fileN.split('.pdf')[0])