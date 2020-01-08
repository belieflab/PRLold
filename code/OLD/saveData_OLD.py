#!/usr/bin/python

# permissions need to be 755 or more restrictive.
import cgi, sys, os, datetime, cgitb, csv

sys.stderr = sys.stdout # Make sure we can see any errors

cgitb.enable(display=0, logdir="pylogs")

data 						= cgi.FieldStorage()
fileName   					= data.getvalue("fileName", "FILENAME_NULL")
autoWorkerID 				= data.getvalue("autoWorkerID", "AUTOWORKERID_NULL")
excludedFileName   			= data.getvalue("excludedFileName", "EXCLUDEDFILENAME_NULL")
startDate					= data.getvalue("startDate", "STARTDATE_NULL")
endDate						= data.getvalue("endDate", "ENDDATE_NULL")
userAgentString 			= data.getvalue("userAgentString", "USERAGENTSTRING_NULL")
trialNums 					= data.getvalue("trialNums", "TRIALNUMS_NULL")
firstHalfProbabilities 		= data.getvalue("firstHalfProbabilities", "FIRSTHALFPROBABILITIES_NULL")
secondHalfProbabilities 	= data.getvalue("secondHalfProbabilities", "SECONDHALFPROBABILITIES_NULL")
deckColors 					= data.getvalue("deckColors", "DECKCOLORS_NULL")
deckPositions				= data.getvalue("deckPositions", "DECKPOSITIONS_NULL")
deckProbabilities			= data.getvalue("deckProbabilities", "DECKPROBABILITIES_NULL")
deckProbabilityOrder 		= data.getvalue("deckProbabilityOrder", "DECKPROBABILITYORDER_NULL")
colors 						= data.getvalue("colors", "COLORS_NULL")
keys 						= data.getvalue("keys", "KEYS_NULL")
positions 					= data.getvalue("positions", "POSITIONS_NULL")
probabilities 				= data.getvalue("probabilities", "PROBABILITIES_NULL")
results 					= data.getvalue("results", "RESULTS_NULL")
reversals 					= data.getvalue("reversals", "REVERSALS_NULL")
RT 							= data.getvalue("RT", "RT_NULL")
score 						= data.getvalue("score", "SCORE_NULL")
excludedReason 				= data.getvalue("excludedReason", "EXCLUDEDREASON_NULL")

if excludedReason != "NA":	
	fileName = excludedFileName


# Write to the file
with open(fileName, 'a') as csvFile:
	csvWriter = csv.writer(csvFile, delimiter=",")
	csvWriter.writerow([autoWorkerID, startDate, endDate, userAgentString, trialNums,
		firstHalfProbabilities, secondHalfProbabilities, deckColors, deckPositions,
		deckProbabilities, deckProbabilityOrder, colors, keys, positions,
		probabilities, results, reversals, RT, score, excludedReason])

sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')
sys.stdout.write('Done.')