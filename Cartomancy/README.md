# Cartomancy
Cartomancy is written to handle the deck management associated with EN World ENSIDER's "A Touch of Class" Cardcaster class.

Commands in this module must be run with a token selected that represents a character with the Cardmaster class (either as a Custom class, an entry in the main class, or in one of the Multiclass slots).  
Commands can be macroed, or run through the singular control panel "!cardcaster".  
Command list:
```
!cardcaster
```
The main control panel provides macro buttons for all of the major Cartomancy features.

```
!cardcaster draw
```
The character will draw up to their hand size. Cards drawn will be whispered to the player. A list of card names will also be whispered to the GM's.

```
!cardcaster hand
```
Whispers the character's hand to the player.

```
!cardcaster play
!cardcaster play 1 3
!cardcaster play <cardtoplay> <spelltouse>
```
If the two additional parameters are left out, the player will be prompted to click on the card they wish to play. When they click on these buttons, they will be prompted as to which of the card's spells they intend on activating.

```
!cardcaster discard
!cardcaster discard 3
!cardcaster discard <cardtodiscard>
```
If the second parameter is omitted, the player will be prompted to click on the card they wish to discard. When they click on a button, both player and GM's will be whispered to inform them of which card has been discarded.

```
!cardcaster reform
```
Shuffle your discard pile back into your deck after discarding at the end of a long rest.


```
!cardcaster beast
```
Toggles the Cardcaster Jack of Beasts Focus Card Monstrous Arcana ability, adding additional spell(s) to the options in the Arcana.


## FAQ
*Can't this be done with Roll20's inbuilt decks?*  
Yes, it could, but this system was developed for a campaign in which players played multiple characters across different sessions; as a Hand of cards in Roll20 is attached to a Player, not a Character, this system was devised to allow players to play their other characters, or a different cardcaster, without losing track of their current one's deck.  
Additionally, this system was devised as a way to avoid tedious bookkeeping and repeated lookups, especially across multiple tables in the case of Jack of Beasts.

*What about [abilityX]?*  
I have a list of abilities i'm still adding functionality for at the bottom of the script. If there's something I'm missing, feel free to drop an issue in.

*How do I get started?*  
Step 1: Install the script. (Obviously, this requires a Roll20 Pro account, to install custom javascript).  
Step 2: Have a character in the game with the Cardcaster class, and type !cardcaster into the chat with that character's token selected. (Note: Macro'ing the top level commands is highly recommended)
