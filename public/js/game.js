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


















// --- event handlers ---
window.addEventListener('load', (ev) => {
  console.log('Errthang loaded, yo.');
  game.init();
});
