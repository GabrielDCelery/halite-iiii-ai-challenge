'use strict';

const constants = require('../../settings/constants');

class MoveToArea {
    constructor (_validStates, _ship) {
        this.validStates = _validStates;
        this.ship = _ship;
        this.playerAI = this.ship.getPlayerPublicMethods().getAI();
    }

    checkIfNeedsToTransitionToNewState () {
    }

    createCommandForTurn () {
    }
}

module.exports = MoveToArea;