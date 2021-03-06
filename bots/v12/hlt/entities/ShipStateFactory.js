'use strict';

const VALID_STATES = {
    MoveToDropoff: require('./shipStates/MoveToDropoff'),
    CollectHaliteInArea: require('./shipStates/CollectHaliteInArea'),
    MoveToArea: require('./shipStates/MoveToArea'),
    SuicideRushHome: require('./shipStates/SuicideRushHome'),
    MoveToLocationAndConvertToDropoff: require('./shipStates/MoveToLocationAndConvertToDropoff')
}

class ShipStateFactory {
    constructor (_ship) {
        this.ship = _ship;
        this.setState('MoveToArea');
    }

    static get VALID_STATES () {
        return {
            MoveToDropoff: 'MoveToDropoff',
            CollectHaliteInArea: 'CollectHaliteInArea',
            MoveToArea: 'MoveToArea',
            SuicideRushHome: 'SuicideRushHome',
            MoveToLocationAndConvertToDropoff: 'MoveToLocationAndConvertToDropoff'
        }
    }

    callMethodOnState (_methodname, _argumentsArray) {
        if (!this.state[_methodname]) {
            return false;
        }

        return Reflect.apply(this.state[_methodname], this.state, _argumentsArray);
    }

    setState (_newStateName, _config) {
        this.state = new VALID_STATES[_newStateName](ShipStateFactory.VALID_STATES, this.ship, _config);
    }

    toggleCommandCreatedForTurn(_boolean) {
        this.state.toggleCommandCreatedForTurn(_boolean);

        return this;
    }

    createCommandForTurn () {
        if (this.state.commandCreatedForTurn === true) {
            return null;
        }

        const _newStateName = this.state.checkIfNeedsToTransitionToNewState();

        if (_newStateName) {
            this.setState(_newStateName);
        }

        this.toggleCommandCreatedForTurn(true);

        const _command = this.state.createCommandForTurn();

        return _command;
    }
}

module.exports = ShipStateFactory;
