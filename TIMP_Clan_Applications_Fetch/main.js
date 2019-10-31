var timpApplicant = function(gamerTag, discordTag, applicationStatus, accepts, rejects, others, application) 
{
	this.gamerTag = gamerTag;
	this.discordTag = discordTag;
	this.applicationStatus = applicationStatus;
	this.accepts = accepts;
	this.rejects = rejects;
	this.others = others;
    this.application = application;
}

var timpApplicants = [];

function getTotalApplicationsCount()
{
	var i, j, totalApplicationsCount, applicationBlocks;

	totalApplicationsCount = 0;

	applicationBlocks = document.getElementsByClassName("containerCozyBounded-1rKFAn containerCozy-jafyvG container-1YxwTf");

	for( i=0; i<applicationBlocks.length; i++)
	{
		try
		{
			for( j=0; j<applicationBlocks[i].childElementCount; j++)
			{
				if( applicationBlocks[i].children[j].innerHTML.indexOf("NEW-Clan Application") != -1 )
				{
					totalApplicationsCount++;
				}
			}
		}
		catch( error )
		{
			console.log(i, j, "getTotalApplicationsCount" , error);

			continue;
		}
	}

	return totalApplicationsCount;
}

function getApplicantGamerTag(applicantDetails)
{
	var start, i, n, gamerTag;

	start = 94;

	for(i=start, n=applicantDetails.length, gamerTag=""; i<n; i++)
	{
		if( applicantDetails[i] != "\n" )
		{
			gamerTag += applicantDetails[i];
		}
		else
		{
			break;
		}
	}

	return gamerTag;
}

function getApplicantDiscordTag(applicantDetails)
{
	var start, i, n, discordTag;

	start = applicantDetails.indexOf("Name of Applicant:")

	if( start != -1 )
	{
		for(i=start+18, n=applicantDetails.length, discordTag=""; i<n; i++)
		{
			discordTag += applicantDetails[i];
		}
	}

	return discordTag;
}

function Main()
{
	var i, j, k;

	var allApplications, totalApplicationsCount, currentApplication, emoji, trejected, taccepted, tother, pending;

	var currentApplicant, currentApplicantGamerTag, currentApplicantDiscordTag, currentApplicantStatus,
	 currentApplicantAccepts, currentApplicantRejects, currentApplicantOthers, currentApplicantApplication;

	rejected = accepted = other = pending = 0;

	totalApplicationsCount = getTotalApplicationsCount();

	allApplications = document.getElementsByClassName("containerCozyBounded-1rKFAn containerCozy-jafyvG container-1YxwTf");

	for(i=0; i<allApplications.length; i++)
	{
		currentApplication = allApplications[i];

		for(j=0; j<currentApplication.childElementCount-1; j++)
		{
			try
			{
				emoji = currentApplication.children[j].getElementsByClassName("reactionInner-rRPZdY");

				for(k=trejected=taccepted=tother=0; k<emoji.length; k++)
				{
					emojiPath = emoji[k].firstChild.src;

					if( emojiPath.indexOf("b1868d829b37f0a81533ededb9ffe5f4") != -1 )
					{
						trejected++;
					}
					else if( emojiPath.indexOf("5b68b417ff72b3a2f4c24426d1064b66") != -1 || emojiPath.indexOf("1edfe735f87e201398d505124c421812") != -1 )
					{
						taccepted++;
					}
					else
					{
						tother++;
					}
				}

				if( taccepted > 0 )
				{
					accepted++;
				}

				else if( trejected > 0 )
				{
					rejected++;
				}

				else if( tother > 0 )
				{
					other++;
				}

				if( currentApplication.children[j].getElementsByClassName("embedDescription-1Cuq9a").length != 0 )
				{
					if( currentApplication.children[j].getElementsByClassName("embedDescription-1Cuq9a")[0].innerText.indexOf("NOTE: This application has been") == 0 )
					{
						continue;
					}

					currentApplicantApplication = currentApplication.children[j].getElementsByClassName("embedDescription-1Cuq9a")[0].innerText;

					currentApplicantGamerTag = getApplicantGamerTag(currentApplicantApplication);

					currentApplicantDiscordTag = getApplicantDiscordTag(currentApplicantApplication);

					currentApplicantStatus = (taccepted > trejected);

					currentApplicantAccepts = taccepted;

					currentApplicantRejects = trejected;

					currentApplicantOthers = tother;

					if( (j != 0) && timpApplicants[timpApplicants.length-1].discordTag == undefined )
					{
						timpApplicants[timpApplicants.length-1].discordTag = currentApplicantDiscordTag;

						continue;
					}

					currentApplicant = new timpApplicant(currentApplicantGamerTag, currentApplicantDiscordTag, currentApplicantStatus, 
						currentApplicantAccepts, currentApplicantRejects, currentApplicantOthers,currentApplicantApplication);

					timpApplicants.push(currentApplicant);
				}
			}
			catch ( error )
			{
				console.log(i, j, k, "Main", error);

				continue;
			}
		}

		pending = totalApplicationsCount - (accepted + rejected + other);
	}

	console.log("======================================================================================================");

	console.log("Pending:- " + pending);
	console.log("Rejected:- " + rejected);
	console.log("Accepted:- " + accepted);
	console.log("Accepted/Other:- " + other);
	console.log("Total Applications:- " + totalApplicationsCount);
	console.log("Acceptance Ratio:- " + (accepted/totalApplicationsCount));

	console.log("======================================================================================================");
}

Main();

timpApplicants;
