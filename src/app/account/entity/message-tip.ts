declare let $: any;
export function tipMessage(text: string, type?: string, duration?: number) {
    $.toast({
        icon: type || 'error',
        text: text,
        position: 'top-center',
        allowToastClose: false,
        hideAfter: duration || 1000
    })
}

export function IeDrage() {
    if ($('.nz-overlay-container')[0]) {
        if ($('.nz-overlay-pane>div').length > 0) {
            // 设置height:100%;
            // $('.nz-overlay-container').remove()
            $('.nz-overlay-container').css({ 'height': '100%' })
        } else {
            // 设置height:0%;
            $('.nz-overlay-container').css({ 'height': '0%' })
            // $('.nz-overlay-container').remove();
        }
    }
}
