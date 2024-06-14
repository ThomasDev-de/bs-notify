(function ($) {
    $.bsNotify = function (options) {
        const settings = $.extend(true, {
            type: 'info',
            title: null,
            message: 'Always be informed',
            delay: 5000,
            autohide: true,
            placement:'mc',
            onShow() {
            },
            onShown() {
            },
            onHide() {
            },
            onHidden() {
            },
        }, options || {});

        const toastContainerId = 'toast_container_583555b1-3319-4b81-a812-2819f8dfae9c';

        function getIconByType(type) {
            switch (type) {
                case 'info':
                    return 'bi bi-info-circle';
                case 'warning':
                    return 'bi bi-exclamation-triangle';
                case 'success':
                    return 'bi bi-check2';
                case 'danger':
                    return 'bi bi-x';
                default:
                    return 'bi bi-chevron-right';
            }
        }

        function getContainer() {
            let container = $('#' + toastContainerId);
            if (container.length)
                return container;
            let placementClass = '';
            switch (settings.placement){
                case 'ts':
                    placementClass = 'top-0 start-0';
                    break;
                case 'tc':
                    placementClass = 'top-0 start-50 translate-middle-x';
                    break;
                case 'te':
                    placementClass = 'top-0 end-0';
                    break;
                case 'ms':
                    placementClass = 'top-50 start-0 translate-middle-y';
                    break;
                case 'mc':
                    placementClass = 'top-50 start-50 translate-middle';
                    break;
                case 'me':
                    placementClass = 'top-50 end-0 translate-middle-y';
                    break;
                case 'bs':
                    placementClass = 'bottom-0 start-0';
                    break;
                case 'bc':
                    placementClass = 'bottom-0 start-50 translate-middle-x';
                    break;
                case 'be':
                    placementClass = 'bottom-0 end-0';
                    break;
            }
            container = $('<div>', {
                id: toastContainerId,
                class: `toast-container position-fixed ${placementClass} p-3`
            }).appendTo('body');
            return container;
        }

        function getColorByType(type) {
            switch (type) {
                case 'info':
                case 'warning':
                case 'success':
                case 'danger':
                case 'light':
                case 'dark':
                case 'primary':
                case 'secondary':
                    return type;
                default:
                    const htmlTheme = $('html').attr('data-bs-theme');
                    return htmlTheme === 'dark' ? 'light' : 'dark';
            }
        }

        function build() {
            let header = '';
            const toast = $('<div>', {
                class: `toast fade text-bg-${getColorByType(settings.type)} border-0`,
                role: 'alert',
                'aria-live': 'assertive',
                'aria-atomic': 'true',
                'data-bs-delay' : settings.delay,
                'data-bs-autohide' : settings.autohide,
            }).appendTo(getContainer());

            if (settings.title !== null) {
                const icon = getIconByType(settings.type);
                header = `
                <div class="toast-header">
                    <i class="${icon} rounded me-2"></i>
                    <strong class="me-auto">${settings.title}</strong>
                    <small class="text-body-secondary d-none">just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>`;
                $(header).appendTo(toast)
            }

            const toastBody = `
            <div class="toast-body">
               ${settings.message}
            </div>  `;
            $(toastBody).appendTo(toast);

            toast
                .on('hide.bs.toast', settings.onHide)
                .on('hidden.bs.toast', settings.onHidden)
                .on('show.bs.toast', settings.onShow)
                .on('shown.bs.toast', settings.onShown)

            toast.toast('show');
        }

        function init() {
            build();
            getContainer().on('hidden.bs.toast', '.toast', function (e) {
                $(e.currentTarget).remove();
            })
        }


        init();
    }
}(jQuery));
