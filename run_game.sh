#!/bin/sh

./halite --replay-directory replays/ -vvv --width 32 --height 32 "node MyBot.js" "node ./bots/v11/MyBot.js"
