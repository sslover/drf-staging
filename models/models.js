var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// team member schema
var memberSchema = new Schema({
	name : { type: String, required: true },
 	slug : { type: String, lowercase: true, required: true, unique: true },
	school : String,
	company : String,
	tag : String,
	bio : String,
	email : String,
	webURL : String,
	twitterURL : String,
	linkedInURL : String,
	githubURL : String,
	photoThumb : String,
	photo : String
})

var Member = mongoose.model('Member', memberSchema);

// company schema
var companySchema = new Schema({
	name : { type: String, required: true },
	tag : String,
	cityText : String,
	webURL : String,
	photo : String
})

var Company = mongoose.model('Company', companySchema);

// define submission schema
var submissionSchema = new Schema({
	name : { type: String, required: true},
	email : { type: String, required: true},
	phone : String,
	title : String,
	school : String,
	presence : String,
	cofounders : String,
	companyname : { type: String, required: true},
	url : String,
	description : { type: String, required: true},
	founderstory : String,
	bizmodel : String,
	competitors : String,
	fundraising : String,
	traction : String,
	useoffunds : String,
	pitchURL : String,
	city : { type: String, required: true},
    datesubmitted : { type: Date, default: Date.now }
});

var Submission = mongoose.model('Submission', submissionSchema);

// model for Boston emails

var bostonEmailSchema = new Schema({
	email : { type: String, required: true},
    datesubmitted : { type: Date, default: Date.now }
});

var BostonEmail = mongoose.model('BostonEmail', bostonEmailSchema);

var bostonRSVPSchema = new Schema({
	name : { type: String, required: true},
	email : { type: String, required: true},
	school : String,
	degree : String,
	concentration : String,
	linkedInURL : String,
	startup : String,
    datesubmitted : { type: Date, default: Date.now }
});

var BostonRSVP = mongoose.model('BostonRSVP', bostonRSVPSchema);

// export models
module.exports = {
    Member: Member,
    Company: Company,
    Submission: Submission,
    BostonEmail: BostonEmail,
    BostonRSVP: BostonRSVP
};

// in index.js can reference like:
// var models = require('./schema');
// models.User.findOne(...