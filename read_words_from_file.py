import re
import sys

def get_words(fileName):
  types=['n','v','adv?','adj','interj?','conj','prep','pa','Latin','Greek']
  pattern=r'^(.*)\b('
  for i in types[:-1]:
    pattern = pattern + i + '|'
  pattern = pattern + types[-1] + r')\b\.(.*)$'

  regex = re.compile(pattern)

  words = {}
  words_by_number = {}

  totalWords = 0
  wordNumber = 0

  with open(fileName,"r") as fd:
    for i in fd:
      result = regex.search(i)
      if result == None:
        print "Line didn't match:%s"%i
        sys.exit(1)
      word=result.group(1).strip()
      wordtype=result.group(2).strip()
      meaning=result.group(3).strip()
      words[word] = [wordtype,meaning,wordNumber]
      words_by_number[wordNumber] = word
      wordNumber += 1
    totalWords = wordNumber

  return (words,words_by_number,totalWords)

