(function ($) {
  'use strict';

  function HumanMsg(el, options) {
    this.$el = $(el);
    this.options = options;

    this.effectTimer = null;
    this.init = false;

    this._generate();
  }

  HumanMsg.prototype = {
    _generate: function () {
      this.$humanMsg = $('<div class="wHumanMsg"></div>').hide();
      this.$msg = $('<span></span>');
      
      this.$hideButton = $('<div class="wHumanMsg-hideButton">x</div>')
      .click($.proxy(function (e) {
        e.stopPropagation();
        clearTimeout(this.effectTimer);
        this['_' + this.options.effect + 'EffectHide']();
      }, this));

      this.$humanMsg.append(this.$msg).append(this.$hideButton);

      $('body').append(this.$humanMsg);

      this._setOptions();

      this.init = true;
    },

    destroy: function () {
      this.$humanMsg.remove();
      $.removeData(this.$el, 'wHumanMsg');
    },

    _setOptions: function () {
      var opt, func;

      for (opt in this.options) {
        this.options[opt] = this.$el.attr('data-' + opt) || this.options[opt];
        func = 'set' + opt.charAt(0).toUpperCase() + opt.substring(1);

        if (this[func]) {
          this[func](this.options[opt]);
        }
      }
    },

    setTheme: function (theme) {
      theme = theme.split(' ');
      this.$humanMsg.attr('class', (this.$humanMsg.attr('class') || '').replace(/wHumanMsg-theme-.+\s|wHumanMsg-theme-.+$/, ''));
      
      for (var i = 0, ii = theme.length; i < ii ; i++) {
        this.$humanMsg.addClass('wHumanMsg-theme-' + theme[i]);
      }
    },

    setMsg: function (msg) {
      if (this.init === true) {
        this.$msg.html(msg.replace(/\s/g, '&nbsp;'));

        // Have to reset to get proper dimensions.
        this.$humanMsg.css({width: 'auto', left: 'auto', right: 'auto', top: 'auto', bottom: 'auto'});

        this.$humanMsg
        .width(this.$humanMsg.width())
        .height(this.$humanMsg.height());

        this.setPosition(this.options.position);

        this._runEffect(this.options.effect);
      }
    },

    setHideButton: function (hideButton) {
      this.$hideButton[hideButton ? 'show' : 'hide']();
    },

    setPosition: function (position) {
      var offset = this.options.offset,
          left = 'auto', right = 'auto', top = 'auto', bottom = 'auto',
          marginLeft = offset, marginRight = offset, marginTop = offset, marginBottom = offset;

      switch (position) {
        /* jshint ignore:start */
        case 'lt': left = 0; top = 0; break;
        case 'ct': left = 0; right = 0; marginLeft = 'auto'; marginRight = 'auto'; top = 0; break;
        case 'rt': right = 0; top = 0; break;
        case 'rm': right = 0; top = 0; bottom = 0; marginTop = 'auto'; marginBottom = 'auto'; break;
        case 'rb': right = 0; bottom = 0; break;
        case 'cb': left = 0; right = 0; marginLeft = 'auto'; marginRight = 'auto'; bottom = 0; break;
        case 'lb': left = 0; bottom = 0; break;
        case 'lm': left = 0; top = 0; bottom = 0; marginTop = 'auto'; marginBottom = 'auto'; break;
        /* jshint ignore:end */
      }

      this.$humanMsg.css({
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom
      });
    },

    setOpacity: function (opacity) {
      this.$humanMsg.css('opacity', opacity);
    },

    _runEffect: function (effect) {
      clearTimeout(this.effectTimer);
      
      this['_' + effect + 'EffectShow']();

      this.effectTimer = setTimeout($.proxy(function () {
        this['_' + effect + 'EffectHide']();
      }, this), this.options.msgDelay);
    },

    _noneEffectShow: function () {
      this.$humanMsg.show();
    },

    _noneEffectHide: function () {
      this.$humanMsg.show();
    },

    _fadeEffectShow: function () {
      this.$humanMsg.fadeIn();
    },

    _fadeEffectHide: function () {
      this.$humanMsg.fadeOut();
    }
  };

  $.fn.wHumanMsg = function (options, value) {
    function get() {
      var wHumanMsg = $.data(this, 'wHumanMsg');

      if (!wHumanMsg) {
        wHumanMsg = new HumanMsg(this, $.extend(true, {}, options));
        $.data(this, 'wHumanMsg', wHumanMsg);
      }

      return wHumanMsg;
    }

    if (typeof options === 'string') {
      var wHumanMsg,
          values = [],
          func = (value !== undefined ? 'set' : 'get') + options.charAt(0).toUpperCase() + options.substring(1),

          setOpt = function () {
            if (wHumanMsg[func]) { wHumanMsg[func].apply(wHumanMsg, [value]); }
            if (wHumanMsg.options[options]) { wHumanMsg.options[options] = value; }
          },

          getOpt = function () {
            if (wHumanMsg[func]) { return wHumanMsg[func].apply(wHumanMsg, [value]); }
            else if (wHumanMsg.options[options]) { return wHumanMsg.options[options]; }
            else { return undefined; }
          },

          runOpt = function () {
            options = $.extend({}, $.fn.wHumanMsg.defaults);
            wHumanMsg = $.proxy(get, this)();
            
            if (wHumanMsg) {
              if (wHumanMsg[options]) { wHumanMsg[options].apply(wHumanMsg, [value]); }
              else if (value !== undefined) { setOpt(); }
              else {  values.push(getOpt()); }
            }
          };

      this.each(runOpt);

      return values.length ? (values.length === 1 ? values[0] : values) : this;
    }

    options = $.extend({}, $.fn.wHumanMsg.defaults, options);

    return this.each(get);
  };

  $.fn.wHumanMsg.defaults = {
    theme: 'black',   // Theme (black, red, green, blue).
    opacity: 0.8,     // Opacity of message.
    msg: 'Awesome!',  // Set the message.
    msgDelay: 2000,   // Length of time msg will stay shown.
    hideButton: true, // Show or hide "hide button" or not.
    position: 'ct',   // Positions (lt, ct, rt, rm, rb, cb, lb, lm).
    offset: 50,       // Offset from borders (margins).
    effect: 'fade'    // Effect for msg (none, fade)
  };
})(jQuery);