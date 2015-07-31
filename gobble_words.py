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
words_by_number = {}

totalWords = 0
wordNumber = 0

with open("words_one_line","r") as fd:
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

untested = list(range(totalWords))
done = []

def get_alternate_words(word, maxWords):
  ''' Given a word amongst maxWords, this returns 4
      random numbers between (0..maxWords-1) other
      than word.

      This is useful to pick alternate choices for
      a given word in a word-test
  '''
  result=[]
  for i in range(4):
    done = 0
    while not done:
      number = random.randint(0,maxWords-1)
      if number != word and number not in result:
        result.append(number)
        done = 1
  return result

timeout = 30
max_questions = 100

def print_a_question(number, word, choices, words_by_number, words):
  print ""
  print "Question %d:"%number
  print "What is the meaning of %s?"%words_by_number[word]
  print ""
  print "Choices are"
  for i in range(5):
    print "%d. %s"%(i+1,words[words_by_number[choices[i]]][1])

correct = 0
for x in range(max_questions):
  word = random.choice(untested)
  choices = get_alternate_words(word, totalWords)
  choices.append(word)
  random.shuffle(choices)
  correct_choice = choices.index(word)
  print_a_question(x, word, choices, words_by_number, words)

  print "Answer:",
  sys.stdout.flush()
  rlist, wlist, xlist = select([sys.stdin], [], [], timeout)
  choice = raw_input()
  tcflush(sys.stdin, TCIOFLUSH)

  if int(choice) == (correct_choice + 1):
    correct += 1
    print "Correct Answer %s"%choice
  else:
    print "Wrong."
    print "your choice is %s, but right answer is %d"%(choice, correct_choice+1)
  print "Score so far: %d/%d (%d)%%"%(correct,x+1,(correct*100.0)/(x+1))
