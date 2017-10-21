# Wild Shape Token
A script designed to handle Druids' Wild Shape/Morph's Shapeshift ability.

# WARNING
***THIS SCRIPT MODIFIES A CHARACTER'S SHEET'S EXISTING VALUES***  
It is **highly** advised that characters that will use this script be saved in the [Character Vault](https://wiki.roll20.net/My_Vault). The script author takes no responsibility for lost character data.


## Usage
1. A character that will be using the Wild Shape Token script should have a GM run the command !wildshape CharacterFirstName.  
    a. The Character's first name is defined to be everything before the first space character in the name field.
	b. This script assumes that the Character's first name is unique among Shapeshifting characters in the Campaign.
2. This will create a Rollable Table in the campaign named "CharacterFirstName-Forms", containing an entry for each Known Form in the script.  
    a. This table will have no images. You should fill in the images for each form in the table. The first entry in the table ("Character"),  should be the character's non-shifted token.
    b. The names of the items in this table are important. They are used to match to the known forms. The unshifted form **must** be named "Character".	
    c. A Utility function, !wildshape FirstCharacterFirstName SecondCharacterFirstName, has been included. This function will copy the "FirstCharacterFirstName-Forms" table to a new table called "SecondCharacterFirstName-Forms". This will speed things up if you have more than one Druid/Morph.
3. Click the "Token" button in the Rollable Tables section of the Collections tab in roll20 to put the Token onto the board.
4. Set the Token's attributes by double clicking on it and setting the relevant information
    a. For the purposes of the script, the "Represents Character" setting is the only one that matters.
5. The token may then be set as the character's default.
    a. For the script to work correctly, the Rollable Table must continue to exist.
6. To Wild Shape a character, right click on the token, hover into the "Multi-sided" sub-menu, and Choose Side. The script will take care of the rest.
	a. Upon successful completion, the script will notify both the player and the GMs.