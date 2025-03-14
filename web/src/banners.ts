import type Handlebars from "handlebars/runtime.js";
import $ from "jquery";

import render_banner from "../templates/components/banner.hbs";

type ComponentIntent = "neutral" | "brand" | "info" | "success" | "warning" | "danger";

type ActionButton = {
    attention: "primary" | "quiet" | "borderless";
    intent?: ComponentIntent;
    label: string;
    icon?: string;
    custom_classes?: string;
};

export type Banner = {
    intent: ComponentIntent;
    label: string | Handlebars.SafeString;
    buttons: ActionButton[];
    close_button: boolean;
    custom_classes?: string;
};

export type AlertBanner = Banner & {
    process: string;
};

export function open(banner: Banner | AlertBanner, $banner_container: JQuery): void {
    const banner_html = render_banner(banner);
    $banner_container.html(banner_html);
    // TODO: Only do a resize for navbar_alerts banners, and try to
    // avoid doing that at all. Resizes have major side effects.
    $(window).trigger("resize");
}

export function append(banner: Banner | AlertBanner, $banner_container: JQuery): void {
    const $banner_html = render_banner(banner);
    $banner_container.append($banner_html);
    // TODO: Only do a resize for navbar_alerts banners, and try to
    // avoid doing that at all. Resizes have major side effects.
    $(window).trigger("resize");
}

export function close($banner: JQuery): void {
    $banner.remove();
    // TODO: Only do a resize for navbar_alerts banners, and try to
    // avoid doing that at all. Resizes have major side effects.
    $(window).trigger("resize");
}

export function fade_out_popup_banner($banner: JQuery): void {
    $banner.addClass("fade-out");
    // The delay is the same as the animation duration for fade-out.
    setTimeout(() => {
        // We don't use close, because it triggers a resize, which is disruptive.
        $banner.remove();
    }, 300);
}

export function initialize(): void {
    $("body").on("click", ".banner .banner-close-action", function (this: HTMLElement, e) {
        e.preventDefault();
        e.stopPropagation();
        const $banner = $(this).closest(".banner");
        close($banner);
    });
}
