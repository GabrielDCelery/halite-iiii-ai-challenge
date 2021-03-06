'use strict';

const commands = require('../settings/commands');
const constants = require('../settings/constants');
const GameEntity = require('./GameEntity');
const Position = require('../map/helpers/Position');
const ShipStateFactory = require('./ShipStateFactory');

/** Represents a ship. */
class Ship extends GameEntity {
    constructor(_owner, _id, _position, _haliteAmount) {
        super(_owner, _id, _position);
        this.haliteAmount = _haliteAmount;
    }

    setHaliteAmountInCargo (_haliteAmount) {
        this.haliteAmount = _haliteAmount;

        return this;
    }

    initState () {
        this.state = new ShipStateFactory(this);

        return this;
    }

    /** Is this ship at max halite capacity? */
    get isFull() {
        return this.haliteAmount >= constants.MAX_HALITE;
    }

    getHaliteInCargo () {
        return this.haliteAmount;
    }

    /** Return a move to turn this ship into a dropoff. */
    makeDropoff() {
        return `${commands.CONSTRUCT} ${this.id}`;
    }

    /**
     * Return a command to move this ship in a direction without
     * checking for collisions.
     * @param {String|Direction} direction the direction to move in
     * @returns {String} the command
     */
    move(direction) {
        if (direction.toWireFormat) {
            direction = direction.toWireFormat();
        }
        return `${commands.MOVE} ${this.id} ${direction}`;
    }

    /**
     * Return a command to not move this ship.
     *
     * Not strictly needed, since ships do nothing by default.
     */
    stayStill() {
        return `${commands.MOVE} ${this.id} ${commands.STAY_STILL}`;
    }

    createCommandForTurn() {
        return this.state.createCommandForTurn();
    }

    toString() {
        return `${this.constructor.name}(id=${this.id}, ${this.position}, cargo=${this.haliteAmount} halite)`;
    }
}

module.exports = Ship;
