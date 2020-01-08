#!/usr/bin/python

# permissions need to be 755 or more restrictive.
import cgi, sys, cgitb, csv, json

sys.stderr = sys.stdout # Make sure we can see any errors

cgitb.enable(display=0, logdir="pylogs")

data 						= cgi.FieldStorage()
fileName   					= data.getvalue("fileName", "FILENAME_NULL")
autoWorkerID 				= data.getvalue("autoWorkerID", "AUTOWORKERID_NULL")
excludedFileName   			= data.getvalue("excludedFileName", "EXCLUDEDFILENAME_NULL")
startDate					= data.getvalue("startDate", "STARTDATE_NULL")
endDate						= data.getvalue("endDate", "ENDDATE_NULL")
userAgentString 			= data.getvalue("userAgentString", "USERAGENTSTRING_NULL")
trialNums 					= json.loads(data.getvalue("trialNums", "TRIALNUMS_NULL"))
firstHalfProbabilities 		= json.loads(data.getvalue("firstHalfProbabilities", "FIRSTHALFPROBABILITIES_NULL"))
secondHalfProbabilities 	= json.loads(data.getvalue("secondHalfProbabilities", "SECONDHALFPROBABILITIES_NULL"))
deckColors 					= json.loads(data.getvalue("deckColors", "DECKCOLORS_NULL"))
deckPositions				= json.loads(data.getvalue("deckPositions", "DECKPOSITIONS_NULL"))
deckProbabilities			= json.loads(data.getvalue("deckProbabilities", "DECKPROBABILITIES_NULL"))
deckProbabilityOrder 		= json.loads(data.getvalue("deckProbabilityOrder", "DECKPROBABILITYORDER_NULL"))
colors 						= json.loads(data.getvalue("colors", "COLORS_NULL"))
keys 						= json.loads(data.getvalue("keys", "KEYS_NULL"))
positions 					= json.loads(data.getvalue("positions", "POSITIONS_NULL"))
probabilities 				= json.loads(data.getvalue("probabilities", "PROBABILITIES_NULL"))
results 					= json.loads(data.getvalue("results", "RESULTS_NULL"))
reversals 					= json.loads(data.getvalue("reversals", "REVERSALS_NULL"))
RT 							= json.loads(data.getvalue("RT", "RT_NULL"))
score 						= json.loads(data.getvalue("score", "SCORE_NULL"))
excludedReason 				= data.getvalue("excludedReason", "EXCLUDEDREASON_NULL")

if excludedReason != "NA":	
	fileName = excludedFileName

numRows = len(trialNums)
# Write to the file - XXX FIX BASED ON ROW INDEX
with open(fileName, 'a') as csvFile:
	csvWriter = csv.writer(csvFile, delimiter=",")

	for row in range(numRows):
		csvWriter.writerow([autoWorkerID, startDate, endDate, userAgentString, trialNums[row],
			firstHalfProbabilities, secondHalfProbabilities, deckColors[row], deckPositions[row],
			deckProbabilities[row], deckProbabilityOrder[row], colors[row], keys[row], positions[row],
			probabilities[row], results[row], reversals[row], RT[row], score[row], excludedReason])

sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')
sys.stdout.write('Done.')