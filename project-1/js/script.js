/****
 * @desc GA Unit 01 : Take It Easy
 * @author mahchinkok@gmail.com
 ****/

// Global Variables
// let gameParam = {
//     sqGridSize: 0,
//     refGrid: 'vh',
//     tile1_2: 'url("../images/tile1-2.svg")',
//     tile1_4: 'url("../images/tile1-4.svg")',
//     tile1_6: 'url("../images/tile1-6.svg")',
//     tile3_2: 'url("../images/tile3-2.svg")',
//     tile3_4: 'url("../images/tile3-4.svg")',
//     tile3_6: 'url("../images/tile3-6.svg")',
//     tile5_2: 'url("../images/tile5-2.svg")',
//     tile5_4: 'url("../images/tile5-4.svg")',
//     tile5_6: 'url("../images/tile5-6.svg")',
// };
let tilesDB = [
    {
        tid: '1-2',
        imgURL: 'url("../images/tile1-2.svg")',
        xVal: 1,
        yVal: 2,
        qty: 10
    },
    {
        tid: '1-4',
        imgURL: 'url("../images/tile1-4.svg")',
        xVal: 1,
        yVal: 4,
        qty: 9
    },
    {
        tid: '1-6',
        imgURL: 'url("../images/tile1-6.svg")',
        xVal: 1,
        yVal: 6,
        qty: 7
    },
    {
        tid: '3-2',
        imgURL: 'url("../images/tile3-2.svg")',
        xVal: 3,
        yVal: 2,
        qty: 9
    },
    {
        tid: '3-4',
        imgURL: 'url("../images/tile3-4.svg")',
        xVal: 3,
        yVal: 4,
        qty: 7
    },
    {
        tid: '3-6',
        imgURL: 'url("../images/tile3-6.svg")',
        xVal: 3,
        yVal: 6,
        qty: 6
    },
    {
        tid: '5-2',
        imgURL: 'url("../images/tile5-2.svg")',
        xVal: 5,
        yVal: 2,
        qty: 7
    },
    {
        tid: '5-4',
        imgURL: 'url("../images/tile5-4.svg")',
        xVal: 5,
        yVal: 4,
        qty: 6
    },
    {
        tid: '5-6',
        imgURL: 'url("../images/tile5-6.svg")',
        xVal: 5,
        yVal: 6,
        qty: 6
    }
];
const tilesDeck = [];

////////////////////////////////////
// Init Game: Add Event Listeners //
////////////////////////////////////
window.onload = function() {
    console.log( "window.onload" );
    loadEventListener();
    display( "hello world!" )
    //    resetGame();
    //    switchGameMode();
}

let resetGame = function() {
    console.log( `func:resetGame` );
}

let loadEventListener = function() {
    console.log( `func:loadEventListener` );
    document.addEventListener( 'click', function( event ) {
        console.log( `clicked => ${event.target.outerHTML}` );
        console.log( event.target );

        if ( event.target.matches( ".tiles" ) ) {
            console.log( ` EVENT LOGGED: ${event.target.id}` );
            transferTile(event);
        }

        if ( event.target.matches( "#button_start" ) ) {
            drawGameBoard( 6, 6 );
            arrangeTilesDeck();
            prepareCurrentTile();
        }

    }, false );
}

// let switchGameMode = function() {
//     console.log();
// }


///////////////////////
// Create Game Board //
///////////////////////
let drawGameBoard = function( mapSizeX, mapSizeY ) {
    console.log( `func:drawGameBoard X:${mapSizeX} Y:${mapSizeY}` );
    clearGameBoard();
    let calGridArr = calGridSize( mapSizeX, mapSizeY );
    let sqGridSize = calGridArr[ 0 ];
    let refGrid = calGridArr[ 1 ];
    let map_container = document.querySelector( '.map_container' );
    let rowStringX = `repeat( ${mapSizeX}, ${sqGridSize}${refGrid} )`;
    let rowStringY = `repeat( ${mapSizeY}, ${sqGridSize}${refGrid} )`;
    let loc_id = "";
    for ( let y = 0; y < mapSizeY; y++ ) {
        for ( let x = 0; x < mapSizeX; x++ ) {
            let addDiv = document.createElement( 'div' );
            loc_id = x + "-" + y;
            addDiv.id = loc_id;
            // addDiv.textContent = loc_id;
            addDiv.className = "tiles";
            map_container.appendChild( addDiv );
        }
    }
    map_container.style.gridTemplateRows = rowStringY;
    map_container.style.gridTemplateColumns = rowStringX;
    console.log( `X:${rowStringX} Y:${rowStringY}` );
    drawInGameControls( sqGridSize + refGrid );
}

let calGridSize = function( mapSizeX, mapSizeY ) {
    console.log( `func:calGridSize map size, X: ${mapSizeX}  Y: ${mapSizeY}` );
    let sqGridSize = 0;
    let refGrid = "";
    let calGridX = Math.floor( window.innerWidth / mapSizeX / 10 ) * 10;
    let calGridY = Math.floor( window.innerHeight / mapSizeY / 10 ) * 10 - 80; //80 is the height of the title and game controls containers
    if ( calGridX >= calGridY ) {
        sqGridSize = Math.floor( calGridY / window.innerHeight * 100 );
        refGrid = "vh";
    } else {
        sqGridSize = Math.floor( calGridX / window.innerWidth * 100 );
        refGrid = "vw";
    }
    console.log( `innerWidth calGridX=> ${calGridX}` );
    console.log( `innerHeight calGridY=> ${calGridY}` );
    console.log( `sqGridSize=> ${sqGridSize}` );
    // gameParam.sqGridSize = sqGridSize;
    // gameParam.refGrid = refGrid;
    return [ sqGridSize, refGrid ];
}

let drawInGameControls = function( tileParam ) {
    console.log( `func: drawInGameControls` )
    let ingameContainer = document.getElementById( 'ingame_controls_container' );
    let addDiv = document.createElement( 'div' );
    addDiv.id = "currentTile";
    addDiv.className = "newtiles";
    addDiv.textContent = "Current";
    addDiv.style.width = tileParam;
    addDiv.style.height = tileParam;
    ingameContainer.appendChild( addDiv );

    let addDiv2 = document.createElement( 'div' );
    addDiv2.id = "nextTile";
    addDiv2.className = "newtiles";
    addDiv2.textContent = "Next";
    addDiv2.style.width = tileParam;
    addDiv2.style.height = tileParam;
    ingameContainer.appendChild( addDiv2 );
}

let clearGameBoard = function() {
    console.log( `func:clearing gameboard` );
    let mapContainer = document.querySelector( '.map_container' );
    while ( mapContainer.hasChildNodes() ) {
        mapContainer.removeChild( mapContainer.lastChild );
    }
    let inGameControls = document.querySelector( '.ingame_controls_container' );
    while ( inGameControls.hasChildNodes() ) {
        inGameControls.removeChild( inGameControls.lastChild );
    }
}

let arrangeTilesDeck = function() {
    console.log( `func:arrangeTilesDeck` );
    for ( let i = 0; i < tilesDB.length; i++ ) {
        for ( let j = 0; j < tilesDB[ i ][ "qty" ]; j++ ) {
            tilesDeck.push( tilesDB[ i ][ "tid" ] );
        }
    }
    for ( let i = 0; i < 100; i++ ) {
        let tempIndex1 = Math.floor( Math.random() * tilesDeck.length );
        let tempIndex2 = Math.floor( Math.random() * tilesDeck.length );
        let tempIndex3 = Math.floor( Math.random() * tilesDeck.length );
        let tempString = tilesDeck[ tempIndex1 ];
        tilesDeck[ tempIndex1 ] = tilesDeck[ tempIndex2 ];
        tilesDeck[ tempIndex2 ] = tilesDeck[ tempIndex3 ];
        tilesDeck[ tempIndex3 ] = tempString;
    }
    console.log( `tilesDeck Length: ${tilesDeck.length}` );
    console.log( tilesDeck );
}

///////////////////////////////////////////////////////
// game logic //
///////////////////////////////////////////////////////
let prepareCurrentTile = function() {
    console.log( `func:prepareTile` );
    let currentTile = document.getElementById( "currentTile" );
    let tileStr = tilesDeck[ tilesDeck.length - 1 ]
    currentTile.style.backgroundImage = `url("images/tile${tileStr}.svg")`;
    console.log( `url("images/tile${tileStr}.svg"` );
    tilesDeck.pop();
    console.log( tilesDeck.length );
}

let transferTile = function(event) {
    console.log( `func:transferTile >>>>>>>>>> ` );
    let currentTile = document.getElementById( "currentTile" );
    let transferCurrentTile = document.getElementById(event.target.id);
    transferCurrentTile.style.backgroundImage = currentTile.style.backgroundImage;
    console.log( "transferred!" );
    prepareCurrentTile();
}

//////////////////////
// Display Functions//
//////////////////////
let display = function( message = "" ) {
    console.log( `func:display msg="${message}"` );
    let output = document.querySelector( '#output' );
    output.innerHTML = message;
};

let displayScores = function() {};
