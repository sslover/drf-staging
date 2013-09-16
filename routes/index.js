
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var request = require('request'); // library to make requests to remote urls

var moment = require("moment"); // date manipulation library
var models = require("../models/models.js"); //db model
//for submissions, use models.Submission
//for team members, use models.Member
//for companies, use models.Company

/*
  GET /
*/
exports.index = function(req, res) {
    
    console.log("home page requested");

    //build and render template; simply HTML page
    var templateData = {
		pageTitle : "Dorm Room Fund",
		pageDescription : "Dorm Room Fund is a student-run venture firm that invests in student-run companies. Our team is all students and our mission is to inspire and support more careers in the startup industry. We believe that a relatively small amount of capital can help student founders take their ideas from the dorm room to the market."
	}

    res.render('index.html', templateData);

}

exports.about = function(req, res) {
    
    console.log("about page requested");

    // query the database for all the members with the tag, and return their data

    var membersQuery = models.Member.find({tag:'ra'}); // query for all members matching the tag
    membersQuery.sort('name'); //sort by name

    // return the selected data
    membersQuery.select('name company bio photo school slug');

    membersQuery.exec(function(err, allRAs){

	if (err) {
	    return res.status(500).send("There was an error on the RAs query");
	}

	console.log("retrieved " + allRAs.length + " RAs from database");
	
	//now, move on and get all the FRC people to show on the page

		var frcQuery = models.Member.find({tag:'frc'}); // query for all members matching the tag
	    frcQuery.sort('name'); //sort by name

	    // return the selected data
	    frcQuery.select('name company bio photo school slug');

	    frcQuery.exec(function(err, allFRC){

		if (err) {
		    return res.status(500).send("There was an error on the FRC query");
		}
		
		//prepare template data for the view
		var templateData = {
		    ras : allRAs,
		    frc : allFRC,
		    pageTitle : "About | Dorm Room Fund",
		    pageDescription : "Dorm Room Fund is a student-run venture firm that invests in student-run companies. Our team is all students and our mission is to inspire and support more careers in the startup industry. We believe that a relatively small amount of capital can help student founders take their ideas from the dorm room to the market."
		}

		//render and return the template
		res.render('about.html', templateData);
	
		}); // end of FRC .find query
    }); // end of RAs .find query

}


exports.newyork = function(req, res) {
    
    console.log("newyork page requested");

    // query the database for all the members with the tag, and return their data

    var membersQuery = models.Member.find({tag:'newyork'}); // query for all members matching the tag
    membersQuery.sort('name'); //sort by name

    // return the selected data
    membersQuery.select('name slug school photo');

    membersQuery.exec(function(err, allMembers){

	if (err) {
	    return res.status(500).send("There was an error on the members query");
	}

	if (allMembers == null) {
	    return res.status(404).render('404.html');
	}

	console.log("retrieved " + allMembers.length + " members from database");

		//now, ping db for alumni of the city

		    var alumniQuery = models.Member.find({tag:'newyork-alumni'}); // query for all members matching the tag
		    alumniQuery.sort('name'); //sort by name

		    // return the selected data
		    alumniQuery.select('name slug school photo');

		    alumniQuery.exec(function(err, allAlumni){

			if (err) {
			    return res.status(500).send("There was an error on the alumni query");
			}

			if (allAlumni == null) {
			    return res.status(404).render('404.html');
			}

			console.log("retrieved " + allAlumni.length + " alumni from database");

				//prepare template data for the view
				var templateData = {
				    members : allMembers,
				    alumni : allAlumni,
				    pageTitle : "NYC Dorm Room Fund",
		    		pageDescription : "Dorm Room Fund NYC is a student-run venture firm that invests in student-run companies in the Greater New York area. Our team is all students and our aim is to help our peers build amazing companies."				    
				}
			
				//render and return the template
				res.render('newyork.html', templateData);

		    });  //end alumni query
	
    }); // end of .find query
}


exports.bayarea = function(req, res) {
    
    console.log("bayarea page requested");

    // query the database for all the members with the tag, and return their data

    var membersQuery = models.Member.find({tag:'bayarea'}); // query for all members matching the tag
    membersQuery.sort('name'); //sort by name

    // return the selected data
    membersQuery.select('name slug school photo');

    membersQuery.exec(function(err, allMembers){

	if (err) {
	    return res.status(500).send("There was an error on the members query");
	}

	if (allMembers == null) {
	    return res.status(404).render('404.html');
	}

	console.log("retrieved " + allMembers.length + " members from database");

		//now, ping db for alumni of the city

		    var alumniQuery = models.Member.find({tag:'bayarea-alumni'}); // query for all members matching the tag
		    alumniQuery.sort('name'); //sort by name

		    // return the selected data
		    alumniQuery.select('name slug school photo');

		    alumniQuery.exec(function(err, allAlumni){

			if (err) {
			    return res.status(500).send("There was an error on the alumni query");
			}

			if (allAlumni == null) {
			    return res.status(404).render('404.html');
			}

			console.log("retrieved " + allAlumni.length + " alumni from database");

				//prepare template data for the view
				var templateData = {
				    members : allMembers,
				    alumni : allAlumni,
				    pageTitle : "Bay Area Dorm Room Fund",
				    pageDescription : "Dorm Room Fund SF is a student-run venture firm that invests in student-run companies in the Greater Bay Area. We are here to help our peers pursue their ideas, launch new ventures and build amazing companies. Along the way, we provide seed funding (generally $20,000), business and legal resources and connections to a fantastic team of mentors who have built their own successful businesses. We are by students, for students."
				}
			
				//render and return the template
				res.render('bayarea.html', templateData);

		    });  //end alumni query
	
    }); // end of .find query

}

exports.philly = function(req, res) {
    
    console.log("philly page requested");

    // query the database for all the members with the tag, and return their data

    var membersQuery = models.Member.find({tag:'philly'}); // query for all members matching the tag
    membersQuery.sort('name'); //sort by name

    // return the selected data
    membersQuery.select('name slug school photo');

    membersQuery.exec(function(err, allMembers){

	if (err) {
	    return res.status(500).send("There was an error on the members query");
	}

	if (allMembers == null) {
	    return res.status(404).render('404.html');
	}

	console.log("retrieved " + allMembers.length + " members from database");

		//now, ping db for alumni of the city

		    var alumniQuery = models.Member.find({tag:'philly-alumni'}); // query for all members matching the tag
		    alumniQuery.sort('name'); //sort by name

		    // return the selected data
		    alumniQuery.select('name slug school photo');

		    alumniQuery.exec(function(err, allAlumni){

			if (err) {
			    return res.status(500).send("There was an error on the alumni query");
			}

			if (allAlumni == null) {
			    return res.status(404).render('404.html');
			}

			console.log("retrieved " + allAlumni.length + " alumni from database");

				//prepare template data for the view
				var templateData = {
				    members : allMembers,
				    alumni : allAlumni,
				    pageTitle : "Philly Dorm Room Fund",
				    pageDescription : "Dorm Room Fund Philly is a student-run venture firm that invests in student-run companies. Our team is all students and our mission is to inspire and support more careers in the startup industry. We believe that a relatively small amount of capital can help student founders take their ideas from the dorm room to the market. The Dorm Room Fund aims to be the first choice for student entrepreneurs in the greater Philadelphia region who need capital to start their amazing businesses." 
				}
			
				//render and return the template
				res.render('philly.html', templateData);

		    });  //end alumni query
	
    }); // end of .find query

}

exports.boston = function(req, res) {
    
    console.log("boston page requested");

    // query the database for all the members with the tag, and return their data

    var membersQuery = models.Member.find({tag:'boston'}); // query for all members matching the tag
    membersQuery.sort('name'); //sort by name

    // return the selected data
    membersQuery.select('name slug school photo');

    membersQuery.exec(function(err, allMembers){

	if (err) {
	    return res.status(500).send("There was an error on the members query");
	}

	if (allMembers == null) {
	    return res.status(404).render('404.html');
	}

	console.log("retrieved " + allMembers.length + " members from database");
	
	//prepare template data for the view
	var templateData = {
	    members : allMembers,
	    formjs : 'true',
	    pageTitle : "Boston Dorm Room Fund",
	    pageDescription : "Dorm Room Fund Boston is a student-run venture firm that invests in student-run companies. Our team is all students and our mission is to inspire and support more careers in the startup industry. We believe that a relatively small amount of capital can help student founders take their ideas from the dorm room to the market. The Dorm Room Fund aims to be the first choice for student entrepreneurs in the greater Philadelphia region who need capital to start their amazing businesses."
	}

	//render and return the template
	res.render('boston.html', templateData);
	
    }); // end of .find query

}

exports.bostonSubmission = function(req, res) {
    
    console.log("received boston submit form submission");
    console.log(req.body);

    // accept form post data
    var newSubmission = new models.BostonRSVP({
		email : req.body.email,
		name : req.body.name,
		school : req.body.school,
		degree : req.body.degree,
		concentration : req.body.concentration,
		linkedInURL : req.body.linkedInURL,
		startup : req.body.startup
    });
    
    // save the newSubmission to the database
    newSubmission.save(function(err){
	if (err) {
	    console.error("Error on saving boston submission");
	    console.error(err); // log out to Terminal all errors

	    var templateData = {
		page_title : 'Boston Dorm Room Fund',
	    pageDescription : "Dorm Room Fund Boston is a student-run venture firm that invests in student-run companies. Our team is all students and our mission is to inspire and support more careers in the startup industry. We believe that a relatively small amount of capital can help student founders take their ideas from the dorm room to the market. The Dorm Room Fund aims to be the first choice for student entrepreneurs in the greater Philadelphia region who need capital to start their amazing businesses.",
		formjs : true
	};

	    res.render('boston.html', templateData);

	} else {
	    console.log("Created a new Boston submission!");
	    console.log(newSubmission);
	    
	    // redirect to the confirmation page
	    res.redirect('/rsvp-confirmation');
	}
    });    
}

exports.portfolio = function(req, res) {
    
    console.log("portfolio page requested");

    // query the database for all the companies in the portfolio and return their data

    var companiesQuery = models.Company.find({}); // query all companies
    companiesQuery.sort('name'); //sort by name

    // return the selected data
    companiesQuery.select('name tag cityText webURL school photo');

    companiesQuery.exec(function(err, allCompanies){

	if (err) {
	    return res.status(500).send("There was an error on the portfolio page search");
	}

	if (allCompanies == null) {
	    return res.status(404).render('404.html');
	}

	console.log("retrieved " + allCompanies.length + " companies from database");
	
	//prepare template data for the view
	var templateData = {
	    companies : allCompanies,
	    pageTitle : "Portfolio | Dorm Room Fund",
	    pageDescription : "The portfolio of companies in the Dorm Room Fund community."
	}

	//render and return the template
	res.render('portfolio.html', templateData);
	
    }); // end of .find query

}

/*
  GET /:user_name
*/
exports.member = function(req, res) {
    console.log("detail page requested for " + req.params.user_name);

    var user_name = req.params.user_name;
    // //get the requested team member by the param on the url :user_name

    // query the database for this team member, and put their data
    var memberQuery = models.Member.findOne({slug:user_name});
    memberQuery.exec(function(err, currentMember){

	if (err) {
	    return res.status(500).send("There was an error trying to get this team member!");
	}

	if (currentMember == null) {
	    return res.status(404).redirect('/404');
	}

	console.log("We're retrieving: " + currentMember.name);
	
	// get the city out of it too
	var currentCity;
	var currentCityTag;
	if (currentMember.tag == "newyork" || currentMember.tag == "newyork-alumni"){
	    currentCity = "NYC";
	    currentCityTag = "newyork";
	}
	else if(currentMember.tag == "philly" || currentMember.tag == "philly-alumni"){
	    currentCity = "Philly";
	    currentCityTag = "philly";
	}
	else if(currentMember.tag == "bayarea" || currentMember.tag == "bayarea-alumni"){
	    currentCity = "Bay Area";
	    currentCityTag = "bayarea";
	}
	else if(currentMember.tag == "boston" || currentMember.tag == "boston-alumni"){
	    currentCity = "Boston";
	    currentCityTag = "boston";
	}
	else if(currentMember.tag == "ra"){
	    currentCity = "RA";
	    currentCityTag = "ra";
	}		
	else if(currentMember.tag == "frc"){
	    currentCity = "FRC";
	    currentCityTag = "frc";
	}	
	//prepare all this data for the view
	var templateData = {
	    member : currentMember,
	    city : currentCity,
	    citytag : currentCityTag,
	    pageTitle : currentMember.name + " | Dorm Room Fund ",
	    pageDescription : currentMember.bio
	}

	if (currentCity == "NYC" || currentCity == "Philly" || currentCity == "Bay Area" || currentCity == "Boston"){
	    //render and return the template
	    res.render('team-member.html', templateData);
	}

	else if (currentCity == "RA" || currentCity == "FRC"){
	    //render and return the template
	    res.render('ra-member.html', templateData);
	}
	
    }); // end of .findOne query
}


/*
  GET /apply
*/
exports.submissionForm = function(req, res){

    var templateData = {
		pageTitle : 'Tell Us About Your Startup | Dorm Room Fund',
	    pageDescription : "Tell us about your company for possible Dorm Room Fund funding and partnership.",
		formjs : true
    };

    res.render('submit_form.html', templateData);
}

/*
  POST /apply
*/

var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "nyapply@dormroomfund.com",
        pass: 'frclovesdrf'
    }
});

exports.createSubmission = function(req, res) {
    
    console.log("received submit form submission");
    console.log(req.body);

    // accept form post data
    var newSubmission = new models.Submission({
		name : req.body.name,
		email : req.body.email,
		phone : req.body.phone,
		title : req.body.title,
		school : req.body.school,
		presence : req.body.presence,
		cofounders : req.body.cofounders,
		companyname : req.body.companyname,
		url : req.body.url,
		description : req.body.description,
		founderstory : req.body.founderstory,
		bizmodel : req.body.bizmodel,
		competitors : req.body.competitors,
		fundraising : req.body.fundraising,
		traction : req.body.traction,
		useoffunds : req.body.useoffunds,
		city : req.body.city,
		pitchURL : req.body.pitchURL
    });
    
    // save the newSubmission to the database
    newSubmission.save(function(err){
	if (err) {
	    console.error("Error on saving new submission");
	    console.error(err); // log out to Terminal all errors

	    var templateData = {
		pageTitle : 'Tell Us About Your Startup | Dorm Room Fund',
	    pageDescription : "Tell us about your company for possible Dorm Room Fund funding and partnership.",
		errors : err.errors, 
		submission : req.body,
		formjs : true
	};

	    res.render('submit_form.html', templateData);

	} else {
	    console.log("Created a new submission!");
	    console.log(newSubmission);
	    
	    // redirect to the confirmation page
	    res.redirect('/confirmation');
	}
    });


    //Set the email to send the form to the correct Gust group
    if (newSubmission.city == 'philly'){
        drf_branch = 'new@dormroomfund.groups.gust.com';
        console.log('sending to philly...');
    }
    else if (newSubmission.city == 'newyork'){
        drf_branch = 'new@dorm-room-fund-new-york.groups.gust.com';
        console.log('sending to ny...');
    }
    else if (newSubmission.city == 'bayarea'){
        drf_branch = 'new@drfbay.groups.gust.com';
        console.log('sending to bay...');
    }
    else if (newSubmission.city == 'boston'){
        drf_branch = 'newsubmissions@drfboston.groups.gust.com';
        console.log('sending to bost...');
    }
    else if (newSubmission.city == 'other'){
        drf_branch = 'newsubmissions@dorm-room-fund.groups.gust.com';
        console.log('sending to other...');
    }
    else {
        console.log('Error - city does not exsist');
    }

    //Parse the response into a readable text email
    var form_text = '';
    var keys = ['name',
                'email',
                'phone',
                'title',
                'school',
                'presence',
                'cofounders',
                'companyname',
                'url',
                'description',
                'founderstory',
                'bizmodel',
                'competitors',
                'fundraising',
                'traction',
                'useoffunds',
                'city',
                'pitchURL'];
    //var keys = Object.keys(newSubmission);
    for (var i = 0; i < keys.length; i++){
        form_text += '**' + keys[i] + '**\n';
        form_text += newSubmission[keys[i]] + '\n\n';
    };
        

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from:  "nyapply@dormroomfund.com", // sender address
        to: drf_branch, // list of receivers
        subject: newSubmission.companyname, // Subject line
        text: form_text, // plaintext body
        html: "" // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
    
};

exports.confirmation = function(req, res) {
    
    console.log("confirmation page");

    //build and render template; simply HTML page
    var templateData = {
		pageTitle : "Submission Successful | Dorm Room Fund",
	    pageDescription : "Your submission has been received."
    }

    res.render('confirmation.html', templateData);


}

// 
exports.rsvpConfirmation = function(req, res) {
    
    console.log("RSVP confirmation page");

    //build and render template; simply HTML page
    var templateData = {
		pageTitle : "RSVP Successful | Dorm Room Fund",
	    pageDescription : "Your submission has been received."
    }

    res.render('rsvp-confirmation.html', templateData);


}

exports.errorPage = function(req, res) {
    
    console.log("404 error page");

    //build and render template; simply HTML page
    var templateData = {
		pageTitle : "Page Not Found | Dorm Room Fund",
	    pageDescription : "That page does not exist."
    }

    res.render('404.html', templateData);


}
