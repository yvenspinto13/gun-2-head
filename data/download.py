import os
import requests

def gen_filename(url: str,index: str, exten = None):
    filename = url.split('/')[-1].split('?')[0].replace(" ", "_")  # be careful with file names
    filename = index + '_' + filename
    if exten != None:
        filename = filename.split(exten)[0].rstrip('-') + exten
    return filename

def download(url: str, dest_folder: str, index: str, exten = None):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)  # create folder if it does not exist

    filename = gen_filename(url, index, exten)
    file_path = os.path.join(dest_folder, filename)

    r = requests.get(url,headers={'User-Agent': 'firefox'}, stream=True)
    if r.ok:
        print("saving to", os.path.abspath(file_path))
        with open(file_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024 * 8):
                if chunk:
                    f.write(chunk)
                    f.flush()
                    os.fsync(f.fileno())
    else:  # HTTP status code 4XX/5XX
        print("Download failed: status code {}\n{}".format(r.status_code, r.text))
    
    return filename