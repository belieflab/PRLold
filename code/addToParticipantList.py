#!/usr/bin/python

# permissions need to be 755 or more restrictive.
import cgi, sys, os, datetime, cgitb, csv

sys.stderr = sys.stdout # Make sure we can see any errors

cgitb.enable(display=0, logdir="pylogs")

# addToAttritionList(workerID, showEmotionConditionName, testEmotionConditionName, fileName)

data                    = cgi.FieldStorage()
fileName                = data.getvalue("fileName", "FILENAME_NULL")
workerID                = data.getvalue("workerID", "AUTOWORKERID_NULL")
firstHalfProbabilities  = data.getvalue("firstHalfProbabilities", "FIRSTHALFPROBABILITIES_NULL")
secondHalfProbabilities = data.getvalue("secondHalfProbabilities", "SECONDHALFPROBABILITIES_NULL")
startDate               = data.getvalue("startDate", "STARTDATE_NULL")
endDate                 = data.getvalue("endDate", "ENDDATE_NULL")


# Write to the file
with open(fileName, 'a') as csvFile:
	csvWriter = csv.writer(csvFile, delimiter=",")
	csvWriter.writerow([workerID, firstHalfProbabilities, secondHalfProbabilities, startDate, endDate])

sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')
sys.stdout.write('Done.')
