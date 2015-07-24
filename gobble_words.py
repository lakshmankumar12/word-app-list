#!/usr/bin/python

import re
import sys
import random
from select import select
from termios import tcflush, TCIOFLUSH

types=['n','v','adv?','adj','interj?','conj','prep','pa','Latin','Greek']
pattern=r'^(.*)\b('
for i in types[:-1]:
  pattern = pattern + i + '|'
pattern = pattern + types[-1] + r')\b\.(.*)$'

regex = re.compile(pattern)

words = {}

with open("words_one_line","r") as fd:
  for i in fd:
    result = regex.search(i)
    if result == None:
      print "Line didn't match:%s"%i
      sys.exit(1)
    word=result.group(1).strip()
    wordtype=result.group(2).strip()
    meaning=result.group(3).strip()
    words[word] = [wordtype,meaning]


timeout = 5
max = 100

for x in range(max):
  word = random.choice(words.keys())
  print "\n\nQuestion %d:"%x
  print "What is the meaning of %s?"%word
  rlist, wlist, xlist = select([sys.stdin], [], [], timeout)
  tcflush(sys.stdin, TCIOFLUSH)
  print "Answer is\n%s"%(words[word][1])
