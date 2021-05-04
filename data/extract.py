import textract
import json
import re
from datetime import datetime
import glob

def get_new(nn):
        return int(nn.split('(')[0])

pattern = re.compile('(st|nd|rd|th|,)')

cummulativeList = []
exceptionList = []
raw = '/raw/'
js = 'json/'
ext = '.pdf'
folder = './covid-reports/'
fileList = glob.glob(folder+'*.pdf')
fileList = [f.split('/')[2].split('.')[0] for f in fileList]
for fileN in fileList:
    fileName =  folder +  fileN
    print('\n============= writing file ', fileN)
    rawText = folder + 'raw/' + fileN + '.txt'
    try:
        text = textract.process(fileName + ext)
        text = text.decode('ascii')
        text_file = open(rawText, "w")
        text_file.write(text)
        text_file.close()

        lines = []
        with open(rawText) as st:
            lines = st.read().splitlines()
            lines = [string for string in lines if string != ""]
            # print(lines)

        
        extractJson = {}
        extractJson['institiution'] = {}
        extractJson['institiution']['head'] = lines[0]
        extractJson['institiution']['sub'] = lines[1]
        extractJson['institiution']['address'] = lines[2]
        extractJson['institiution']['telephone'] = lines[3].split(' ')[1]
        extractJson['institiution']['email'] = lines[4].split(':')[1]
        extractJson['date'] = lines[5]
        coreData = lines[10:36]
        extractJson['recovery_rate']=float(coreData[0].split('%')[0])
        extractJson['recovered_patients']= int(coreData[1])
        extractJson['recovery_24']= int(coreData[2])
        extractJson['home_isolation']= {}
        extractJson['home_isolation']['cummulative']= int(coreData[9])
        extractJson['home_isolation']['new']=  get_new(coreData[11])
        extractJson['hospitalized']= {}
        extractJson['hospitalized']['cummulative']= int(coreData[10])
        extractJson['hospitalized']['new']=  get_new(coreData[12])
        extractJson['tested']= {}
        extractJson['tested']['cummulative']=int(coreData[24])
        extractJson['tested']['new']=  get_new(coreData[13])
        extractJson['total_cases']= {}
        extractJson['total_cases']['cummulative']=int(coreData[18])
        extractJson['total_cases']['new']= get_new(coreData[20])
        extractJson['deaths']= {}
        extractJson['deaths']['cummulative']=int(coreData[19])
        extractJson['deaths']['new']= get_new(coreData[21])
        extractJson['test_per_million']=int(coreData[23])
        extractJson['positivity_rate']= (extractJson['total_cases']['new'] / extractJson['tested']['new']) * 100
        extractJson['active_cases']=int(coreData[25])
        print(extractJson)

        jsonName = str(datetime.strptime(pattern.sub('', fileN.split('Media-Bulletin-')[1]),'%d-%B-%Y').date())

        cummulativeList.append(extractJson)

        with open(folder + js + jsonName +'.json', 'w') as jof:
            json.dump(extractJson, jof)
    except Exception as err:
        ex = {}
        ex['fileName'] = fileName
        ex['exception'] = err.__str__()
        exceptionList.append(ex)

with open(folder + js + 'cummulative.json', 'w') as jof:
        json.dump(cummulativeList, jof)

with open(folder + js + 'exceptions.json', 'w') as exf:
        json.dump(exceptionList, exf)