(function( factory ) {
	if (typeof(require) === 'function') {
		module.exports = factory(jQuery);
	} else {
		factory(jQuery);
	}
})(function( $ ) {
	$.fn.selectmenu = function(options) {
		var _this = $(this),
			_params = {
				mode: 'default',
				latency: 380,
				textColor: '#4f4f4f',
				lits: []
			},
			_target = $('.select-menu').length ? $('.select-menu') : $('<ul class="select-menu"></ul>'),
			modes = {
				default: {
					show: function() {
								_target.show();
							},
					hide: function() {
								_target.hide();
							}
				},
				fade: {
					show: function(latency) {
								_target.fadeIn(latency)
							},
					hide: function(latency) {
								_target.fadeOut(latency)
							}
				}
			},
		_menuStyle = {
			display: 'none',
			position: 'absolute',
			top: _this.offset().top + _this.height() + 8,
			backgroundColor: '#fff',
			borderRadius: 4,
			boxShadow: '0 0 3px 3px rgba(20%,20%,40%,0.4)',
			minWidth: 100,
			listStyleType: 'none',
			padding: 10,
			zIndex: 100010 
		},
		_textColor = _params.textColor,
		_cover = $('<div class="cover"></div>'),
		init = function() {
			$.extend(_params, options);
			_cover.css({opacity: 0, zIndex: 100000, 
					    width: $(document).width(), 
					    height: $(document).height(),
						position: 'absolute',
						top: $('body').offset().top,
						left: $('body').offset().left,
						display: 'none'});
			_this.css({cursor: 'pointer', zIndex: 100010});
			list = _params.list;
			if (list && list.length) {
				for (var k in list) {
					var item = $('<li class="menu-item"></li>');
					item.css({padding: 4, color: _params.textColor})
						.append(list[k]);
					item.find('a').css({color: _params.textColor});
					_target.append(item);
				}
			}
			_target.insertAfter(_this);
			$('body').append(_cover);

		}
		init();
		_this.on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			_target.css(_menuStyle);
			modes[_params.mode].show(_params.latency);
			var targetWidth = _target.width() + (_menuStyle.padding * 2);
			
			if (_this.offset().left + targetWidth >= $('body').width()) {
				_target.css('left', $('body').width() - targetWidth - 10);
			} else {
				_target.css('left', _this.offset().left);
			}
			_cover.show();
			_cover.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				modes[_params.mode].hide(_params.latency);
				_cover.hide();
			});
		});
	};
});