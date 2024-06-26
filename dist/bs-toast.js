// noinspection JSUnresolvedReference

(function ($) {
    $.bsToast = function (options) {
        const settings = $.extend(
            true,
            {
                type: "info",
                title: null,
                message: "Always be informed",
                start: 0,
                delay: 5000,
                autoHide: true,
                animation: true,
                placement: "mc",
                staticBackdrop: false,
                onShow() {},
                onShown() {},
                onHide() {},
                onHidden() {},
            },
            options || {},
        );

        const toastContainerId =
            "toast_container_583555b1-3319-4b81-a812-2819f8dfae9c_" +
            settings.placement;
        let backdrop;

        /**
         * Returns the icon class based on the given type.
         *
         * @param {string} type - The type of the icon.
         * @return {string} - The icon class corresponding to the given type.
         */
        function getIconByType(type) {
            switch (type) {
                case "info":
                    return "bi bi-info-circle";
                case "warning":
                    return "bi bi-exclamation-triangle";
                case "success":
                    return "bi bi-check2";
                case "danger":
                    return "bi bi-x";
                default:
                    return "bi bi-chevron-right";
            }
        }

        function getBackdrop() {
            const selector = $(".toast-backdrop");
            return selector.length ? selector : null;
        }

        /**
         * Retrieves the toast container element.
         *
         * @returns {$} The toast container element.
         */
        function getContainer() {
            if (settings.staticBackdrop) {
                if (null === getBackdrop()) {
                    $("<div>", {
                        class:
                            "position-absolute h-100 w-100 start-0 top-0 bottom-0 end-0 toast-backdrop",
                        css: {
                            display: "none",
                            backgroundColor: "rgba(0,0,0,.5)",
                            zIndex: 1055 // one more than modal backdrops
                        },
                    }).appendTo("body");
                }
            }

            let container = $("#" + toastContainerId);
            if (container.length) return container;
            let placementClass = "";
            switch (settings.placement) {
                case "ts":
                    placementClass = "top-0 start-0";
                    break;
                case "tc":
                    placementClass = "top-0 start-50 translate-middle-x";
                    break;
                case "te":
                    placementClass = "top-0 end-0";
                    break;
                case "ms":
                    placementClass = "top-50 start-0 translate-middle-y";
                    break;
                case "mc":
                    placementClass = "top-50 start-50 translate-middle";
                    break;
                case "me":
                    placementClass = "top-50 end-0 translate-middle-y";
                    break;
                case "bs":
                    placementClass = "bottom-0 start-0";
                    break;
                case "bc":
                    placementClass = "bottom-0 start-50 translate-middle-x";
                    break;
                case "be":
                    placementClass = "bottom-0 end-0";
                    break;
            }
            container = $("<div>", {
                id: toastContainerId,
                class: `toast-container position-fixed ${placementClass} p-3`,
            }).appendTo(backdrop ?? "body");
            return container;
        }

        /**
         * Retrieves the color based on the given type.
         *
         * @param {string} type - The type of color to retrieve (e.g. 'info', 'warning', 'success', 'danger', 'light', 'dark', 'primary', 'secondary').
         * @return {string} - The color corresponding to the given type.
         * If the type is not recognized, it returns the opposite color of the current theme.
         */
        function getColorByType(type) {
            switch (type) {
                case "info":
                case "warning":
                case "success":
                case "danger":
                case "light":
                case "dark":
                case "primary":
                case "secondary":
                    return type;
                default:
                    const htmlTheme = $("html").attr("data-bs-theme");
                    return htmlTheme === "dark" ? "light" : "dark";
            }
        }

        /**
         * Build and display a toast notification with the given settings.
         *
         * @return {void}
         */
        function build() {
            let header = "";
            const config = {
                show: settings.start,
                hide: settings.delay,
            };
            const fade = settings.animation ? "fade" : "";
            const toast = $("<div>", {
                class: `toast ${fade} text-bg-${getColorByType(
                    settings.type,
                )} border-0`,
                role: "alert",
                "aria-live": "assertive",
                "aria-atomic": "true",
                "data-bs-delay": config.hide,
                "data-bs-autohide": settings.autoHide,
            }).appendTo(getContainer());

            if (settings.title !== null) {
                const icon = getIconByType(settings.type);
                header = `
                <div class="toast-header">
                    <i class="${icon} rounded me-2"></i>
                    <strong class="me-auto">${settings.title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>`;
                $(header).appendTo(toast);
            }

            const toastBody = `
            <div class="toast-body">
               ${settings.message}
            </div>  `;
            $(toastBody).appendTo(toast);

            toast
                .on("hide.bs.toast", settings.onHide)
                .on("hidden.bs.toast", settings.onHidden)
                .on("show.bs.toast", settings.onShow)
                .on("shown.bs.toast", settings.onShown);

            setTimeout(function () {
                toast.toast("show");
            }, settings.start);
        }

        /**
         * Initializes the application.
         * This method builds the application and sets event listeners for hiding toast messages.
         *
         * @returns {void}
         */
        function init() {
            build();
            getContainer()
                .on("show.bs.toast", ".toast", function (e) {
                    const bd = getBackdrop();
                    if (bd) {
                        bd.show();
                    }
                })
                .on("hide.bs.toast", ".toast", function (e) {
                    const bd = getBackdrop();
                    if (bd) {
                        bd.hide();
                    }
                })
                .on("hidden.bs.toast", ".toast", function (e) {
                    const el = $(e.currentTarget);
                    const wrap = el.closest(".toast-container");
                    el.remove();
                    const countToasts = wrap.find(".toast").length;
                    if (!countToasts) {
                        wrap.remove();
                    }
                });
        }

        init();
    };
})(jQuery);
