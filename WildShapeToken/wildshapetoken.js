//Known forms.
var forms = {
    "Bear": {}
    "Wolf": {}
    
}


//The Workhorse
on("change:token:currentSide", function(obj) {
    //Was this a token I can reference information on?
      //Get token's "represents" character name. (ID => Name lookup? What is held in the represents field?)
      //Search Tables in campaign for matching character name.
        //If none, abort.
        //If found, reference name of form from table based on currentSide index.
    //SPECIAL: If currentSide is 0, revert to PC's original values, and erase extra fields. (Character has un-shifted).
    //DOCUMENTATION: First entry in table must be character's regular form.
    //Is form in known form list?
      //If not, abort and throw message to GM to manually supply sheet and notify script writer.
      //If yes, is character currently shapeshifted? (Check for existance of extra fields)
        //If no, write extra fields. (Character is shifting from normal to SS)
    //Replace character stats with form stats:
      //Throw GM warning for Druid/Morph level.
      //Replace STR,DEX,CON.
      //Add proficiencies (SPECIAL: Proficiencies = charcter's + form's.)
      //Change HP and Hit Die.
      //Change AC (Assume Merge or FallOff).
}