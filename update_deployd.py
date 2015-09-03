#!/usr/bin/python

import read_words_from_file
import requests
import json


(words,words_by_number,totalWords) = read_words_from_file.get_words("words_one_line")

url = "http://localhost:2403/word-list"
headers = {'content-type': 'application/json'}

for i in words:
  payload = {}
  payload["word"] = i
  payload["type"] = words[i][0]
  payload["meaning"] = words[i][1]
  payload["wordNumber"] = words[i][2]
  response = requests.post(url, data=json.dumps(payload), headers=headers)
