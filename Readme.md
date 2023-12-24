# New Features Overview

The latest game update introduces exciting features that enhance gameplay and overall user experience. Here's a brief overview of each new feature, along with the corresponding code locations:

## 1. More Enemies and Bullet Classes

**Description:**  
As the game progresses through levels, new enemies, including the Tank and Spaceship, have been introduced. These enemies come with different bullet classes, adding variety and difficulty to the gameplay.

**Code Location:**

- `Tank.js`: Tank enemy class.
- `TankBullet.js`: Bullet class for the Tank enemy.
- `Spaceship.js`: Spaceship enemy class.
- `SpacechipBullet.js`: Bullet class for the Spaceship enemy.

## 2. Power Ups - Extra Life and Bullet Shield

**Description:**  
Power-ups have been added to provide players with additional advantages. The game now features extra life and a bullet shield power-up. The `Powerup.js` class manages power-ups, and the `BulletShield.js` class extends from it.

**Code Location:**

- `Powerup.js`: Power-up class.
- `BulletShield.js`: Bullet shield power-up class.
- `Player.js`: Integration of power-up features in the Player class.

**Additional Details:**

- The `bulletShield` boolean variable has been added to the Player class to track whether the player has successfully claimed a bullet shield.
- In the `draw` function of the Player class, the `bulletShield` variable is set to false after 20 seconds of the player collecting it. This ensures a time-limited protection for the player.

## 3. Enhanced Player's Bullet

**Description:**  
The player's bullet has received enhancements as the game progresses through levels and score milestones. Players now experience improved firepower, adding strategic depth to the gameplay.

**Code Location:**

- `Player.js`: Enhancements to the player's bullet in the `shoot` function.

## 4. Player's Address Display with Copy Button

**Description:**  
For user convenience, the player's address is now displayed at the bottom of the screen. A copy button has been added, simplifying the process of accessing and sharing the player's address.

**Code Location:**

- `index.js`,`login.js`: Implementation of the address display and copy button.

## 5. Minting Function Shift

**Description:**  
The minting function, responsible for claiming nft achievements, has been strategically shifted to the end of the game. Players are now rewarded with a Guru badge upon successfully completing all three levels.
