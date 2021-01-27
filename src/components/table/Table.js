import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table.tamplate';
import {tableResize} from '@/components/table/table.resize';
import {matrix, tableFunctions, nextSelector} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/Table.selection';
import {isCell} from '@/components/table/table.dataset';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    static rowsCount = 50;
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
        this.unsub = [];
    }
    prepare() {
        this.selection = new TableSelection();
    }

    toHTML() {
        return createTable(Table.rowsCount);
    }
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell)
    }
    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);
        this.$on('formula:input', (text) => {
            this.selection.current.text(text)
        })
        this.$on('formula:keydown', () => {
            this.selection.current.focus();
        })
    }
    onMousedown(event) {
        if(tableFunctions(event)) {
            tableResize(event, this.$root)
        } else if(isCell(event)) {
            const $target = $(event.target);
            if(event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
            }
        }
        this.$emit('table:click', $(event.target));
    }
    onKeydown(event) {
        const keys = [
            'Tab',
            'Enter',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ];
        const {key} = event
        if(keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id, Table.rowsCount - 1, 25));
            this.selectCell($next);
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}