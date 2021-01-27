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

function toCell(row) {
    return function(_, index) {
        const pos = index + 1;
        return `<span
                    class="row__item-content"
                    contenteditable="true"
                    data-col="${pos}"
                    data-type="cell"
                    data-id="${row}:${index}"
                    ></span>`;
    }
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

    for(let row =0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join('')
        rows.push(createRow(row + 1, cells));
    }
    return rows.join('');
}