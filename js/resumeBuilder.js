
var bio = {
    "name": "Jeisse Rocha",
    "role": "Web Developer",
    "contacts": {
        "email": "jeisserocha@gmail.com",
        "mobile": "+353-83-1859999",
        "gitHub": "jeisse",
        "location": "Dublin, IE"
    },
    "wellComeMessage": "Obsessive thorough responsive web develpemnt, with HTML 5, CSS 3, jQuery and Bootstrap",
    "skill": [
        "HTML5",
        "CSS3",
        "JS",
        "jQuery",
        "Angular",
        "Java",
        "GIT",
        "PHP",
        "Scrum",
        "Analysis",
        "SQL"
    ],
    "myPicture": "images/jr.png"
};

var work = {
    "jobs": [
        {
            "employer": "Xetec LTDa",
            "title": "Software Developer",
            "dates": "December 2013 until now",
            "location": "Bray, IE",
            "description": "Work as a Back-End and Front-End on a small team, doing several taks."
        },
        {
            "employer": "Terra.com",
            "title": "Web Developer",
            "dates": "March 2012 until August 2013",
            "location": "Porto Alegre, RS, Brazil",
            "description": "Worked on several teams and different fronts, such as special pages for the London Olympics, and UX CMS migration standardization for Spain, calendar pages of sports, new pages of videos portal Terra."
        },
        {
            "employer": "Procergs",
            "title": "Software Developer",
            "dates": "January 2012 until April 2012",
            "location": "Porto Alegre, RS, Brazil",
            "description": "Worked with Java EE and Oracle on a ERP."
        },
        {
            "employer": "Cia Salux",
            "title": "Software Developer",
            "dates": "January 2011 until January 2012",
            "location": "Porto Alegre, RS, Brazil",
            "description": "Worked with Powerbuilder and Oracle on a ERP for Hospitals."
        },
        {
            "employer": "Cia Star4",
            "title": "Software Developer",
            "dates": "June 2010 until January 2011",
            "location": "Taquara, RS, Brazil",
            "description": "Worked with Javascript and Php on a ERP for the footwear market."
        }
    ]
};

var project = {
    "projects": [
        {
            "title": "FlexMaint Software",
            "dates": 2014,
            "description": "A CMMS Software migrated fromn a desktop version to a new web based version.",
            "image": "images/flexmaint.png"
        },
        {
            "title": "TerraTv",
            "dates": 2013,
            "description": "Terra Networks, S.A. is a Spanish Internet multinational company with headquarters in Spain and Brazil.",
            "image": "images/terratv.jpg"
        },
        {
            "title": "Easilocks WebSite",
            "dates": 2015,
            "description": "Easilocks WebSite is to know more about the brand, purchase products, buy training, find physical stores.",
            "image": "images/easilocks.png"
        }
    ]
};
  
var education = {
    "schools": [
        {
            "name": "FATEC - Senac RS",
            "degree": "Higher Level",
            "dates": "2013",
            "city": "Porto Alegre, RS, Brazil",
            "major": "Ver o que colocar aqui"
        }
    ],
    "onlineCourses": [
        {
            "title": "Front-End Web Developer Nanodeegree",
            "school": "Nanodeegree",
            "dates": "2015",
            "url": "https://www.udacity.com"
        },
        {
            "title": "Learn how to learn",
            "school": "Coursera",
            "dates": 2015,
            "url": "http://www.coursera.com"
        }
    ]
};

var menu = {
    "items": [
        {
            "description": "Home",
            "link": "#header"
        },
        {
            "description": "Work Experience",
            "link": "#workExperience"
        },
        {
            "description": "Projects",
            "link": "#projects"
        },
        {
            "description": "Education",
            "link": "#education"
        },
        {
            "description": "Map",
            "link": "#mapDiv"
        }
    ]
};

function setMenu(){
  for (var i in menu.items){
    var formatedItem = menuItem.replace('%link%', menu.items[i].link).replace('%description%', menu.items[i].description);	
    $(".container ul").append(formatedItem);
  }
}

bio.display = function() {
  var formatedName = HTMLheaderName.replace("%data%", bio.name);
  var formatedRole = HTMLheaderRole.replace("%data%", bio.role);

  var fomatedEmail = HTMLemail.replace("%data%", bio.contacts.email);
  var fomatedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
  var fomatedGitHub = HTMLgithub.replace("%data%", bio.contacts.gitHub);
  var fomatedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

  var formatedMessage = HTMLwelcomeMsg.replace("%data%", bio.wellComeMessage);
  var formatedPicture = HTMLbioPic.replace("%data%", bio.myPicture);
  var fomatedSkills = [];

  function setTopContacts (place) {
    $(place).prepend(fomatedEmail);  
    $(place).prepend(fomatedMobile);  
    $(place).prepend(fomatedGitHub);  
    $(place).prepend(fomatedLocation);
  }

  for(i=0; i < bio.skill.length; i++ ){
    var skill = HTMLskills.replace("%data%", bio.skill[i]);
    fomatedSkills.push( skill);
  }

  $("#header").prepend(formatedPicture);
  $(".logo").prepend(formatedRole);
  $(".logo").prepend(formatedName);
  setMenu();
  setTopContacts("#topContacts");
  $("#topContacts").after(HTMLskillsStart);
  $("#skills").append(fomatedSkills);
  setTopContacts("#footerContacts");
  $("#topContacts").after(formatedMessage);
  $(".biopic").addClass("mask-picture");
};

work.display = function(){
  $("#workExperience").append(HTMLworkStart);

  for(var job in work.jobs ){
    var workEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
    var workTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var workDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
    var workLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
    var workDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

    $(".work-entry").append(workEmployer);
    $(".work-entry").append(workTitle);
    $(".work-entry").append(workDates);
    $(".work-entry").append(workLocation);
    $(".work-entry").append(workDescription);
  }
};

project.display = function (){
  $("#projects").append(HTMLprojectStart);

  for(var proj in project.projects ){
    var projectTitle = HTMLprojectTitle.replace("%data%", project.projects[proj].title);
    var projectDates = HTMLprojectDates.replace("%data%", project.projects[proj].dates);
    var projectImage = HTMLprojectImage.replace("%data%", project.projects[proj].image);
    var projectDescription = HTMLprojectDescription.replace("%data%", project.projects[proj].description);

    $(".project-entry").append( "<div id='proj"+proj+"' class='project'></div>");
    $("#proj"+proj).append(projectTitle);
    $("#proj"+proj).append(projectDates);
    $("#proj"+proj).append(projectDescription);
    $("#proj"+proj).append(projectImage);
  }

  $('div.project-entry img').css({'width' : '360px' , 'height' : '207px'});
};

education.display = function (){	
  $("#education").append(HTMLschoolStart);

  for(var school in education.schools){
    var schoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
    var schoolDegree = HTMLschoolDegree.replace("%data%",  education.schools[school].degree);
    var schoolDates = HTMLschoolDates.replace("%data%",  education.schools[school].dates);
    var schoolLocation = HTMLschoolLocation.replace("%data%",  education.schools[school].city);
    var schoolMajor = HTMLschoolMajor.replace("%data%",  education.schools[school].major);
 
    $(".education-entry").append(schoolName);
    $(".education-entry").append(schoolDegree);
	$(".education-entry").append(schoolDates);
    $(".education-entry").append(schoolLocation);
    $(".education-entry").append(schoolMajor);
  }

  $("#education").append(HTMLonlineClasses);
  $("#education").append(HTMLschoolStart);

  for(var onlineC in education.onlineCourses){
    var onlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[onlineC].title);
    var onlineSchool = HTMLonlineSchool.replace("%data%",  education.onlineCourses[onlineC].school);
    var onlineDates = HTMLonlineDates.replace("%data%",  education.onlineCourses[onlineC].dates);
    var onlineURL = HTMLonlineURL.replace("%data%",  education.onlineCourses[onlineC].url);

    $(".education-entry:last").append(onlineTitle);
    $(".education-entry:last").append(onlineSchool);
    $(".education-entry:last").append(onlineDates);
    $(".education-entry:last").append(onlineURL);	
  }
};

bio.display();

work.display();

project.display();

education.display();

$("#mapDiv").append(googleMap);
