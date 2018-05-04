// GAME.JS: Main game code.

// --- game object ---
let game = {
  // start initializing objects, preload assets, and display start screen.
  init: function() {
    // initialize other objects.
    levels.init();

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
  }
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
  load: function() {},
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
    loader.loaded_count++;
  }
};


















// --- event handlers ---
window.addEventListener('load', (ev) => {
  console.log('Errthang loaded, yo.');
  game.init();
});
