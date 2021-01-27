import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header';
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        });
    }
    toHTML() {
        return `
        <input class="excel__header-input" type="text" placeholder="Новая таблицы">
        <div class="wrap">
            <button class="excel__header-button excel__header-button--access btn" type="button">
                <span class="material-icons">note_add</span>
            </button>
            <button class="excel__header-button excel__header-button--remove btn" type="button">
                <span class="material-icons">delete_forever</span>
            </button>
        </div>
        `;
    }
}