// GAME.JS: Main game code.

// --- game object ---
let game = {
  // start initializing objects, preload assets, and display start screen.
  init: function() {
    // initialize other objects.
    levels.init();
    loader.init();

    // hide all game layers and display start screen
    $('.gamelayer').hide();
    $('#gamestartscreen').show();

    // get handlers for canvas and context
    game.canvas = document.getElementById('gamecanvas');
    game.context = game.canvas.getContext('2d');
  },

  // show level select screen
  showLevelScreen: function() {
    $('.gamelayer').hide();
    $('#levelselectscreen').show('slow');
  },

  // Game mode
  mode: 'intro',

  // X&Y coordinates of sligshot
  slingshot_x: 140,
  slingshot_y: 280,

  start: function() {
    $('.gamelayer').hide();

    // display the game canvas and scorescreen
    $('#gamecanvas').show();
    $('#scorescreen').show();

    game.mode = 'intro';
    game.offset_left = 0; //tracks current position
    game.ended = false;
    game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
  },

  handle_panning: function() {
    game.offset_left++; // temporary placeholder - continues to pan to the right
  },

  animate: function() {
    //temp:
    game.handle_panning();  

    // animate the backgrounds
    // draw background with parallax scrolling
    game.context.drawImage(game.current_level.background_image, game.offset_left/4, 0, 640, 480, 0, 0, 640, 480);
    game.context.drawImage(game.current_level.foreground_image, game.offset_left, 0, 640, 480, 0, 0, 640, 480);

    // draw the slingshot
    game.context.drawImage(game.slingshot_image, game.slingshot_x - game.offset, game.slingshot_y);
    game.context.drawImage(game.slingshot_front, game.slingshot_x - game.offset, game.slingshot_y);

    if (!game.ended) {
      game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    }
  },


};

// --- levels object ---
let levels = {
  data: [
    {
      // first level
      foreground: 'desert-foreground',
      background: 'clouds-background',
      entities: []
    },
    {
      // second level
      foreground: 'desert-foreground',
      background: 'clouds-background',
      entities: []
    }
  ],

  // Initialize level selection screen.
  init: function () {

    // create html string and apply to create self-updating level select screen
    let html = '';

    for (let i = 0; i < levels.data.length; i++) {
      let level = levels.data[i];
      html += `<input type="button" value="${(i + 1)}">`;
    }
    $('#levelselectscreen').html(html);

    // set the button event handlers
    $('#levelselectscreen input').click(function() {

      // set current level, hide level select screen
      levels.load(this.value - 1);
      $('#levelselectscreen').hide();
    });
  },

  // Load all data and images for a specific level
  load: function(number) {
    // declare a new current level object
    game.current_level = {number: number, hero: []};
    game.score = 0;
    $('#score').html(`Score: ${game.score}`);

    let level = levels.data[number];

    // load the background, foreground, and slingshot images
    game.current_level.background_image = loader.load_image(`./images/backgrounds/${level.background}.png`);
    game.current_level.foreground_image = loader.load_image(`./images/backgrounds/${level.foreground}.png`);
    game.slingshot_image = loader.load_image(`./images/slingshot-front.png`);
    game.slingshot_front = loader.load_image(`./images/slingshot-front.png`);

    // call game.start() once the assets have loaded.
    if (loader.loaded) {
      game.start();
    } else {
      loader.onload = game.start;
    }
  },
};


// --- loader objec t---
let loader = {
  loaded: true,
  loaded_count: 0,  // loaded so far
  total_count: 0,   // total needed to load

  init: function() {},

  load_image: function(url) {
    this.total_count++;
    this.loaded = false;
    $('#loadingscreen').show();

    let image = new Image();
    image.src = url;
    image.onload = loader.item_loaded;
    return image;
  },

  sound_file_extension: '.ogg',

  load_sound: function(url) {
    this.total_count++;
    this.loaded = false;
    $('#loadingscreen').show();

    let audio = new Audio();
    audio.src = url+loader.sound_file_extension;
    audio.addEventListener('canplaythrough', loader.item_loaded, false);
    return audio;
  },

  item_loaded: function() {

    //temp:
    console.log('JWX: item loaded: ' + loader.loader_count);

    loader.loaded_count++;

    $('#loadingmessage').html(`Loaded ${loader.loaded_count} of ${loader.total_count}`);

    if(loader.loaded_count === loader.total_count) {
      // loader has loaded completely..
      loader.loaded = true;

      // hide loading Screen
      $('#loadingscreen').hide();

      // call loader.onload method if it exists
      if (loader.onload) {
        loader.onload();
        loader.onload = undefined;
      }
    }
  }
};


















// --- event handlers ---
window.addEventListener('load', (ev) => {
  console.log('Errthang loaded, yo.');
  game.init();
});
