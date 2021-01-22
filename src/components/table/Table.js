import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.tamplate';
import {tableResize} from '@/components/table/table.resize';
import {tableFunctions} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }
    toHTML() {
        return createTable(50);
    }

    onMousedown(event) {
        if(tableFunctions(event)) {
            tableResize(event, this.$root)
        }
    }
}