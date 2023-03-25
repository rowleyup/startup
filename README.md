# startup
Start up project for web development class

This is the **first** modification!!

***This second modification was made on GitHub***

I changed this line on my development environment and on GitHub

I learned that the complexities of Git will take some time to understand. There are certain nuances with the syntax of `git commit` and other commands that will take practice. However, I love the possibilities Git opens. This is by far the easiest method of collaboration I have seen so far. Git allows for people to work together on projects separately while still allowing each team member to review and help on each part of the project.

There is a distinct lack of thought-provoking games and applications used today. My web application is a casual, competitive riddle game. Users will solve riddles of varying complexity and receive scores based on correct answers and solving speed. This simple app gives people an on-your-own-time exercise in problem solving wherever they go.

Key features:
Menu with a number button for each riddle
Scoreboard with the scores and usernames of the top ten players
Scoreboard includes your score and overall standing
Password protected account to save progress and scores
Time-based scoring with stopwatch shown for each riddle

To remotely access server: ssh -i [key pair file] ubuntu@[ip address]
IP address of my server: 3.20.219.105
Make sure to always use the OpenSSH key option, the PuTTY option doesn't seem to work.

Domain name: adventuresinthought.click

./deployWebsite.sh -k keyfile -h hostname
./deployFiles.sh -k keyfile -h hostname -s service
Hostname is the domain name, service is simon or other page

HTML is very powerful for creating something that resembles a website, but it really doesn't have much function by itself besides links. Links in HTML are extremely easy to make.

To have a link to another page within simon, use the same process as a link to a different web page just with the HTML file instead.

REMEMBER: the title is what appears on the browser tab, you will not see a change on the page.

To use a Google Font, push the + next to the desired font, then copy the insert link.

CSS actually ends lines in ; and puts each function within curly brackets.

Sibling combinators select any of the second tag that is within the same larger tag (section, header, body, etc.) as an instance of the first tag.

Lower functions in CSS overwrite functions above them.

When in doubt, simpler CSS is better than more complex CSS. It will probably work better than messing with crazy functions.

Meanings of HTML tags

Exam 1 review:

General:
DNS record types: CNAME is an alias, "A" record points to an IP address
An A record is the address, straight mapping from a domain name to an IP address.
A CNAME is the canonical name, maps similar names or aliases to the same IP address.

Top level domain (TLD) is the com edu or click.
Root domain is byu.edu, which has a TLD and a secondary level domain.
A DNS subdomain is the whole thing, not just the things before the domain

chmod +x console command makes a script executable

sudo console command executes as a super user (admin)

ssh console command creates a secure shell on a remote computer

curl console command talks to a server URL

top console command to view running processes with CPU and memory usage

ps console command to view running processes

ping console command to check if a website is up

tracert to trace connections to a website

dig to show the DNS information for a domain

man to look up a command in the manual

RegEx: /A|f/i looks for A or f in a word with a parameter of i meaning case insensitive

CSS:
fonts @import url()

element plus class calling can be div.class
body section gets any section within a body
section > p gets any p that is a child of a section
p ~ div gets any p that has a div sibling
p + div gets any p that has an adjacent div sibling
put a hashtag before an id
a[href="path"] to get any element with given attribute
section:hover only applies when the section is hovered over by the mouse

padding puts space around the content of selected elements

goes content, padding, border, marriage

px is pixels, pt is points (1/72 of an inch), in is inches, cm is centimeters, % is percentage of parent element, em is a muliplier of the width of the letter m in parent font, rem is em but for the root's font, ex is a multiplier of the height of the element's font, vw is a percentage of the viewport's width, vh is a percentage of the viewport's height, vmin is a percentage of the viewport's smaller dimension, vmax is what it looks like.

JS:
setTimeout: puts it to the side until the time finishes, other code happens while waiting.

Promises: reject triggers the .catch and resolve triggers the .then
Async await takes the setTimeout Promise and makes everything wait until the await async is completed.
Async will always return a Promise, even if you don't specifically tell it to.

JSON: is a simple way to share and store data
JSON.stringify to convert to JSON from JavaScript
JSON.parse to convert from JSON to JavaScript
example {"x":3}
has to be double quotes, number, or NULL, cannot be undefined

Can be added to HTML through script tag or through onclick argument

function can be called as const f = () => {} or as const f = function() {} or even as function f() {}

reducing an array turns it all into one value

filter: runs a function to remove items

slice: returns a sub-array

array.values: for loop through the actual values in the array

every: test if all items match
some: test if any items match

map: takes array and maps it to an array of equal size, combines arrays by concatenating [0] and [0] etc. or adds the same thing to each element of the array

document querySelector returns first one while queryAll returns all of those tags

objects don't require quotes around keys but always require :

Easiest way to make three thing happen in succession in to have three promise functions, not weird setTimeout in the .then()

Node.js: 
create project directory, use npm itit -y, make sure .gitignore file contains node-modules, install desired packages with npm install package-name, add require('package-name') to JavaScript code, run code with node file.js

can also use node -e "command" to run a line of JavaScript from the console

Functions that effect the server go in the node's js file.

ssh -i key ubuntu@domain

In order to actually update environment variables in the server, use command: pm2 restart serviceName --update-env
