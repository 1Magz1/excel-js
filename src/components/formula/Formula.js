import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super ($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }
    init() {
        super.init();
        this.$formula = this.$root.find('#formula');
        this.$on('table:select', ($cell) => {
            this.$formula.text($cell.text());
        })
        this.$on('table:input', ($cell) => {
            this.$formula.text($cell.text());
        })
        this.$on('table:click', ($cell) => {
            this.$formula.text($cell.text());
        })
    }
    toHTML() {
        return `
            <span class="excel__formula-title">fx</span>
            <span class="excel__formula-input" contenteditable="true" spellcheck="false" id="formula"></span>
        `;
    }

    onInput() {
        this.$emit('formula:input', $(event.target).text());
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if(keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:keydown')
        }
    }
}