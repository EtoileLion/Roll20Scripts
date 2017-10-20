var cartomancycards = [
{"cardno": 0, "name":"0 - The Fool","spells":["Detect Poison and Disease", "Expeditious Retreat", "Hideous Laughter","Mage Armor"],"restrictions":"","monstrous":"Animal Friendship"},
{"cardno": 1, "name":"I - The Magician","spells":["Burning Hands", "Create or Destroy Water", "Detect Magic", "Floating Disc", "Unseen Servant", "Silent Image"],"restrictions":"","monstrous":"Animal Friendship"},
{"cardno": 2, "name":"II - The High Priestess","spells":["Charm Person", "Fog Cloud", "Identify", "Sleep"],"restrictions":"","monstrous":"Animal Friendship"},
{"cardno": 3, "name":"III - The Empress","spells":["Animal Friendship", "Entangle", "Goodberry", "Speak with Animals"],"restrictions":"","monstrous":"Shield of Faith"},
{"cardno": 4, "name":"IV - The Emperor","spells":["Detect Evil and Good", "Hold Person", "Command", "Protection from Evil and Good"],"restrictions":"","monstrous":"Speak with Animals"},
{"cardno": 5, "name":"V - The Hierophant","spells":["Bane", "Bless", "Sanctuary", "Shield of Faith"],"restrictions":"","monstrous":"Speak with Animals"},
{"cardno": 6, "name":"VI - The Lovers","spells":["Detect Thoughts","Mirror Image", "Suggestion", "Zone of Truth"],"restrictions":"","monstrous":["Animal Messenger","Locat Animals or Plants"]},
{"cardno": 7, "name":"VII - The Chariot","spells":["Blur", "Enlarge/Reduce", "Magic Weapon", "Spiritual Weapon"],"restrictions":"","monstrous":["Enhance Ability"]},
{"cardno": 8, "name":"VIII - Justice","spells":["Bestow Curse", "Clairvoyance","Lightning Bolt", "Protection from Energy"],"restrictions":"","monstrous":["Conjure Animals"]},
{"cardno": 9, "name":"IX - The Hermit","spells":["Counterspell", "Dispel Magic", "Remove Curse", "Tiny Hut"],"restrictions":"","monstrous":["Animate Dead","Speak with Dead"]},
{"cardno": 10, "name":"X - Wheel of Fortune","spells":["Confusion", "Death Ward", "Divination", "Freedom of Movement"],"restrictions":"","monstrous":["Conjure Minor Elementals"]},
{"cardno": 11, "name":"XI - Strength","spells":["Herculean Force", "Resilient Sphere", "Stone Shape", "Stoneskin"],"restrictions":"","monstrous":["Conjure Woodland Beings"]},
{"cardno": 12, "name":"XII - The Hanged Man","spells":["Dominate Beast", "Dominate Person", "Geas", "Planar Binding"],"restrictions":"","monstrous":["Hold Monster"]},
{"cardno": 13, "name":"XIII - Death","spells":["Animate Dead", "Cloudkill", "Contagion", "Insect Plague"],"restrictions":"","monstrous":["Animate Objects","Conjure Elemental"]},
{"cardno": 14, "name":"XIV - Temperance","spells":["Contingency", "Globe of Invulnerability", "True Seeing"],"restrictions":"Once played, you may not play The Devil or Temperance until you complete a long rest.","monstrous":["Conjure Fey"]},
{"cardno": 15, "name":"XV - The Devil","spells":["Eyebite", "Force Cage", "Mass Suggestion"],"restrictions":"Once played, you may not play The Devil or Temperance until you complete a long rest.","monstrous":["Create Undead"]},
{"cardno": 16, "name":"XVI - The Tower","spells":["Disintegrate", "Divine Word", "Magnificent Mansion", "Reverse Gravity"],"restrictions":"Once played, you may not play The Tower or The Star until you complete a long rest.","monstrous":["Conjure Celestial"]},
{"cardno": 17, "name":"XVII - The Star","spells":["Conjure Celestial", "Plane Shift", "Prismatic Spray", "Regenerate"],"restrictions":"Once played, you may not play The Tower or The Star until you complete a long rest.","monstrous":["Forcecage"]},
{"cardno": 18, "name":"XVIII - The Moon","spells":["Antipathy/Sympathy", "Feeblemind", "Maze", "Mind Blank"],"restrictions":"Once played, you may not play The Moon or The Sun until you complete a long rest.","monstrous":["Animal Shapes"]},
{"cardno": 19, "name":"XIX - The Sun","spells":["Demiplane", "Holy Aura", "Incendiary Cloud", "Sunburst"],"restrictions":"Once played, you may not play The Moon or The Sun until you complete a long rest.","monstrous":["Dominate Monster"]},
{"cardno": 20, "name":"XX - Judgement","spells":["Foresight", "Imprisonment", "Mass Heal", "Meteor Swarm", "Power Word Kill"],"restrictions":"Once played, you may not play Judgement or The World until you complete a long rest.","monstrous":["Astral Projection"]},
{"cardno": 21, "name":"XXI - The World","spells":["Time Stop", "True Polymorph", "True Resurrection", "Wish"],"restrictions":"Once played, you may not play Judgement or The World until you complete a long rest.","monstrous":["Gate"]}
];

var handsize = [0,2,2,3,3,3,4,4,4,4,4,5,5,5,5,6,6,6,6,7,7];
var debug_output = true;

on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!cardcaster draw") !== -1) {
       //Get Character and Cardcaster Level.
	   var temp = get_cardcaster_level(msg);
	   if(temp.length == 0) { return; }
	   var character = temp[0];
	   var level = temp[1];
	   
		//Until Hand Limit OR empty deck:
		var carddraw;
		var cardsdrawn = [];
  	   var hand = findObjs({"name":"hand","_type":"attribute","_characterid":character})[0];
	   var deck = findObjs({"name":"deck","_type":"attribute","_characterid":character})[0];
       var cardsindeck = _.without(deck.get("current").split("|"),"");	   
       var cardsinhand = _.without(hand.get("current").split("|"),"");	   		
		while(cardsinhand.length < handsize[level] && cardsindeck.length > 0) {
			//Draw top card of deck.
			carddraw = cardsindeck.shift();
			cardsdrawn.push(carddraw);
			cardsinhand = _.union(cardsinhand,[carddraw]);
		}
		if (cardsdrawn.length > 0) { 
		    sendChat("Cartomancy Script","/w \""+msg.who.replace(" (GM)","")+"\" "+displaycards(cardsdrawn,character)); 
		    sendChat("Cartomancy Script","/w GM "+msg.who.replace(" (GM)","")+" drew "+_.map(cardsdrawn, function(y) { card = cartomancycards.find((x) => x.cardno == y); return (card == undefined) ? "ERROR" : card.name }).join(","));
		}

		hand.set("current",cardsinhand.join("|"));
		deck.set("current",cardsindeck.join("|"));
    }
});

on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!cardcaster hand") !== -1) {
       //Get Character and Cardcaster Level.
	   var temp = get_cardcaster_level(msg);
	   if(temp.length == 0) { return; }	   
	   var character = temp[0];
	   var level = temp[1];

       //Display hand.
	   var hand = getAttrByName(character,"hand").split("|");
	   if (hand.length == 0) { reject("You have no cards in hand."); return; }	 
	   sendChat("Cartomancy Script","/w \""+msg.who.replace(" (GM)","")+"\" "+displaycards(hand,character));
    }
});

on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!cardcaster play") !== -1) {
        
       //Get Character and Cardcaster Level.
	   var temp = get_cardcaster_level(msg);
	   if(temp.length == 0) { return; }	   
	   var character = temp[0];
	   var level = temp[1];
        //If character does not have cartomancy fields, reject.
       var handmod = findObjs({"name":"hand","_type":"attribute","_characterid":character})[0];
        hand = handmod.get("current").split("|");	   
        var command = msg.content.replace("  "," ").split(" ");
        debug("MSG received: "+command);
        //If card not specified, whisper user the list of cards in hand to select one.
        if(command.length == 2) {
            var out = "Play which card: ";
            _.each(hand,function(cardno) {
                var card = cartomancycards.find((x) => x.cardno == cardno);
				var spellsout = card.spells.concat((getAttrByName(character,"card_beast") == "true") ? card.monstrous : []);
                out += "["+card.name+"](!cardcaster play "+card.cardno+" ?{Which Spell";
                _.each(spellsout,function(spell,index){ out += "|"+spell+", "+index; },out);
                out += "}) "; 
            },out);
            sendChat("Cartomancy Script","/w \""+msg.who.replace(" (GM)","")+"\" "+out);
        } else {
            //Play the specified card:
            //If invalid card, reject.
            var card = cartomancycards.find((x) => x.cardno == command[2]);
            if (card == undefined) { reject("Invalid card ID.",msg.who); return; }
		   var spellsout = card.spells.concat((getAttrByName(character,"card_beast") == "true") ? card.monstrous : []);
            //If character is not holding the specified card, reject.
            if (!hand.includes(command[2])) { reject("You are not holding the \""+card.name+"\" card.",msg.who); return; }
            //Verify spell index.
            if(command[3] == undefined || parseInt(command[3]) >= spellsout.length) { reject("Invalid Spell ID.",msg.who); return; }
            //Public post card with selected effect.
            debug("Spell Number: "+command[3]+" ("+spellsout[parseInt(command[3])]+")");
            sendChat(msg.who,'<div class="sheet-rolltemplate-traits"><div class="sheet-row sheet-header"><span>'+card.name+'</span></div><div class="sheet-row"><span class="sheet-bold" style="font-weight:bold;margin-right: 2px;">Spell:</span><span class="sheet-desc">'+spellsout[parseInt(command[3])]+'</span></div>'+((card.restrictions != "") ? '<div class="sheet-row" style="margin-top:2px"><span class="sheet-bold" style="margin-right: 2px;font-weight:bold">Restriction:</span><span class="sheet-desc">'+card.restrictions+'</span></div>' : "")+"</div>");
            //Remove specified card from hand, place in discard.
            debug(hand);
            var discard = findObjs({"name":"discard","_type":"attribute","_characterid":character})[0];
            var discardsplit = _.without(discard.get("current").split("|"),"");
            discard.set("current",_.union(discardsplit,[card.cardno]).join("|"));
            handmod.set("current",_.without(hand,""+card.cardno).join("|")); //Bleh. Type matching issues.
        }
    }
});


on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!cardcaster discard") !== -1) {
       //Get Character and Cardcaster Level.
	   var temp = get_cardcaster_level(msg);
	   if(temp.length == 0) { return; }	   
	   var character = temp[0];
	   var level = temp[1];
       var handmod = findObjs({"name":"hand","_type":"attribute","_characterid":character})[0];
        hand = handmod.get("current").split("|");	   
        var command = msg.content.replace("  "," ").split(" ");
        debug("MSG received: "+command)
        //If card not specified, whisper user the list of cards in hand to select one.
        if(command.length == 2) {
            var out = "Discard which card: <br />";
            _.each(hand,function(cardno) {
                var card = cartomancycards.find((x) => x.cardno == cardno);
                out += "["+card.name+"](!cardcaster discard "+card.cardno+") "; 
            },out);
            sendChat("Cartomancy Script","/w \""+msg.who.replace(" (GM)","")+"\" "+out);
        } else {
            var card = cartomancycards.find((x) => x.cardno == command[2]);
            if (card == undefined) { reject("Invalid card ID.",msg.who); return; }
            //If character is not holding the specified card, reject.
            if (!hand.includes(command[2])) { reject("You are not holding the \""+card.name+"\" card.",msg.who); return; }
            var discard = findObjs({"name":"discard","_type":"attribute","_characterid":character})[0];
            var discardsplit = _.without(discard.get("current").split("|"),"");
            discard.set("current",_.union(discardsplit,[card.cardno]).join("|"));
            handmod.set("current",_.without(hand,""+card.cardno).join("|")); //Bleh. Type matching issues.
            sendChat("Cartomancy Script","/w GM "+msg.who.replace(" (GM)","")+" discarded their "+card.name);
            sendChat("Cartomancy Script","/w \""+msg.who.replace(" (GM)","")+"\" You discarded the "+card.name);
        }
    }
});

on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!cardcaster beast") !== -1) {
	   var temp = get_cardcaster_level(msg);
	   if(temp.length == 0) { return; }	   
	   var character = temp[0];
	   var level = temp[1];
       var mod = findObjs({"name":"card_beast","_type":"attribute","_characterid":character})[0];
	   if (mod.get("current") == "false") { mod.set("current","true"); }
	   else { mod.set("current","false"); }
	   sendChat("Cartomancy Script","/w \""+msg.who.replace(" (GM)","")+"\" Your Jack of Beasts state is now: "+mod.get("current"));
	}
});

function get_cardcaster_level(msg) {
	debug(msg);
	if (msg.hasOwnProperty("selected")) {
	    var token = getObj("graphic",msg.selected[0]._id);
	    if(!token.get("represents")) { reject("Selected token does not represent a character.",msg.who); return []; }
		var character = getObj("character",token.get("represents")).get("id");	   	   
		var level = 0;
		debug("SELECTED: "+JSON.stringify(character));
		debug(getAttrByName(character,"cust_classname"));
		if (getAttrByName(character,"class") !== undefined && (/Card\s?caster/i).test(getAttrByName(character,"class")))  { level = parseInt(getAttrByName(character,"base_level")); }
		else if (getAttrByName(character,"cust_classname") !== undefined && (/Card\s?caster/i).test(getAttrByName(character,"cust_classname"))) { level = parseInt(getAttrByName(character,"base_level")); }		
		else if (getAttrByName(character,"multiclass1") !== undefined && (/Card\s?caster/i).test(getAttrByName(character,"multiclass1"))) { level = parseInt(getAttrByName(character,"multiclass1_level")); }
		else if (getAttrByName(character,"multiclass2") !== undefined && (/Card\s?caster/i).test(getAttrByName(character,"multiclass2"))) { level = parseInt(getAttrByName(character,"multiclass2_level")); }
		else if (getAttrByName(character,"multiclass3") !== undefined && (/Card\s?caster/i).test(getAttrByName(character,"multiclass3"))) { level = parseInt(getAttrByName(character,"multiclass3_level")); }
		else { reject("This character does not have a Cardcaster class.",msg.who); return []; }
		debug("Level found: "+level);
		
       //If character does not have cartomancy fields, add them.
	   var expectedcount = Math.min(4+(Math.ceil(level/2)*2),22); //Fortunately, the cards in your deck are numerically formulaic.
	   if (getAttrByName(character,"deck") == undefined) {
	    debug("NO DECK DETECTED. ADDING ATTRIBUTES");
	    var starter = _.range(expectedcount);
		createObj("attribute",{"name":"deck","current":_.shuffle(starter).join("|"),"_characterid": character});
		createObj("attribute",{"name":"discard","current":"","_characterid": character});
		createObj("attribute",{"name":"hand","current":"","_characterid": character});
		createObj("attribute",{"name":"card_beast","current":"false","_characterid": character});		
		sendChat("Cartomancy Script","/w \""+msg.who.replace(" (GM)","")+"\" Cardcaster Deck established. If this character has selected the Jack of Beasts as their Focus Card, enter \"!cardcaster beast\" to toggle on the flag to get your extra arcana spells.")		
	   }
       //Determine Cardcaster's deck based on Cardcaster level. Verify count of cards (deck + hand + discard). Add cards if missing.
	   var hand = findObjs({"name":"hand","_type":"attribute","_characterid":character})[0];
	   var deck = findObjs({"name":"deck","_type":"attribute","_characterid":character})[0];
	   var discard = findObjs({"name":"discard","_type":"attribute","_characterid":character})[0];
       var cardsindeck = _.without(deck.get("current").split("|"),"");	   
	   var cards = _.map(_.without(_.union(hand.get("current").split("|"),cardsindeck,discard.get("current").split("|")),""),function(x) { return parseInt(x); });
	   var totalcards = cards.length;
	   if(totalcards < expectedcount) {
			//Error: Missing cards. Determine missing cards. Put them in Deck?			
			debug(cards);
			var expected = _.range(expectedcount);
			var diff = _.difference(expected,cards);
			var filled = _.shuffle(_.union(cardsindeck,diff));			
			debug("Adding missing cards ("+diff.join(",")+") to deck.");
			deck.set("current",filled.join("|"));
		}		
		return [character,level];
	} 
	else {
		reject("Select a token first.",msg.who); return []; 
	}		
}

function reject(msg,who) {
	sendChat("Cartomancy Script","/w \""+who.replace(" (GM)","")+"\" ERROR: "+ msg);
}

function debug(msg) {
	if (debug_output) { log(msg); }
}

function displaycards(cards,character) {
	//I tried to be nice, roll20. But you wont let us have nice things. Brute force time.
	var output  = [];
	_.each(cards,function (cardno) {
		cardno = parseInt(cardno); //Clean variable.
		card = cartomancycards.find((x) => x.cardno == cardno);		
		if(card != undefined) { 
						var spellsout = card.spells.concat((getAttrByName(character,"card_beast") == "true") ? card.monstrous : []);		
						output.push('<div class="sheet-rolltemplate-traits"><div class="sheet-row sheet-header"><span>'+card.name+'</span></div><div class="sheet-row"><span class="sheet-bold" style="font-weight:bold;margin-right: 2px;">Spells:</span><span class="sheet-desc">'+(_.map(spellsout,function (x) { return x.replace(" ","&nbsp;"); }).join(", "))+'</span></div>'+((card.restrictions != "") ? '<div class="sheet-row" style="margin-top:2px"><span class="sheet-bold" style="margin-right: 2px;font-weight:bold">Restriction:</span><span class="sheet-desc">'+card.restrictions+'</span></div>' : "")+"</div>");
		}
	},output);
	return output.join("<br />");
}
	

//Seeds of Possibility
//Sprout of Curiousity
//Backburn
//Bloom of Revelation
//Fruit of Knowledge
//Cartomancy