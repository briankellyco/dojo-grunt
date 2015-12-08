/*
 Load CSS module in Dojo
 */
define([
    'dojo/on',
    'dojo/_base/window',
    'dojo/dom-construct',
    'dojo/Deferred'
], function (
    on,
    win,
    domConstruct,
    Deferred
) {
    'use strict';

    function loadCss (url) {
        var deferred = new Deferred();

        var link = domConstruct.create('link', {
            rel: 'stylesheet',
            type: 'text/css',
            href: url
        }, win.body());

        on(link, 'load', function () {
            deferred.resolve();
        });

        return deferred.promise;
    }

    return loadCss;
});