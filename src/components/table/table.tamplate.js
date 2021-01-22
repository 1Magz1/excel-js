const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    const contentItem = index ? '<div class="resize resize--mode" data-resize="row"></div>' : '';
    return `
    <div class='row' data-type="resizable">
                ${contentItem}

        <div class="row__info" >
            ${index ? index : ''}
        </div>
        <div class="row__data">${content}</div>
    </div>`;
}

function createCol(el, index) {
    const pos = index + 1;
    return `
    <div class="row__item-content" data-type="resizable" data-col="${pos}">
        ${el}
        <div class="resize" data-resize="col"></div>
    </div>`;
}

function toCell(_, index) {
    const pos = index + 1;
    return `<span class="row__item-content" contenteditable="true" data-col="${pos}"></span>`;
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