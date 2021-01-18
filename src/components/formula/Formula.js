import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
        super ($root, {
            name: 'formula',
            listeners: ['input', 'click']
        })
    }
    toHTML() {
        return `
            <span class="excel__formula-title">fx</span>
            <span class="excel__formula-input" contenteditable="true" spellcheck="false"></span>
        `;
    }

    onInput() {
        console.log(this.$root);
        console.log('Formula event', event);
    }

    onClick() {
        console.log(this.$root, 'click');
    }
}