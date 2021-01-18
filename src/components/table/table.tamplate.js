const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    return `
    <div class='row'>
        <div class="row__info">${index ? index : ''}</div>
        <div class="row__data">${content}</div>
    </div>`;
}

function createCol(el) {
    return `<span class="row__item-content">${el}</span>`;
}

function toCell() {
    return `<span class="row__item-content" contenteditable="true"></span>`;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows =[];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols));

    for(let i =0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1, cells));
    }
    return rows.join('');
}