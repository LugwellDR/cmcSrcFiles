var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


var collection_AdminList = "admin_list";
var arrayOfAccounts = [];

db.collection(collection_AdminList).onSnapshot(
	function(querySnapshot) 
	{
		querySnapshot.docChanges().forEach(
			function(change)
			{
				arrayOfAccounts.push([change.doc.data().email, change.doc.id]);
			});
			createAddMenu();
			displayArray();
	});

function createAddMenu()
{
	addAdmin_Div.innerHTML = ""
	addAdmin_Div.innerHTML += "<input type='Text' id='addingAdmin' placeholder='email'><input type='submit' onclick='addAdmin()'>"
	
	//"<button class='buttonClass' id='getImageButtonPopout' value='" + arrayOfTasksIn[i].imageName + "' onclick='getImagePopout(this.value)'>Popout</button>"
	
	
}

function displayArray()
{
	account_list.innerHTML = ""
	for(var i = 0; i < arrayOfAccounts.length; i++)
	{
		account_list.innerHTML += "<button value='" + arrayOfAccounts[i][1] + "' onclick='deleteAdmin(this.value)'>Delete</button>" + " " + arrayOfAccounts[i][0] + "</br>"
	}
}

function refreshAccountArray()
{
	arrayOfAccounts = [];
	db.collection(collection_AdminList).onSnapshot(
		function(querySnapshot) 
		{
			querySnapshot.docChanges().forEach(
				function(change)
				{
					arrayOfAccounts.push([change.doc.data().email, change.doc.id]);
				});
				displayArray();
		});
}
function deleteAdmin(valueIn)
{
	db.collection(collection_AdminList).doc(valueIn).delete().then(
			function() 
			{
				//console.log("Email successfully deleted!");
				refreshAccountArray();
			})
			.catch(
				function(error) 
				{
					console.error("Error removing email for admin_list:cmcAccountManager.js: ", error);
				});
}

function addAdmin()
{
	var adminIn = document.getElementById("addingAdmin");
	console.log(adminIn.value);
	db.collection(collection_AdminList).doc().set(
		{
			email: adminIn.value
		})
		.then(
			function() 
			{
				//alert("An admin has been added!");
			})
		.catch(
			function(error)
			{
				console.error("Error writing document: ", error);
			});
}