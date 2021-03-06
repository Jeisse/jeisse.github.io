/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 808;
    canvas.height = 909;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        gameReset();
		initLoad  ();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        if (play === true) {
            allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
            npc.forEach(function(npc) {
                npc.update(dt);
            });
    		player.update();
        }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
		if (play === true) {
    		ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (level === 1) {
                var rowImages = [
                        'images/water-block.png',   // Top row is water
                        'images/stone-block.png',   // Row 1 of 4 of stone
                        'images/stone-block.png',   // Row 2 of 4 of stone
                        'images/stone-block.png',   // Row 3 of 4 of stone
                        'images/grass-block.png'    // Row 1 of 1 of grass
                    ],
                    numRows = 5,
                    numCols = 8,
                    row, col;
                    if (player.row === 0) {
                        player.render();
                    }
                    npc.forEach(function(npc) {
                        if (npc.distress) {
                            npc.render();
                        }
                    });
            }
            if (level === 2) {
                var rowImages = [
                        'images/grass-block.png',   // Top row is grass
                        'images/water-block.png',   // Row 1 of 4 of water
                        'images/water-block.png',   // Row 2 of 4 of water
                        'images/water-block.png',   // Row 3 of 4 of water
                        'images/water-block.png',   // Row 4 of 4 of water
                        'images/stone-block.png',   
                    ],
                    numRows = 6,
                    numCols = 8,
                    row, col;
                    // Render all enemies not on top row of water
                    allEnemies.forEach(function(enemy) {
                            if (enemy.row !== 1) {
                                enemy.render();
                            }
                        });
                    // Render player when in water; player is rendered before water, so appears "under" water
                    if (player.row > 0 && player.row < 5) {
                        player.render();
                    }
            }
            /* Loop through the number of rows and columns we've defined above
             * and, using the rowImages array, draw the correct image for that
             * portion of the "grid"
             */
            for (row = 0; row < numRows; row++) {
                /* We want to render enemies underwater only after water blocks.
                 * If we do not run this check, land blocks render before and
                 * as they are not transparent, partially obscures enemies on
                 * top row of water
                 */
                allEnemies.forEach(function(enemy) {
                            if (row === 1 && enemy.row === 1) {
                                enemy.render();
                            }
                        });
                for (col = 0; col < numCols; col++) {
                    /* The drawImage function of the canvas' context element
                     * requires 3 parameters: the image to draw, the x coordinate
                     * to start drawing and the y coordinate to start drawing.
                     * We're using our Resources helpers to refer to our images
                     * so that we get the benefits of caching these images, since
                     * we're using them over and over.
                     */
                    if (rowImages[row] === 'images/water-block.png') {
                        /* If we are drawing water, we will shift the transparency slightly
                         * In addition, because the block "edge" destroys the transparency
                         * effect, we will draw only the "surface" portion of the block
                         */
                        ctx.save();
                        ctx.globalAlpha = 0.8;
                        ctx.drawImage(Resources.get(rowImages[row]), 0, 50,
                            Resources.get(rowImages[row]).width,
                            Resources.get(rowImages[row]).height - 86,
                            col * 101, row * 83 + 50,
                            Resources.get(rowImages[row]).width,
                            Resources.get(rowImages[row]).height - 86);
                        ctx.restore();
                    }
                    else {
                        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                    }
                }
            }

            renderEntities();
		}
        else {
            loadRender();
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        if (level !== 2) {
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
        }
        // Loop through NPCs, and render a method depending on level and state
        npc.forEach(function(npc) {
            switch(level) {
                case 1:
                    if (!npc.distress) {
                        npc.render();
                    }
                    if (npc.distress) {
                        npc.halfRender();
                    }
                    break;
                case 2:
                    npc.render();
                    break;
            }
        });
        if (win === true || (level === 1 && player.row !== 0) || (level === 2 && (player.row === 0 || player.row === 5))) {
		    player.render();
        }
        player.halfRender();
    }

	function loadRender() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (col = 0; col <5; col++) {
				ctx.drawImage(Resources.get("images/stone-block.png"), col * 101 + 101, 249);
			}
		selector.render();
		for (var i = 0; i < chars.length; i++) {
			ctx.drawImage(Resources.get(chars[i]), i * 101 + 101, 215);
		}
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
		'images/Star.png',
		'images/Selector.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png',
        'images/Gem-Green.png',
        'images/Gem-Blue.png',
        'images/Gem-Orange.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
