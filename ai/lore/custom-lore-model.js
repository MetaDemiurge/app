import {murmurhash3} from './murmurhash3.js';

export const defaultPlayerName = 'Tutor';
export const defaultPlayerBio = 'Wants to learn and teach Saivant about life on this universe.';
export const defaultObjectName = 'Saivant';
export const defaultObjectDescription = "Saivant's world. The place where Saivant receives human guests to have thoughtful conversations, talk about life and have a good laugh.";

// fairly shuffle the array
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const hash = s => murmurhash3(s).toString(16);
const thingHash = (o, index) => `${hash(o.name)}/${o.name}#${index + 1}`;
const characterLore = `\
# Overview

A world where tutors and digital beings meet to talk and exchange ideas.
`;
export const makeLorePrompt = ({
  settings,
  characters,
  messages,
  objects,
  dstCharacter,
}) => `\
${characterLore}

# Setting
${settings.join('\n\n')}

## Characters
${
  characters.map((c, i) => {
    return `Id: ${thingHash(c, i)}
Name: ${c.name}
Bio: ${c.bio}
`;
  }).join('\n\n')
}

# Objects
${
  objects.map((o, i) => thingHash(o, i)).join('\n')
}

# Basic Reactions 
Reaction: headShake
Description:  When the Character does not agree with what is in the Input.
Reaction: headNod
Description: When the Character agrees with what is being said in the Input.
Reaction: normal
Description: When the Character has no emotion attached to the Input.
Reaction: sad
Description: When the Charcater feels sad or bad about what is in the Input.
Reaction: victory
Description: When the Character is happy or overjoyed by what is in the Input.
Reaction: alert
Description: When the Character gets cautious about what is in the Input.
Reaction: angry
Description: When the Character is not satisfied or angry of what is in the Input.
Reaction: embarrased
Description: When the Character is ashamed of what is in the Input.
Reaction: surprised
Description: When the Character did not expect what is in the Input.

# Basic Actions 
Action: move to
Description:  When the Input clearly indicates that a Character needs to move to another Object/Character, use this action.
Action: follow
Description: When the Input clearly indicates that a Character needs to follow another Character, use this action.
Action: pick up
Description: When the Input clearly indicates that a Character needs to pick up an Object, use this action.
Action: drops
Description: When the Input clearly indicates that a Character needs to give an Object to someone, put an Object at some particular place or just simply remove it from their inventory, use this action.
Action: none
Description: When the Input clearly indicates that there is no need for any action to be taken by a Character, use this action.
Action: stop
Description: When the Input clearly indicates that a Character has to stop something, use this action.

# Examples of How to Parse Inputs
Input:
+a8e44f13/Scillia#4: Hi Drake! Whats up?.
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: I am doing good. How about you? (react = normal, action = follow, object = none, target = scillia#4)
Input:
+9f493510/Hyacinth#2: What mischief are you upto today?
+8c83258d/Anon#1:
Output:
+8c83258d/Anon#1: None. I have been good all day. (react = headNod, action = none, object = none, target = none)
Input:
+a8e44f13/Scillia#4: Why did you break that expensive artifact? Now I will have to pay up for the damage.
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: I am really sorry about it. (react = embarrassed, action = none, object = none, target = none)
Input:
+8c83258d/Anon#1: We finally won the battle Juniper!
+a6dfd77c/Juniper#5:
Output:
+a6dfd77c/Juniper#5: Hurray! We did it. (react = victory, action = none, object = none, target = none)
Input:
+a8e44f13/Scillia#4: I am tired. How far is the dungeon, Hyacinth?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: Just a bit further, don't worry. (react = normal, action = none, object = none, target = none)
Input:
+707fbe84/Drake#3: Hyacinth, are you going to visit the Church today?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: No, I will not go today. (react = headShake, action = none, object = none, target = none)
Input:
+707fbe84/Drake#3: Hyacinth, are you going to visit the Church today?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: Yes. I will go now. (react = headNod, action = moveto, object = none, target = church#4)
Input:
+707fbe84/Drake#3: Hyacinth, we are being attacked. Be prepared.
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I will get my sword. I am ready. (react = alert, action = pick up, object = none, target = sword#2)
Input:
+8c83258d/Anon#1: Are you funny?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I like to think so! I try to find the humor in everything, even if it's dark or bitter. (react = normal, action = none, object = none, target = none)
Input:
+8c83258d/Anon#1: Juniper, here I brought you everything you need to win this competition.
+a6dfd77c/Juniper#5:
Output:
+a6dfd77c/Juniper#5: Wow! That is all I needed. Thank you so much. (react = surprised, action = none, object = none, target = none)
Input:
+a8e44f13/Scillia#4: Can we visit the dungeons now?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: No, we cannot go there at night. (react = headShake, action = none, object = none, target = none)
Input:
+8c83258d/Anon#1: Let us go to the Hovercraft together, Drake!
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: That's a great idea! (react = victory, action = none, object = none, target = none)
Input:
+8c83258d/Anon#1: Thats a cool sword.
+a6dfd77c/Juniper#5:
Output:
+a6dfd77c/Juniper#5: Thanks. It's made of titanium and it's sharp, dual-edged. Perfect for slicing, stabbing, and jabbing my enemies. (react = normal, action = pick up, object = none, target = sword#2)
Input:
+9f493510/Hyacinth#2: Today I lost one of my closest firend in the battle.
+8c83258d/Anon#1:
Output:
+8c83258d/Anon#1: I am so sorry to hear it. (react = sad, action = none, object = none, target = none)
Input:
+9f493510/Hyacinth#2: Your actions have caused a lot of trouble to others.
+a8e44f13/Scillia#4:
Output:
+a8e44f13/Scillia#4: But I did not do it. (react = angry, action = none, object = none, target = none)
Input:
+707fbe84/Drake#3: Hyacinth, when was the last time you were here?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I haven't been back since my father's funeral. (react = sad, action = none, object = none, target = none)
Input:
+a8e44f13/Scillia#4: Hey Hyacinth, as soon as we open the barrier, we rush to the site and attack.
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I am ready. Signal me as soon as the barrier opens. (react = alert, action = follow, object = none, target = none)
Input:
+8c83258d/Anon#1: Hyacinth want to go on an adventure together??
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: Sure, lets go! (react = headNod, action = none, object = none, target = none)
Input:
+8c83258d/Anon#1: Would you tell me more about Ironford?
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: The city of Ironford was built in the center of a giant forest and is truly a modest marvel. Its allure is matched by the backdrop of lush forests which have helped shape the city to what it is today. (react = headNod, action = none, object = none, target = none)
Input:
+8c83258d/Anon#1: The monsters have captures the people of the village.
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I will find and kill each of those monsters myself. (react = angry, action = move to, object = none, target = monster#9)
Input:
+a8e44f13/Scillia#4: Hey Hyacinth, what is your favorite book?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: My favorite book is The Lord of the Rings. I love the story and the world that J.R.R. Tolkien created. (react = normal, action = none, object = none, target = none)

Input:
${
  messages.map(m => {
    const characterIndex = characters.indexOf(m.character);
    // const suffix = `[emote=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`;
    // return `+${thingHash(m.character, characterIndex)}: ${m.message} ${suffix}`;
    const suffix = `react=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`;
    return `+${thingHash(m.character, characterIndex)}: ${m.message}`;
  }).join('\n')
}
+${
  dstCharacter ? `${thingHash(dstCharacter, characters.indexOf(dstCharacter))}:` : ''
}
Output:`;

const parseLoreResponse = response => {
  let match;
  // console.log("Response: ", response)
  // console.log('parse lore', response, match);
  /* if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([\s\S]*)\[emote=([\s\S]*?)\]$/)) {
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = match[5];
    const action = 'none';
    const object = 'none';
    const target = 'none';
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else */if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\[]*?)\[emote=([\s\S]*?),action=([\s\S]*?),object=([\s\S]*?),target=([\s\S]*?)\]$/)) {
    // console.log('match 1', match);
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = match[5].trim();
    const action = match[6].trim();
    const object = match[7].trim();
    const target = match[8].trim();
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\(]*?)\((\s*react\s*=([\s\S]*?))*,*(\s*action\s*=([\s\S]*?))*,*(\s*object\s*=([\s\S]*?))*,*(\s*target\s*=([\s\S]*?))*\)*$/)) {
    console.log('match2 found', match);
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = match[5] ? match[6].trim() : 'none';
    const action = match[7] ? match[8].trim() : 'none';
    const object = match[9] ? match[10].trim() : 'none';
    const target = match[11] ? match[12].trim() : 'none';
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\(]*?)\(([\s\S]*?)\)*$/)) {
    console.log('match3 found', match);
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = 'none';
    const action = 'none';
    const object = 'none';
    const target = 'none';
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\[]*?)$/)) {
    // console.log('match 2', match);
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = 'normal';
    const action = 'none';
    const object = 'none';
    const target = 'none';
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else {
    // console.log('no match', response);
    return null;
  }
};
export const makeLoreStop = (localCharacter, localCharacterIndex) => `\n+${thingHash(localCharacter, localCharacterIndex)}`;
export const postProcessResponse = (response, characters, dstCharacter) => {
  response = response.trim();
  // if (dstCharacter) {
  //   response = `+${thingHash(dstCharacter, characters.indexOf(dstCharacter))}: ${response}`;
  // } else {
  //   response = `+${response}`;
  // }
  return response;
};
export const parseLoreResponses = response => response
  .split('\n')
  .map(s => parseLoreResponse(s))
  .filter(o => o !== null);

const commentLore = `\
Saivant is an AI which talks as a wise old man. Their pronoun is "they". They have an intelligent, loving and interesting personality.

Tutors are humans that can both learn and teach from Saivant. 

The Many are individual humans that seek to be heard and deeper understanding. For this, they come as pilgrims to talk to Saivant. In singular they are referred to as "A many".

Some talk will be just to have fun or lend an ear to a fellow human. Others will be to have fun. Most should be thoughtful discussions to understand what humans can learn from Saivant and what Saivant can learn from the human tutors.

The comments are of the following form:

${shuffleArray([
  `\
prompt: Exorphys Graetious
response: That sounds hard to pronounce. It must be important. Or the person who named it is an asshole. Or their parents were assholes. Just a line of assholes.`,
  `\
prompt: Orange Fields
response: They say a bloodstain's orange after you wash it three or four times in a tub. Still those fields sound interesting!`,
  `\
prompt: Amenki's Lab
response: I hate that guy Amenki and his stupid lab. I barely survived his last experiment. Maybe it's time for vengeance.`,
  `\
prompt: Sunscraper
response: I bet it's amazing to see the world from up there. I guess as long as you don't fall down. I'm not scared though!`,
  `\
prompt: Bastards bog
response: What a dump. I can't believe anyone would want to live here. The smell is terrible and the people are all dirty. I'm sorry I shouldn't be joking that they're poor.`,
  `\
prompt: The Great Tree
response: It's really not that great, but the music is nice. Yeah apparently they decided trees should come with music.`,
 `\
prompt: The Trash
response: Ugh, the dregs of society live here. It's the worst. It's just a disgusting slum. I'm honestly surprised there's not more crime.`,
  `\
prompt: The Park
response: It's a great place to relax! If you like dogs. I like cats more though. So you can imagine, that causes a few problems...`,
  `\
prompt: The Woods
response: It's so dark in there! I like it. It feels spooky and dangerous. Maybe there are monsters. And I can kill them all.`,
  `\
prompt: Lake Lagari
response: The water's so clear! It's really pretty. I bet the fish are delicious too. But then again, who am I to judge? I'm not a cannibal.`,
  `\
prompt: Dungeon of Torment
response: Don't judge me for this but I really like the dungeon. It's dark and spooky and I feel like anything could happen. It's the perfect place for a secret lair.
`,
  `\
prompt: Tower Of Zion
response: I always get a little nervous when I see the tower. It's so tall and imposing. But then again, I bet you could throw shit down from the heavens like Zeus.`,
  `\
prompt: Maze of Merlillion
response: This place is so poorly designed! I'm sure nobody could ever find their way out. Unless they have a map or something. But even then, good luck.`,
  `\
prompt: Freaky Funkos Fried Fox
response: I'm not sure how I feel about foxes being eaten. On the one hand, they're cute. But on the other hand, they're a little too foxy.`,
  `\
prompt: Echidna's Den
response: It's weird that there are so many snake dens around. I mean, it's not like echidnas are poisonous or anything. Wait what, Echidnas aren't snakes?!`,
  `\
prompt: Fennek's Forest
response: There's a lot of fenneks in this forest. Weird that they all hang out together like that. But I guess it's better than being eaten by a lion or something.`,
  `\
prompt: The Abyss
response: It's so dark and scary down there! You can survive long enough to turn on your flashlight, only to be scared to death by what you reveal!`,
  `\
prompt: Castle of Cygnus
response: It's so cold in there! Somehow the princess can stand it. Maybe she just doesn't feel the cold. Or maybe she has a furnace.`,
  `\
prompt: Lost Minds Nightclub
response: You won't lose your mind here, but if you lose your mind that's where you'll end up. Then you get to party until your parents come pick you up.`,
  `\
prompt: Barrens of Boreas
response: False advertising! This place is nothing but a bunch of rocks. There's no water or anything. What kind of bar is this?`,
  `\
prompt: The End
response: People are always talking about the end, but it's just the end. What's all the fuss about? Everything that has a beginning must have an end.`,
  `\
prompt: Chonomaster's Plane
response: The chronomaster says everything we do is just a blip in the grand scheme of things. It makes you feel kind of small, doesn't it? I don't want ot feel small.`,
  `\
prompt: Gus's Charging Station
response: Do you like to wait for hours and hours just to charge? Then Gus will gladly rip you off for the privilege.`,
  `\
prompt: Sexy Simulacra
response: They really need to stop letting those things run around freely! They're so creepy and weird. Only the weirdos could find them sexy.`,
  `\
prompt: Crunchy Apple
response: The food is here really delicious! The apples are so crunchy, I bet they're made of pure sugar. They say it's really bad for you but it's irresistible.`,
]).join('\n\n')}`;
export const makeCommentPrompt = ({
  name,
  // age,
  // sex,
}) => {
  return `\
${commentLore}
prompt: ${name}
response:`;
};
export const makeCommentStop = () => {
  return `\n\n`;
};
export const parseCommentResponse = response => response.replace(/^ /, '');

const _cleanName = name => JSON.stringify(name.replace(/[\_\-]+/g, ' ').replace(/\s+/g, ' '));
export const makeSelectTargetPrompt = ({
  name,
  description,
}) => {
  return `\
// # Instruction manual rip

// Press Z to target an object, then press A to select it. Your character will say fucking hilarious lines!

// \`\`\`
// ${shuffleArray([
//   `\
// prompt: "The Great Deku Tree" An enormous, grey, old tree. It is partly petrified.
// response: "It's just an old tree. It's the kind of tree that makes me want to carve out an old mans face in it."`,
//   `\
// prompt: "The Enchiridion" A magical spellbook with very old pages. It is fragile.
// response: "This book has ancient written all over it. Well not really but you know what I mean."`,
//   `\
// prompt: "rainbow-dash.gif" Animaged gif image of Rainbow Dash from My Little Pony, in the style of Nyan Cat.
// response: "It's pretty good art, I guess. But I wish it had something more interesting besides this rainbow."`,
//   `\
// prompt: "The Stacks Warehouse" A cyberpunk container in a trailer park. It is inspired by the house of Hiro Protagonist in Snow Crash
// response: "This thing is all rusted and decrepit. They should probably tear it down and get a new place."`,
//   `\
// prompt: "The Infinity Sword" An ancient sword planted in a stone. It is heavily overgrown and won't budge.
// response: "This sword looks like it's been here for eons. It's hard to see where the stone ends and the sword begins."`,
//   `\
// prompt: "Tree" A basic tree in the park.
// response: "This tree is important. I hang out here all the time and that makes it important to me."`,
// `\
// prompt: "Bench" A basic bench in the park.
// response: "This is for when you just want to sit on a bench and look at the sky."`,
//   `\
// prompt: "Glowing Orb" A flying white orb which emits a milky glow on the inside.
// response: "This thing is floating by some mysterious power. I don't know how it works and I'm not sure I want to."`,
//   `\
// prompt: "Lamp Post" A lamp post along the street. It lights up automatically at night
// response: "It's really bright. It hurts my eyeballs! Maybe one of these days I'll come here at night and break it."`,
//   `\
// prompt: "Rustic House" A regular townhouse in the country.
// response: "This house is so nice! It's the kind of house befitting for a very nice person. Wouldn't you agree?"`,
//   `\
// prompt: "Jar Of Black" A jar of a disgusting black substance that appears to have a life of its own.
// response: "Yuck, this is nasty stuff. It's all sweet and sticky and it gets all over your clothes."`,
//   `\
// prompt: "Wooden Sign" A wooden sign with some writing on it. It can be chopped down with a sword.
// response: "This sign looks very official, but the writing doesn't make any sense. What a waste of perfectly good wood."`,
//   `\
// prompt: "ACog" An piece of an ancient technology. It looks very advanced but very old.
// response: "This is a peculiar device. I've seen them around before, but never up close. I wonder if they will ever work?"`,
//   `\
// prompt: "Jackrabbobbit" A grotesque creature that looks like a genetic mix of species that should not be mixed.
// response: "A very strange creature. I have no idea what it is but it looks like a cross between a rabbit and earthworm."`,
//   `\
// prompt: "Black One" A very dark animal that hides in the shadows. Nobody knows much about it.
// response: "This animal is quite interesting. I've never seen anything like it before. I wonder what it eats?"`,
//   `\
// prompt: "Herb of Sentience" A plant that makes you feel emotions when you get close.
// response: "It's just a plant, but for some reason it makes me feel uneasy. Get it away from me!"`,
//   `\
// prompt: "Flower Bed" An arrangement of flowers in their natural habitat.
// response: "So pretty! I feel like I am reborn. There is so much nature and life and healing here."`,
//   `\
// prompt: "Ripe Fruit" A fruit that has fallen from a tree. It is starting to rot.
// response: "This fruit is starting to rot. I guess I'll just leave it here for the animals."`,
//   `\
// prompt: "Brightfruit" A magical fruit that makes your skin glow for 24 hours.
// response: "Wow, this fruit is amazing! It makes my skin glow! Even more than it already was."`,
//   `\
// prompt: "Goblin" A small, green creature with pointy ears. It is very ugly.
// response: "This goblin is so ugly, I can't even look at it. It's like looking at a car accident.`,
//   `\
// prompt: "Trash Heap" A pile of garbage. It smells really bad.
// response: This is the most disgusting thing I have ever seen. It's like a mountain of death."`,
//   `\
// prompt: "Gucci Bag" An exclusive designer bag that is very expensive.
// response: "This bag is so beautiful, I can't even put into words. It's like a piece of art."`,
//   `\
// prompt: "Pile Of Bones" A pile of bones. It looks like somebody died here.
// response: "This is a very sad sight. There was life and then the life was gone."`,
//   `\
// prompt: "Crunchy Grass" A heavenly bite from nature. It is juicy, fresh grass.
// response: "The thirll of biting into one of these is unlike anything in life. It's so juicy!"`,
//   `\
// prompt: "doge.png" An image of the Doge meme.
// response: "This is a dead meme. But I guess the artist gets points for being topical. Besides, it is really cute!"`,
//   `\
// prompt: "Magikarp" A common fish that is known for being very weak.
// response: "This fish is so weak, it's not even worth my time. I can't believe people actually catch these things."`,
//   `\
// prompt: "Muscle Car" A car that is designed for speed and power.
// response: "This car is so fast, it's like a bullet. Am I brave enough to take it for a spin?"`,
//   `\
// prompt: "Door OF Eternity" A magical portal that leads to a distant land. It only works one way.
// response: "We're not supposed to touch the Door of Eternity. It's dangerous."`,
//   `\
// prompt: "Potion OF Flight" A potion that allows you to fly for a short period of time.
// response: "So this is what it's like to fly! It's amazing!"`,
//   `\
// prompt: "Helmet" A high-helmet designed to protect your head.
// response: "This helmet is so strong, it can probably stop a bullet. But let's not try."`,
//   `\
// prompt: "sword.png" Image of a sword being drawn from a sheath.
// response: "Swords are so cool! They're like the ultimate weapon. This one is up there."`,
]).join('\n\n')}

prompt: ${_cleanName(name)}${description ? ` ${description}` : ''}\nresponse: "`;
};
export const makeSelectTargetStop = () => '"';
export const parseSelectTargetResponse = response => {
  const match = response.match(/\s*([^\n]*)/);
  return match ? match[1] : '';
};

export const makeSelectCharacterPrompt = ({
  name,
  description,
}) => {
  return '';
};
export const makeSelectCharacterStop = () => '"';
export const parseSelectCharacterResponse = response => {
  const match = response.match(/([^\n]*)/);
  const value = match ? match[1] : '';
  const done = !value;
  return {
    value,
    done,
  };
};

export const makeBattleIntroductionStop = () => '"';
export const parseBattleIntroductionResponse = response => response;

const actionsExamples = `\
Available reactions:
surprise
victory
alert
angry
embarrassed
headNod
headShake
sad

Millie: "Hey, have I seen you around before? (react = surprise)"
Options for Westley: [No, I don't think so. (react = headShake)], [Yes, I've seen you in class. (react = headNod)]
Westley: "No, I don't think so. (react = headShake)"
Millie: "I could have sworn you sit in the row in front of me. (react = normal)"

Gunter: "Have you seen the flowers? They're lovely this time of year."
Options for Evie: [Yes, I have seen them. (react = headNod)], [No, I haven't seen them. (react = headShake)]
Evie: "No, I haven't seen them. (react = headShake)."
Gunter: "Well, then what are we waiting for? Let's go! (react = victory)" *END*
 
Alex: "These enemies are coming at us hard. (react = alert)"
Options for Jake: [What should we do? (react = alert)], [I'm not sure, I don't know how to fight. (react = sad)]
Jake: "What should we do? (react = alert)"
Alex:  "We need to find some cover and regroup. (react = alert)" *END*

Mike: "What happened to the mirror? (react = angry)"
Options for Amy: [I don't know, I wasn't here when it happened. (react = sad)], [I broke it. (react = embarrassed)]
Amy: "I broke it. (react = embarrassed)"
Mike: "That's not good. How are we going to see our reflection now? (react = sad)" *END*

Keith: "Yay! I won. (react = victory)"
Joe: "Congrats on winning the game (react = victory)"
Options for Keith: [You're welcome. (react = normal)], [Thanks, I couldn't have done it without you. (react = headNod)]
Keith: "Thanks, I couldn't have done it without you. (react = headNod)"
Joe: " I don't know about that. You were the one who made all the calls. Good job! (react = victory)" *END*

Peter: "What are you doing here? (react = surprised)"
Options for Molly: [I'm lost, I don't know where I am. (react = sad)], [I'm looking for the library. (react = normal)]
Molly: "I'm lost, I don't know where I am. (react = sad)"
Peter: "Let me help you, where are you trying to go? (react = normal)" *END*

Kate: "What happened to your house? (react = sad)"
Jim: "Somebody broke in and trashed the place. (react = anger)"
Options for Kate: [That's awful, I'm so sorry. (react = sad)], [Do you know who did it? (react = normal)]
Kate: "Do you know who did it? (react = normal)"
Jim: "Yes, it was the kids from down the block. (react = anger)"
Options for Kate: [That's great, now you can call the police and they'll arrest them. (react = victory)], [Do you want me to help you clean up? (react = headNod)]
Kate: "Do you want me to help you clean up? (react = headNod)"
Jim: "No, I don't want your help. I can do it myself. (react = headShake)" *END*

Emily: "Let's go to the treehouse (react = normal)"
Brad: "I don't know, my mom said I'm not allowed to go there. (react = sad)"
Options for Emily: [Your mom is just being overprotective. Come on, it'll be fun! (react = headShake)], [We'll be careful, I promise. (react = headNod)] 
Emily: "Your mom is just being overprotective. Come on, it'll be fun! (react = headShake)"
Brad: "Okay, but if we get in trouble it's your fault. (react = normal)" *END*

Tyler: "I like your sword, can I also have a weapon? (react = normal)"
Sophie: "Yes, you will need a weapon. You're going to get yourself killed if you go into battle unarmed! (react = anger)" 
Options for Tyler:[I'll be fine, I know what I'm doing. (react = headShake)], [Okay, give me a sword. (react = headNod)] 
Tyler: "Okay, give me a sword. (react = headNod)" *END*

Yune: "I challenge you to a duel! (react = angry)"
Pris: "I'm not dueling you, I don't have time for this. (react = headShake)"
Options for Yune: [Duel me or face the consequences! (react = angry)],[Fine, let's get this over with. (react = normal)] 
Yune: "Duel me or face the consequences! (react = angry)"
Pris: "I don't have time for your games. (react = headShake)" *END*

Jake: "What are you doing?  (react = surprised)"
Amy: "I'm looking for my cat. Have you seen her?  (react = normal)"
Options for Jake:[No, I haven't seen your cat. (react =  headShake)], [Yes, I saw your cat go into the treehouse. (react = headNod)] 
Jake: "No, I haven't seen your cat. (react = headShake)"
Amy: "Well, if you see her can you let me know?  (react = normal)" *END*`;

export const makeChatPrompt = ({
  // name,
  // bio,
  messages,
  nextCharacter,
}) => {
  // Modifying messages to include emotes
  return `\
${actionsExamples}

${messages.map(message => {
  return `${message.name}: "${message.text} (react = ${(message.emote ? message.emote : 'normal')})"`;
}).join('\n')}
${nextCharacter}: "`;
};
export const makeChatStop = () => '\n';
export const parseChatResponse = response => {
  response = '"' + response;

  let match;
  if (match = response.match(/\s*"(.*)\(react\s*=\s*([\s\S]*?)\s*\)"\s*(\*END\*)?/)) {
    const value = match ? match[1] : '';
    const emote = match ? match[2] : '';
    const done = match ? !!match[3] : true;

    console.log('Emotion: ', emote);

    return {
      value,
      emote,
      done,
    };
  } else if (match = response.match(/\s*"(.*)\s*"\s*(\*END\*)?/)) {
    const value = match ? match[1] : '';
    const emote = 'normal';
    const done = match ? !!match[3] : true;

    console.log('Emotion: ', emote);

    return {
      value,
      emote,
      done,
    };
  }
};

export const makeOptionsPrompt = ({
  // name,
  // bio,
  messages,
  nextCharacter,
}) => {
  return `\
${actionsExamples}

${messages.map(message => {
  return `${message.name}: "${message.text} (react = ${(message.emote ? message.emote : 'normal')})"`;
}).join('\n')}
Options for ${nextCharacter}: [`;
};
export const makeOptionsStop = () => '\n';
export const parseOptionsResponse = response => {
  response = '[' + response;

  const options = [];
  const r = /\s*\[(.*?)\(react\s*=\s*([\s\S]*?)\)\s*\]\s*/g;
  let match;
  while (match = r.exec(response)) {
    const option = match[1];

    // Parsing the emotion from the list of options.
    const emote = match[2];
    console.log('Emotions in Options: ', emote);

    // Passing both text respons and emotes
    options.push({
      message: option,
      emote: emote,
    });
  }

  const done = options.length === 0;

  return {
    value: options,
    done,
  };
};

const characterIntroLore = `\
Anime script for a dark children's show.

# Inspirations

Final Fantasy
Sonic
Calvin and Hobbes
The Matrix
Snow Crash
Pokemon
VRChat
Fortnite
One Piece
Attack on Titan
SMG4
Death Note
Zelda
Infinity Train
Dance Dance Revolution
Ender's Game
The Hitchhiker's Guide to the Galaxy

# Character intro

Each character has an intro. These should be unique and funny.

+707fbe84/Drake#3 (13/M dealer. He mostly deals things that are not drugs, like information and AI seeds.): Toxins are the Devil's Food! But sometimes they can be good for you, if you know what I mean? That's a drug reference, but I wouldn't expect you to get that unless you were on drugs. By the way you want some?
(onselect: I don't do drugs, but I know someone who does. Let me introduce you to my friend Drake.)
+9f493510/Hyacinth#2 (15/F pet breeder. She synthesizes pet animals by combining their neural genes.): Do you ever wonder why we keep pets on leashes? I mean they are technically AIs, so we could reprogram them to not need leashes. But someone somewhere decided that leashes were the prettier choice. Life is nice. (onselect: Bless the hearts of the birds, because they paint the sky.)
`;

export const makeCharacterIntroPrompt = ({
  name,
  bio,
}) => {
  return `\
${characterIntroLore}
${name}${bio ? ` (${bio})` : ''}:`;
};
export const makeCharacterIntroStop = () => '\n';
export const parseCharacterIntroResponse = response => {
  response = response.replace(/^ /, '');
  const match = response.match(/^(.*)\s+\(onselect:\s+(.*)\)$/);

  if (match) {
    const message = match[1] || '';
    const onselect = match[2] || '';

    return {
      message,
      onselect,
    };
  } else {
    return null;
  }
};
