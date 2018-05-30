// tetris2.js

const canvas    = document.querySelector("#tetris");
const context   = canvas.getContext('2d');

// blow up pixels to 20x
context.scale(20,20);

// --- drop variables ---
let drop_counter = 0;
let drop_interval = 1000;
let last_time = 0;




// JWXNOTE: 2-dimensional arrays allow for easy x,y access to shapes.
const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
];

// --- PLAYER OBJECT ---
// drives draw_matrix()
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix
};

// --- ARENA OBJECT ---
const arena = create_matrix(12, 20);
console.table(arena);

// detect collision
function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];

    // TODO: figure out this voodoo magic.
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }

    return false;
}

// create gameboard matrix (TODO: figure out how this works.)
function create_matrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// wrap in function
function draw_matrix(matrix, offset) {
    // JWXNOTE: use this structure to draw a 2D array shape.
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function player_drop() {
    player.pos.y++;

    if (collide(arena, player)) {
        player.pos.y++; // move it back up after collision.
        merge(arena, player);
        player.pos.y = 0;
    }

    drop_counter = 0;
}

// --- draw function ---
function draw() {
    // draw black
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    draw_matrix(arena, {x: 0, y: 0});

    draw_matrix(player.matrix, player.pos);
}

// --- merge function ---
// takes player piece value and merges with arena.
function merge(arena, player) {
    // matrix-magic
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;  // TODO: NOT WORKING.
            }
        });
    });
}



// --- update function ---
function update(time = 0) {
    let delta_time = time - last_time;
    last_time = time;   
    drop_counter += delta_time;

    if (drop_counter > drop_interval) {
        player_drop();
    }

    draw();    
    requestAnimationFrame(update);
}

// --------------
// --- EVENTS ---
// --------------

//
document.addEventListener('keydown', ev => {

    if (ev.keyCode === 37) {
        player.pos.x--;
    }
    else if (ev.keyCode === 39) {
        player.pos.x++;
    }
    else if (ev.keyCode === 40) {
        player_drop();
    }

});

// start err-thang.
window.addEventListener('load', function(ev) {
    update();
});
