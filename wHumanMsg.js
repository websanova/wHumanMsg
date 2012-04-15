/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This websanova humanized message jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @docs            http://www.websanova.com/plugins/websanova/humanmsg
 * @version         Version x.x
 *
 ******************************************/

(function($)
{
	$.fn.wHumanMsg = function(option, settings)
	{	
		if(typeof option === 'object')
		{
			settings = option;
		}
		else if(typeof option === 'string')
		{
			var data = this.data('_wHumanMsg');

			if(data)
			{
				if(option == 'reset') data.reset();
				else if($.fn.wHumanMsg.defaultSettings[option] !== undefined)
				{
					if(settings !== undefined)
					{
						if(option == 'offsetTop'){ data.hm.css('top', settings); return true; }
						else{ data.settings[option] = settings; return true; }
					}
					else return data.settings[option];
				}
				else//NOTE: message cannot be one of the settings options, color, fadeIn, fadeOut, displayLength
				{
					data.showMessage(option, settings);
					return true;
				}
			}
			else return false;
		}

		settings = $.extend({}, $.fn.wHumanMsg.defaultSettings, settings || {});

		return this.each(function()
		{
			var $elem = $(this);

			var $settings = jQuery.extend(true, {}, settings);

			var hm = new HumanMsg($settings);

			$elem.append(hm.generate());

			$elem.data('_wHumanMsg', hm);
		});
	}

	$.fn.wHumanMsg.defaultSettings = {
		color			: 'black',
		opacity			: 0.8,
		fadeIn  		: 1000,
		fadeOut 		: 1000,
		displayLength	: 5000,
		html			: true,
		fixed			: true,
		offsetTop		: 0
	};

	function HumanMsg(settings)
	{
		this.hm = null;
		this.settings = settings;

		this.msgObj = null;
		this.colorObj

		this.timer = null;

		return this;
	}

	HumanMsg.prototype = 
	{
		generate: function()
		{
			var $this = this;

			if($this.hm) return $this.hm;

			$this.bgObj = $('<div class="_wHumanMsg_bg"></div>').css('opacity', $this.settings.opacity);
			$this.msgObj = $('<div class="_wHumanMsg_msg">Message</div>');
			$this.colorObj = $('<div class="_wHumanMsg_outer _wHumanMsg_color_black">');

			$this.hm = 
			$('<div class="_wHumanMsg_holder">')
			.css({top: $this.settings.offsetTop})
			.append(
				$this.colorObj
				.append( $this.bgObj )
				.append( $this.msgObj )
			);
			
			if($this.settings.fixed) $this.hm.css('position', 'fixed');
			

			return $this.hm;
		},
		
		updateColor: function(color)
		{
			this.colorObj.attr('class', this.colorObj.attr('class').replace(/_wHumanMsg_color_[a-zA-Z0-9_]*/g, '')).addClass('_wHumanMsg_color_' + color);
		},
		
		showMessage: function(msg, settings)
		{
			var $this = this;
			var settings = settings || {};
			
			var color = settings.color || $this.settings.color;
			var opacity = settings.opacity || $this.settings.opacity;
			var fadeIn = settings.fadeIn || $this.settings.fadeIn;
			var fadeOut = settings.fadeOut || $this.settings.fadeOut;
			var displayLength = settings.displayLength || $this.settings.displayLength;
			var html = typeof settings.html === 'boolean' ? settings.html : $this.settings.html;
			
			clearTimeout($this.timer);
			
			//always fade out old message first
			$this.hm.fadeOut(fadeOut, function(){
				
				//updte color and message
				$this.updateColor(color);
				$this.bgObj.css('opacity', opacity);
				html ? $this.msgObj.html(msg) : $this.msgObj.text(msg);
				
				//fade the new message back in with the timer
				$this.hm.fadeIn(fadeIn, function()
				{
					$this.timer = setTimeout(function(){ $this.hm.fadeOut(fadeOut); }, displayLength);
				});
			});
		},
		
		reset: function()
		{
			this.settings = $.fn.wHumanMsg.defaultSettings;
		}
	}
})(jQuery);