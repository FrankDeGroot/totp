'use strict';

import * as db from './db.js';
import * as qr from './qr.js';
import * as totp from './totp.js';

db.initEntries();

qr.onAddQR(function (entry) {
    db.addEntry(entry);
    m.redraw();
});

var All = {
    view: function () {
        return [
            m('input', {
                type: 'file',
                onchange: function () {
                    return qr.addQR(this.files);
                },
                id: 'file',
                style: 'display:none'
            }),
            m(polythene.Button, {
                label: 'add',
                events: {
                    onclick: function() {
                        document.getElementById('file').click();
                    }
                }
            }),
            m(polythene.Button, {
                label: 'clear',
                events: {
                    onclick: db.clearEntries
                }
            }),
            m(polythene.List, {
                header: 'TOTPs',
                border: true,
                tiles: listEntries()
            })
        ]
    }
};

var One = {
    view: function (vnode) {
        var entry = db.getEntries()[vnode.attrs.name]
        return m(polythene.Card, {
            content: [
                {
                    header: {
                        title: entry.name,
                        subtitle: entry.user
                    }
                },
                {
                    header: {
                        title: totp.getTotp(entry.secret)
                    }
                }
            ]
        })
    }
}

m.route(document.getElementById("app"), '/', {
    '/': All,
    '/:name': One
});

function listEntries() {
    var entriesHtml = [];
    var entries = db.getEntries();
    for(var name in entries) {
        var entry = entries[name];
        entriesHtml.push(m(polythene.ListTile, {
            title: entry.name,
            subtitle: entry.user,
            url: {
                href: '/' + encodeURI(entry.name),
                oncreate: m.route.link
            }
        }))
    }
    return entriesHtml;
}
