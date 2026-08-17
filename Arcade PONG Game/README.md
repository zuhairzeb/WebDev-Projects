# 🎮 Arcade PONG Game

A retro-style, browser-based PONG game with authentic arcade aesthetics, realistic physics, and sound effects.

## 📋 Features

- **Two-Player Gameplay**: Play against another player on the same keyboard
- **Realistic Physics**: Ball velocity, paddle acceleration/deceleration, and collision detection
- **Arcade Aesthetic**: Retro 8-bit style with "Press Start 2P" font and arcade machine background
- **Sound Effects**: Audio feedback for paddle hits, wall bounces, and scoring
- **Score Tracking**: Real-time scoreboard for both players
- **3D Perspective**: Game area rendered with a 3D isometric perspective effect
- **Smooth Animation**: 120 FPS game loop (8ms refresh rate)

## 🎮 How to Play

### Starting the Game
1. Open `index.html` in a web browser
2. Press any key to start playing

### Controls

**Player 1** (Left Paddle):
- **W** - Move paddle up
- **S** - Move paddle down

**Player 2** (Right Paddle):
- **↑ Arrow Up** - Move paddle up
- **↓ Arrow Down** - Move paddle down

### Gameplay
- The ball bounces off the top and bottom walls
- Hit the ball with your paddle to send it to the opponent
- If the ball goes past your paddle, the opponent scores a point
- Press any key after a score to continue playing

## 📁 Project Structure

```
Arcade PONG Game/
├── index.html          # Main HTML file
├── style.css           # Styling and visual effects
├── script.js           # Game logic and physics
├── assets/             # Game assets
│   ├── machine.png     # Arcade machine background image
│   ├── paddle.wav      # Sound effect for paddle hits
│   ├── wall.wav        # Sound effect for wall bounces
│   └── loss.wav        # Sound effect for scoring
└── README.md           # This file
```

## 🛠️ Technical Details

### Game Variables
- **Game Area**: 600px × 400px
- **Paddle Size**: 20px wide × 100px tall
- **Ball Size**: 20px × 20px
- **Max Paddle Speed**: 5 pixels per frame
- **Initial Ball Speed**: 2 pixels per frame in both directions
- **Game Loop**: Updates every 8 milliseconds

### Physics Implementation

**Paddle Movement:**
- Acceleration: 1 pixel/frame² when key is held
- Deceleration: 1 pixel/frame² when key is released
- Bounded within game area

**Ball Physics:**
- Moves continuously at `ballSpeedX` and `ballSpeedY`
- Bounces off top and bottom walls
- Collides with paddles to reverse horizontal direction
- Resets to center when scoring occurs

**Collision Detection:**
- Wall collisions trigger sound and reverse vertical direction
- Paddle collisions reverse horizontal direction
- Out-of-bounds detection awards points to opponent

### Sound System
- All sounds are played at 0 current time to allow rapid replay
- Three distinct sound effects for different game events:
  - Paddle hits
  - Wall bounces
  - Scoring

## 🎨 Visual Design

The game features:
- **Retro Typography**: "Press Start 2P" font for authentic arcade feel
- **Dark Theme**: Dark background with semi-transparent game area
- **3D Perspective**: CSS 3D transforms create isometric view
- **Vignette Effect**: Dark edges for atmospheric framing
- **Backdrop Blur**: Semi-transparent game area with glass effect

## 💻 Browser Compatibility

Works in all modern browsers supporting:
- CSS Grid and Flexbox
- CSS 3D Transforms
- Web Audio API
- ES6+ JavaScript

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Press any key to start playing
4. Enjoy!

## 📝 Notes

- The game pauses after each point is scored
- Ball direction is randomized on reset to add variety
- Sounds require user interaction to play (browser autoplay policies)
- Game is optimized for desktop play with keyboard controls

## 🎯 Future Enhancements

Possible improvements:
- AI opponent mode
- Difficulty levels
- Score persistence (localStorage)
- Mobile touch controls
- Ball speed progression
- Power-ups or special effects
- Multiplayer online support

## 📄 License

Feel free to use and modify this project for personal or educational purposes.

---

**Enjoy the game! 🎮**
