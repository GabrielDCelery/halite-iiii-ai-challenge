'use strict';

const _ = require('lodash');
const TableWrapper = require('../utils/TableWrapper');
const CollectionRateAtCellAnalyzer = require('../analysis/CollectionRateAtCellAnalyzer');
const TurnsToSpendAtCellSuggestor = require('../analysis/TurnsToSpendAtCellSuggestor');

const NUM_OF_TURNS_TO_ANALYZE = 25;
const CARGO_MAXIMUM_AMOUNT = 1000;
const CELL_MAXIMUM_AMOUNT = 1000;
const NEAREST_NTH = 10;

const createRoundedCollectionRatesTable = function createRoundedCollectionRatesTable (_numOfTurns, _cargoMaximumAmount, _cellMaximumAmount, _nearestNth) {
    const _tableWrapper = new TableWrapper(TableWrapper.generateEmptyTable(_cargoMaximumAmount / _nearestNth, _cellMaximumAmount / _nearestNth));
    
    _.times(_cargoMaximumAmount / _nearestNth, _i => {
        _.times(_cellMaximumAmount / _nearestNth, _j => {
            const _roundedAmountInCargo = _i * _nearestNth;
            const _roundedAmountOnCell = _j * _nearestNth;
            const _turnByTurnAnalysis = new CollectionRateAtCellAnalyzer(_numOfTurns).generateTurnByTurnAnalysis(_roundedAmountInCargo, _roundedAmountOnCell);
    
            return _tableWrapper.setCellValue(_i, _j, _turnByTurnAnalysis);
        });
    });

    return _tableWrapper;
}


const _result = createRoundedCollectionRatesTable(NUM_OF_TURNS_TO_ANALYZE, CARGO_MAXIMUM_AMOUNT, CELL_MAXIMUM_AMOUNT, NEAREST_NTH);

const _collectionRateTable = _result.getCellValueByIndex(10, 10);

console.log(_collectionRateTable)

const turnsToSpendAtCellSuggestor = 
    new TurnsToSpendAtCellSuggestor()
        .setCollectionRateTable(_collectionRateTable)
        .setThresholds({
            min: [{
                label: CollectionRateAtCellAnalyzer.COLUMN_LABELS.LEAVE_COST,
                threshold: 30
            }],
            max: [{
                label: CollectionRateAtCellAnalyzer.COLUMN_LABELS.CARGO_INCREASE_RATE,
                threshold: 3
            }]
        });


const _recommendedTurns = turnsToSpendAtCellSuggestor.calculate();

console.log(_recommendedTurns);


