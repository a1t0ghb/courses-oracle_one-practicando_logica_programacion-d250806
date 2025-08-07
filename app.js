//  VARIABLES DECLARATION.
//  'conts' vs. 'let' vs. 'var': 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/'.
let friends = [];

//  FUNCTIONS DECLARATION.

//  Get HTML tag's value: if 'innerHTML'; e.g. "<div>some text</div>".
//+ Otherwise, 'value' tag's property; e.g. "<input value='some text' />".
//  Ref.: 'https://superuser.com/questions/1037389/innerhtml-vs-value-when-and-why',
//+ 'https://stackoverflow.com/questions/8823498/setting-innerhtml-vs-setting-value-with-javascript' .
function getValue(iIsProperty = false, iID) {
    
    let html_object_value = null;
    const html_object = document.getElementById(iID); // e.g. Methods to get value of 'input' HTML tag: 'https://stackoverflow.com/questions/11563638/how-do-i-get-the-value-of-text-input-field-using-javascript/11563667#11563667'.
    (iIsProperty === false) ? html_object_value = html_object.innerHTML : html_object_value = html_object.value;
    return html_object_value;

}

//  Set HTML tag's value: if 'innerHTML'; e.g. "<div>some text</div>".
//+ Otherwise, 'value' tag's property; e.g. "<input value='some text' />".
function setValue(iIsProperty = false, iID, iValue) {

    const html_object = document.getElementById(iID);
    (iIsProperty === false) ? html_object.innerHTML = iValue : html_object.value = iValue;
    return;

}

function initialize() {

}

// function updateList(iHTMLList, iList) {
// }
function addFriendToList(iID, iFriend) {

    const friend_html = document.createElement('li');
    // //  OP01: direct not-safe HTML text injection.
    // friend_html.innerHTML = iFriend;
    //  OP02: code-safe, with '.createTextNode'.
    const friend_html_text = document.createTextNode(iFriend);
    friend_html.appendChild(friend_html_text);
    
    const friends_html = document.getElementById(iID);
    friends_html.appendChild(friend_html);

}

function agregarAmigo() {

    //  VARIABLES DECLARATION.
    let friend_valid = false;
    let friend_valid_string = false;
    let friend_valid_not_in_list = false;

    //  'conts' vs. 'let' vs. 'var': 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/'.
    const friend = getValue(iIsProperty = true, 'amigo');
    // console.log(`friend: '${friend}'`);

    //  VALIDATIONS.
    //  VALIDATION 01: not empty or whitespace-only string. Ref. 'https://medium.com/@muhebollah.diu/crafting-a-powerful-empty-value-checker-in-javascript-6a0bbef2c1a4'.
    if (friend.trim().length !== 0) {friend_valid_string = true;}
    // console.log(`friend_valid_string: '${friend.trim().length}' | '${friend_valid_string}'`);
    //  VALIDATION 02: friend not in list. Ref. 'https://stackoverflow.com/questions/48592791/javascript-arrays-opposite-of-includes/75187084#75187084'.
    if (friends.indexOf(friend) === -1) {friend_valid_not_in_list = true;}
    // console.log(`friend_valid_not_in_list: '${friends.indexOf(friend)}' | '${friend_valid_not_in_list}'`);
    // VALIDATION - LAST: all previous validations passed?
    if (friend_valid_string && friend_valid_not_in_list) {friend_valid = true;}
    // console.log(`friend_valid: '${friend_valid}'`);

    //  EXECUTION.
    //  If input validations pass, add friend to friends list.
    if (friend_valid) {
        friends.push(friend);
        addFriendToList('listaAmigos', friends[friends.length - 1]); // UPDATE 02, more granular.
    }
    console.log(`friends: '${friends}'`);
    console.log(friends);

    //  UPDATES TRIGERED.

    //  UPDATE 01: clean input tag 'amigo'. Ref. 'https://www.geeksforgeeks.org/html/html-clearing-the-input-field/'.
    setValue(iIsProperty = true, 'amigo', '');

    //  UPDATE 02: add new friend to HTML list.
    // updateList('listaAmigos', friends);

}

function sortearAmigo() {

}

//  CODE EXECUTION.

//  initialize();