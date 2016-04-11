Ti.UI.backgroundColor = 'white';
var win = Ti.UI.createWindow();
var button = Ti.UI.createButton({"title":"Edit contacts"});
button.addEventListener('click', function(){
	requestPermission();
});

win.add(button);
win.open();

var performAddressBookFunction = function() {
	 Titanium.Contacts.showContacts({'selectedPerson':function(e) {
	 	var person = e.person;
	 	Ti.API.info('Updating selected person '+person.fullName);
	 	updateContact(person);
	 	Ti.API.info('Creating new person and updating the same.');
	 	createContact();
	 	
	 	// Comment the following when running on Android.
	 	Ti.API.info('Fetching and updating person with identifier '+person.identifier +' '+ person.fullName);
	 	updateContactByIdentifier(person);
	 	Ti.API.info('Updating contact using Group api');
	 	updateContactFromGroup(person);
	 }})
};

var updateContactByIdentifier = function(person) {
	var toUpdate = Titanium.Contacts.getPersonByIdentifier(person.identifier);
	if (toUpdate) {
		console.log('Testing setting single string values.');
		toUpdate.setJobTitle('Software Engineer');
		Titanium.Contacts.save(toUpdate);
		var updated = Titanium.Contacts.getPersonByIdentifier(person.identifier);
		Ti.API.info('Updated '+person.fullName+' job title to '+updated.jobTitle);
	} else {
		Ti.API.info('Person not found for identifier '+person.identifier);
	}
}

var updateContactFromGroup = function(person) {
	var newGroup = Titanium.Contacts.createGroup({name: 'Group '+person.fullName});
	Titanium.Contacts.save(newGroup);
	Ti.API.info('Created group '+newGroup.name+' and adding '+person.fullName);
	newGroup.add(person);
	Titanium.Contacts.save(person);

	var members = newGroup.members();
	for (var i = 0; i < members.length; i++) {
		var personInGroup = members[i];
		personInGroup.setDepartment('SDK Engineering');
		Titanium.Contacts.save(personInGroup);
	};

	var members = newGroup.members();
	for (var i = 0; i < members.length; i++) {
		var personInGroup = members[i];
		Ti.API.info(personInGroup.fullName +' updated to department '+personInGroup.department);
	};
}

var createContact = function() {
	var newPerson = 
	Ti.Contacts.createPerson({
	  firstName: 'Paul',
	  lastName: 'Dowsett',
	  address:{
	    work:[
	      {
	        CountryCode: 'gb', // determines how the address is displayed
	        Street: '200 Brook Drive\nGreen Park',
	        City: 'Reading',
	        County: 'Berkshire',
	        Country: 'England',
	        ZIP: 'RG2 6UB'
	      },
	      {
	        CountryCode: 'gb', // determines how the address is displayed
	        Street: '1 St Pauls Road\nClerkenwell',
	        City: 'City of London',
	        State: 'London',
	        Country: 'England',
	        ZIP: 'EC1 1AA'
	      }
	    ],
	    home:[
	      {
	        CountryCode: 'gb', // determines how the address is displayed
	        Street: '2 Boleyn Court',
	        City: 'London',
	        State: 'Greenwich',
	        Country: 'England',
	        ZIP: 'SE10'
	      }
	    ]
	  },
	  birthday: '2012-01-01T12:00:00.000+0000',
	  instantMessage:{
	    home:[
	      {
	        service: 'AIM',
	        username: 'leisureAIM'
	      },
	      {
	        service: 'MSN',
	        username: 'no_paul_here@msn.com'
	      }
	    ],
	    work:[
	      {
	        service: 'AIM',
	        username: 'seriousAIM'
	      }
	    ]
	  },
	  organization: 'Appcelerator',
	  phone:{
	    mobile: ['07900 000001', '07900 000002'],
	    work: ['+44 (0)118 925 6128', '+44 (0)118 000 0000']
	  },
	  url:{
	    homepage: ['www.google.com'],
	    work: ['www.appcelerator.com', 'www.example.com']
	  }
	});

	updateContact(newPerson);
}

var updateContact = function(person) {
 	var currentAddress = (person.address)?(person.address):({});
    currentAddress.work = [{
        CountryCode: 'sg',
        Street: 'Ayer Rajah Crescent'
    }];
	person.address = currentAddress;
	Titanium.Contacts.save(person);
	Ti.API.info('Contact work address updated for '+person.fullName);
}

var addressBookDisallowed = function() {
	Ti.API.info("addressBookDisallowed");
};


var requestPermission = function() {
	if (Ti.Contacts.hasContactsPermissions()) {
	    performAddressBookFunction();
	} else {
	    Ti.Contacts.requestContactsPermissions(function(e) {
	        if (e.success) {
	            performAddressBookFunction();
	        } else {
	            addressBookDisallowed();
	        }
	    });
	}
}