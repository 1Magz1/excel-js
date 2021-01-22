import {$} from '@core/dom';

export function tableResize(event, $root) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const pos = $parent.data.col;

    const type = event.target.dataset.resize;
    let value
    $resizer.css({opacity: '1'});

    document.onmousemove = (e) => {
        document.body.style.userSelect = 'none';
        if(type === 'col') {
            const delta = Math.floor(e.screenX - coords.right);
            value = coords.width + delta;
            $resizer.css({right: -delta + 'px'});
        } else {
            const delta = e.clientY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({bottom: -delta + 'px'});
        }
    }
    document.onmouseup = () => {
        document.body.style.userSelect = 'text';
        if(type === 'col') {
            $parent.css({maxWidth: value+ 'px'});
            const cells = $root.findAll(`[data-col="${pos}"]`);
            cells.forEach((el) => el.style.maxWidth = value + 'px');
        } else {
            $parent.css({height: value + 'px'});
            $resizer.css({opacity: '', bottom: ''});
        }

        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.css({opacity: '', right: ''});
    }
}