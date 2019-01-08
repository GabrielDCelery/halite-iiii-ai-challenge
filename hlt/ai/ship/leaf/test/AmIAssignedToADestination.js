'use strict';

const Leaf = require('../Leaf');

class AmIAssignedToADestination extends Leaf {
    init () {
        return this;
    }

    process () {
        if (this.ship.getState('destination')) {
            return this.SUCCESS;
        }

        return this.FAIL;
    }
}

module.exports = AmIAssignedToADestination;