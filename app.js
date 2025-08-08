//  VARIABLES DECLARATION.
//  'conts' vs. 'let' vs. 'var': 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/'.
let friends = null;

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

// Initialize app conditions.
function initialize() {

    //  Clears friends list: HTML and array.
    //  Clears friends list - Array:
    friends = [];
    //  Clears friends list - HTML:
    updateFriendsList('listaAmigos', friends);

    //  Clears 'Secret Santa' winner.
    const secret_santa_html = document.getElementById('resultado');
    secret_santa_html.innerHTML = '';

    return;

}

//  Adds a single friend to friends HTML list.
function addNodeToList(iID, iText, iNodeID) {

    //  Create a 'li' tag and add it to it's 'ul' parent tag.
    //  - 'li' and 'ul' tags structure: 'https://www.w3schools.com/tags/tag_ul.asp', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul'.
    //  - Add 'li' with JavaScript: 'https://stackoverflow.com/questions/20673959/how-to-add-new-li-to-ul-onclick-with-javascript/20673977#20673977', 'https://forum.freecodecamp.org/t/adding-a-string-item-to-an-appendchild-li-element/314070/3'.
    //  - HTML DOM createTextNode(): 'https://www.w3schools.com/jsref/met_document_createtextnode.asp'.
    //  - HTML DOM appendChild(): 'https://www.w3schools.com/jsref/met_node_appendchild.asp'.
    const node_html = document.createElement('li');
    // //  OP01: direct not-safe HTML text injection. Ref. 'https://www.quora.com/What-is-the-difference-between-createTextNode-and-InnerHTML-in-JavaScript'.
    // node_html.innerHTML = iText;
    //  OP02: code-safe, with '.createTextNode'.
    const node_html_text = document.createTextNode(iText);
    node_html.appendChild(node_html_text);
    if (iNodeID) {
        const node_html_id = 'id_'.concat(iNodeID); //  Set tag's id in format 'id_<friends_name>' concatenating strings: 'https://stackoverflow.com/questions/31845895/how-can-i-build-concatenate-strings-in-javascript/31845980#31845980'.
        node_html.setAttribute('id', node_html_id);
        // console.log(`node_html_id: '${node_html_id}'`);
    }
    // console.log(node_html);
    
    //  Add new 'li' friend to friends list 'ul'.
    const parent_node_html = document.getElementById(iID);
    parent_node_html.appendChild(node_html);

    return;

}

//  Refresh friends HTML list; i.e. clears list and rebuilds using friends array / list.
//  - NOTE: it uses function 'addNodeToList()'.
function updateFriendsList(iID, iList) {

    //  Clear inner HTML of 'ul' list: 'https://stackoverflow.com/questions/18795028/javascript-remove-li-without-removing-ul/18795074#18795074'.
    const friends_html = document.getElementById(iID);
    friends_html.innerHTML = '';

    //  Create a 'li' tag and add it to it's 'ul' parent tag.
    //  - Add multiple 'li' with JavaScript: 'https://stackoverflow.com/questions/47951287/dynamically-add-li-to-ul-javascript/47951374#47951374'.
    for (let i = 0; i < iList.length; i++) {
        const friend = iList[i];
        addNodeToList(iID, friend, friend);
    }

    return;

}

//  Main function for adding new entries of friends.
function agregarAmigo() {

    //  VARIABLES DECLARATION.
    let friend_valid = false;
    let friend_valid_string = false;
    let friend_valid_not_in_list = false;

    //  'conts' vs. 'let' vs. 'var': 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/'.
    const friend_raw = getValue(iIsProperty = true, 'amigo');
    const friend = friend_raw.trim();
    // console.log(`friend: '${friend}'`);

    //  VALIDATIONS.
    //  VALIDATION 01: not empty or whitespace-only string. Ref. 'https://medium.com/@muhebollah.diu/crafting-a-powerful-empty-value-checker-in-javascript-6a0bbef2c1a4'.
    (friend.trim().length !== 0) ? (friend_valid_string = true) : (alert('Por favor ingrese un nombre válido.'));
    // console.log(`friend_valid_string: '${friend.trim().length}' | '${friend_valid_string}'`);
    //  VALIDATION 02: friend not in list. Ref. 'https://stackoverflow.com/questions/48592791/javascript-arrays-opposite-of-includes/75187084#75187084'.
    (friends.indexOf(friend) === -1) ? (friend_valid_not_in_list = true) : (alert('Por favor ingrese otro nombre; éste ya ha sido registrado.'));
    // console.log(`friend_valid_not_in_list: '${friends.indexOf(friend)}' | '${friend_valid_not_in_list}'`);
    // VALIDATION - LAST: all previous validations passed?
    if (friend_valid_string && friend_valid_not_in_list) {friend_valid = true;}
    // console.log(`friend_valid: '${friend_valid}'`);

    //  EXECUTION.
    //  If input validations pass, add friend to friends list.
    if (friend_valid) {friends.push(friend);}
    // console.log(`friends: '${friends}'`);
    // console.log(friends);

    //  UPDATES TRIGERED.

    //  UPDATE 01: add new friend to HTML list, IF it was a valid entry.
    if (friend_valid) {updateFriendsList('listaAmigos', friends);}

    //  UPDATE 02: clean input tag 'amigo'. Ref. 'https://www.geeksforgeeks.org/html/html-clearing-the-input-field/'.
    setValue(iIsProperty = true, 'amigo', '');

    return;

}

//  Get a random number as integer, between 2 numbers; inclusive. I.e. it includes both numbers in the possible results.
//  - Ref. 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive'.
function getRandomIntegerInclusive(iMin, iMax) {

    const random_number_lower_limit = Math.ceil(iMin);
    const random_number_upper_limit = Math.floor(iMax);
    return Math.floor(Math.random() * (random_number_upper_limit - random_number_lower_limit + 1) + random_number_lower_limit);

}

//  Main function for getting secret santa from friends list.
function sortearAmigo() {

    //  VARIABLES DECLARATION.
    const random_number_lower_limit = Math.min(1, friends.length);
    // console.log(`random_number_lower_limit: '${random_number_lower_limit}'`);

    //  If there are no friends entered yet, game can't start.
    if (random_number_lower_limit === 0) {
        
        alert('Por favor ingrese antes al menos un nombre para poder jugar.')

    } else {
        
        const random_number_upper_limit = friends.length;
        const random_number = getRandomIntegerInclusive(random_number_lower_limit, random_number_upper_limit);
        // console.log(`random_number_upper_limit: '${random_number_upper_limit}'`);
        // console.log(`random_number: '${random_number}'`);

        //  EXECUTION.
        const secret_santa = friends[random_number - 1];
        addNodeToList('resultado', `El amigo secreto sorteado es: ${secret_santa}`, 'secret_santa');
        
        //  UPDATES TRIGERED.
        document.getElementById('listaAmigos').innerHTML = ''; //  Cleans HTML list of friends.
        document.getElementById('amigo').setAttribute('disabled', true);
        //  Get element by class name: 'https://www.w3schools.com/jsref/met_document_getelementsbyclassname.asp'.
        document.getElementsByClassName('button-add')[0].setAttribute('disabled', true); //  Disables button to add friends. Using this method since there is ONLY 1 class called 'button-add'.
        document.getElementsByClassName('button-draw')[0].setAttribute('disabled', true); //  Disables button to get secret santa. Using this method since there is ONLY 1 class called 'button-draw'.

    }
    
    return;

}

//  CODE EXECUTION.

initialize(); // Cleans app.
