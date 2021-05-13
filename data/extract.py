import textract
import json
import re
from datetime import datetime
import glob

pattern = re.compile('(st|nd|rd|th|,)')
raw = '/raw/'
js = 'json/'
ext = '.pdf'
folder = './covid-reports/'


# REALLLY NEED TO MAKE THIS SCRIPT REACTIVE ..................... 


def get_new(nn):
        return nn.split('(')[0]

def get_percent(nn):
        return nn.split('%')[0]

def get_file_list(fl):
        l = glob.glob(fl + '*.pdf')
        l = [f.split('/')[2].split('.')[0] for f in l]
        return l

def extract_float(data,r_index,index, isPercent = False):
        try:
                val = float(get_percent(data[index]) if isPercent else data[index])
                return val
        except ValueError:
                r_index += 1
                return extract_float(data,r_index,index+1)

def extract_int(data,r_index,index, isNew = False):
        try:
                val = int(get_new(data[index]) if isNew else data[index])
                return val
        except ValueError:
                r_index += 1
                return extract_int(data,r_index,index+1)


def get_extracted_json(lines):
        extractJson = {}
        extractJson['institiution'] = {}
        extractJson['institiution']['head'] = lines[0]
        extractJson['institiution']['sub'] = lines[1]
        extractJson['institiution']['address'] = lines[2]
        extractJson['institiution']['telephone'] = lines[3].split(' ')[1]
        extractJson['institiution']['email'] = lines[4].split(':')[1]
        extractJson['date'] = lines[5]
        coreData = lines[10:]
        r_index = 0
        print(coreData)
        extractJson['recovery_rate']=extract_float(coreData, r_index, r_index+1, isPercent=True)
        extractJson['recovered_patients']= extract_int(coreData, r_index, r_index+1)
        extractJson['recovery_24']= extract_int(coreData, r_index, r_index+2)
        extractJson['home_isolation']= {}
        extractJson['home_isolation']['cummulative']= extract_int(coreData, r_index, r_index+9)
        extractJson['home_isolation']['new']= extract_int(coreData, r_index, r_index+11, isNew=True)
        extractJson['hospitalized']= {}
        extractJson['hospitalized']['cummulative']=extract_int(coreData, r_index, r_index+10)
        extractJson['hospitalized']['new']=extract_int(coreData, r_index, r_index+12, isNew=True)
        extractJson['tested']= {}
        extractJson['tested']['cummulative']=extract_int(coreData, r_index, r_index+27)
        extractJson['tested']['new']= extract_int(coreData, r_index, r_index+13, isNew=True)
        extractJson['total_cases']= {}
        extractJson['total_cases']['cummulative']=extract_int(coreData, r_index, r_index+18)
        extractJson['total_cases']['new']=extract_int(coreData, r_index, r_index+20, isNew=True)
        extractJson['deaths']= {}
        extractJson['deaths']['cummulative']=extract_int(coreData, r_index, r_index+19)
        extractJson['deaths']['new']=extract_int(coreData, r_index, r_index+21, isNew=True)
        extractJson['test_per_million']=extract_int(coreData, r_index, r_index+23)
        extractJson['positivity_rate']= (extractJson['total_cases']['new'] / extractJson['tested']['new']) * 100
        extractJson['active_cases']=extract_int(coreData, r_index, r_index+25)
        print(extractJson)
        return extractJson


def get_json_name(fileName):
        try:
                return str(datetime.strptime(pattern.sub('', fileName.split('Media-Bulletin-')[1]),'%d-%B-%Y').date())
        except Exception:
                return str(datetime.strptime(pattern.sub('', fileName.split('MediaBulletin-')[1]),'%d%B%Y').date())
        

def process_file(fileN):
        fileName =  folder +  fileN
        rawText = folder + 'raw/' + fileN + '.txt'
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
        extractJson = get_extracted_json(lines)

        jsonName = get_json_name(fileN)

        with open(folder + js + jsonName +'.json', 'w') as jof:
                json.dump(extractJson, jof)

        return extractJson

def write_file_list():
        cummulativeList = []
        exceptionList = []
        fileList = get_file_list(folder)
        for fileN in fileList:
                print('\n============= writing file ', fileN)
                try:
                        extractJson = process_file(fileN)
                        cummulativeList.append(extractJson)
                except Exception as err:
                        ex = {}
                        ex['fileName'] = fileName
                        ex['exception'] = err.__str__()
                        exceptionList.append(ex)

        with open(folder + js + 'cummulative.json', 'w') as jof:
                json.dump(cummulativeList, jof)

        with open(folder + js + 'exceptions.json', 'w') as exf:
                json.dump(exceptionList, exf)


def append_to_file(fileName, content):
        with open(fileName, 'r+') as file:
                data = json.load(file)
                data.append(content)
                file.truncate(0)
                file.seek(0)
                json.dump(data, file)

def extract_and_append_file(fileN):
        e_json = {}
        fileName =  folder +  fileN
        isErr = False
        try:
                e_json = process_file(fileN)
        except Exception as err:
                print(err)
                isErr = True
                e_json['fileName'] = fileName
                e_json['exception'] = err.__str__()
        append_to_file(folder + js + ('exceptions.json' if isErr else 'cummulative.json'), e_json)
        return isErr