/* global L */

'use strict';

var util = require('../util/util');

var MakiIcon = L.Icon.extend({
  options: {
    color: '#000000',
    size: 'medium',
    symbol: null
  },
  statics: {
    CSS_TEMPLATE: 'url(https://a.tiles.mapbox.com/v3/marker/pin-{{size}}{{symbol}}+{{color}}{{retina}}.png)'
  },
  initialize: function(options) {
    options = options || {};

    var size = options.size || 'medium',
      sizes = {
        large: {
          iconAnchor: [17.5, 49],
          iconSize: [35, 55],
          popupAnchor: [2, -45]
        },
        medium: {
          iconAnchor: [14, 36],
          iconSize: [28, 41],
          popupAnchor: [2, -34]
        },
        small: {
          iconAnchor: [10, 24],
          iconSize: [20, 30],
          popupAnchor: [2, -24]
        }
      };

    L.Util.extend(options, sizes[size]);
    L.Util.setOptions(this, options);
  },
  createIcon: function(oldIcon) {
    var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
      options = this.options;

    options.className = null;
    options.html = null;
    this._setIconStyles(div, 'icon');
    div.style.backgroundImage = util.handlebars(MakiIcon.CSS_TEMPLATE, {
      color: options.color.replace('#', ''),
      retina: L.Browser.retina ? '@2x' : '',
      size: options.size.slice(0, 1),
      symbol: options.symbol ? '-' + options.symbol : ''
    });
    return div;
  },
  createShadow: function() {
    return null;
  }
});

L.Marker.mergeOptions({
  icon: new MakiIcon()
});

module.exports = function(options) {
  return new MakiIcon(options);
};
