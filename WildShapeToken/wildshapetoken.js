//Known forms.
var forms = {
    "Bear": {},
    "Wolf": {}
    
}


//The Workhorse
on("change:token:currentSide", function(obj) {
    log(obj);
    //Was this a token I can reference information on?	
      //Get token's "represents" character object.
        //This wasnt a character token. Abort.
  	    if(!obj.get("represents")) { return; }
		var character = getObj("character",obj.get("represents")).get("id");	   	   
		log(character);

      //Search Tables in campaign for matching character first name.
	    var tables = findObjs({"_type":"rollabletable","name":getAttrByName(character,"character_name").split(" ")[0]+"-Forms"})[0];		
        //If none found, abort.
		if (tables == undefined) { return; }
		log(tables);
        //If found, reference name of form from table based on currentSide index.		
		//Alternate theory: Reference table items by avatar rather than currentSide, because tableitems dont store an index.
		var item = findObjs({"_type":"tableitem","avatar":decodeURIComponent(obj.get("sides").split("|")[obj.get("currentSide")]),"_rollabletableid":tables.get("_id")})[0];
		log(item);
		//If there was no table item for this entry, abort.
		if (item == undefined) { sendChat("WildShape Token Script","/w GM The table for this character does not have a matching item for this token state. Please re-create the token from the rollable table."); return; }
		
    if (item.get("name") == "Character") {  //If the character is unshifting, restore values.
        return;   
    }
    else if (!wildshape_forms.hasOwnProperty(item.get("name"))) { //If form unknown, abort.
        sendChat("WildShape Token Script","/w GM The table item named "+item.get("name")+" is not a recognized Wild Shape form. Please check the form table or add a form to the script."); 
        return; 
    }
    else if (getAttrByName(character,"wildshape_store_str") == undefined) { //Character is shifting from normal to animal form. Create backup.
    } 
    else { //Character is shifting from animal to animal form. Erase extra attacks and proficiencies from old form.
    }
    //Replace character stats with form stats:
      //Throw GM warning for Druid/Morph level.
      //Replace STR,DEX,CON.
      //Add proficiencies (SPECIAL: Proficiencies = charcter's + form's.)
      //Change HP and Hit Die.
      //Change AC (Assume Merge or FallOff).
});

//The Setup
