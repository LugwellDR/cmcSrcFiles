var collection_AdminList = "admin_list";
var arrayOfAccounts = [];
var URLIn = window.location.pathname;
var filename = URLIn.substring(URLIn.lastIndexOf('/') + 1);

	
function isAdmin(userNameIn)
{
	var varOut = "notAdmin";
	arrayOfAccounts = [];
	db.collection(collection_AdminList).onSnapshot(
	function(querySnapshot) 
	{
		querySnapshot.docChanges().forEach(
			function(change)
			{
				arrayOfAccounts.push([change.doc.data().email, change.doc.id]);
			});
			console.log("The user in is: " + userNameIn);
			for(var i = 0; i < arrayOfAccounts.length; i++)
			{
				console.log("Account " + i + " is: " + arrayOfAccounts[i][0]);
				if(userNameIn == arrayOfAccounts[i][0])
				{
					varOut = "isAdmin";
					console.log("Account matches: " + varOut);
					//return varOut;
				}
			}
	});
	console.log("Admin variable is: " + varOut);
	return varOut;
}