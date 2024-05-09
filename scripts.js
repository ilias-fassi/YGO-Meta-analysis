let decks_qty = 5;
let cards_qty = 5;

// change la couleur d'une case par la suivante,
// selon l'ordre : gris > vert > jaune > orange > rouge > gris
function change_color(id){
    const current_color = document.getElementById(id).style.backgroundColor;
    function set_color(new_color){
        document.getElementById(id).style.backgroundColor = new_color;
    }
    switch (current_color){
        case "rgb(79, 198, 79)": // green
            set_color("rgb(232, 223, 61)"); // yellow
            break;
        case "rgb(232, 223, 61)": // yellow
            set_color("rgb(236, 158, 49)"); // orange
            break;
        case "rgb(236, 158, 49)": // orange
            set_color("rgb(236, 77, 49)"); // red
            break;
        case "rgb(236, 77, 49)": // red
            set_color("rgb(226, 220, 220)"); // default
            // pb : après 4 click, mouseout reset color anyway
            // var elt = document.getElementById(id);
            // elt.addEventListener('mouseover', () => {
            //     elt.style.backgroundColor = 'rgb(196, 190, 190)';
            // })
            // elt.addEventListener('mouseout', () => {
            //     elt.style.backgroundColor = 'rgb(226, 220, 220)';
            // })
            break;
        default:
            set_color("rgb(79, 198, 79)"); // green
            break;
    }
}

function turn_on_events(){
    const icons = document.querySelectorAll(".deck, .ht, .powercard");
    const boxes = document.querySelectorAll(".deck_case, .card_case, .deck_container, .ht_container, .powercards_container");
    const containers_boxes = document.querySelectorAll(".deck_container, .ht_container, .powercards_container");
    let beingDragged;

    icons.forEach(icon => {
        addEventListener('dragstart', dragStart)
    })
    boxes.forEach(box => {
        box.addEventListener('dragover', dragOver)
        box.addEventListener('drop', dragDrop)
    })

    function dragStart(e){
        beingDragged = e.target;
    }
    function dragOver(e){
        // if (e.target.className = 'deck_container'| 'ht_container'| 'powercards_container'){
        //     this.style.visibility = "hidden";
            // X.style.visibility = "on";
        // }
        e.preventDefault();
    }
    function dragDrop(e){
        // if (e.target.className != 'deck'|'ht'|'powercard'){ // if box != icon, drop
            e.target.append(beingDragged);
        // }
        // else {
        //     // if box = icon, no drop & add back to container
        //     if (e.target.className = 'deck') document.getElementsByClassName('deck_container').append(beingDragged);
        //     if (e.target.className = 'ht') document.getElementsByClassName('ht_container').append(beingDragged);
        //     if (e.target.className = 'powercard') document.getElementsByClassName('powercard_container').append(beingDragged);
        // }
        // // si carte, not append & go back 
        // // go back : si deck doc.deck_cont.append being dragged
        // // si ht ou pwr etc..
    }
}

function add_col(){
    var col = cards_qty + 2;
    var row = decks_qty + 2;
    var case_id = "";

    // new card case
    document.getElementById('grid').innerHTML += "<div class='card_case' style='grid-area:1/" + col + "; width:85.2px; height:85.2px'></div>";
    
    // new colored cases
    for (i = 2; i < row; i++ ){
        case_id = "'case_"+ i + "-" + col + "'";
        document.getElementById('grid').innerHTML += "<div id=" + case_id + " class='colored_case' onclick='change_color(this.id);' style='grid-area:" + i + "/" + col + "'></div>";
    }
    cards_qty++;
    // replace plus button
    document.getElementById('add_card').style = "grid-area:1/"+(col+1);

    // reactivate events
    turn_on_events();
}

function add_row(){
    var col = cards_qty + 2;
    var row = decks_qty + 2;
    var case_id = "";

    // new deck case
    document.getElementById('grid').innerHTML += "<div class='deck_case' style='grid-area:" + row + "/1; width:85.2px; height:85.2px'></div>";
    
    // new colored cases
    for (j = 2; j < col; j++ ){
        case_id = "'case_"+ row + "-" + j + "'";
        document.getElementById('grid').innerHTML += "<div id=" + case_id + " class='colored_case' onclick='change_color(this.id);' style='grid-area:" + row + "/" + j + "'></div>";
    }
    decks_qty++;

    // replace plus button
    document.getElementById('add_deck').style = "grid-area:" + (row + 1) + "/1";

    // reactivate events
    turn_on_events();
}

let curr_zoom = 90

function zoom (str){
    if (str == 'out'){
        curr_zoom-=10;
    }
    else if (str == 'in'){
        curr_zoom+=10;
    }
    document.getElementById("main_container").style.zoom = curr_zoom + '%';
}