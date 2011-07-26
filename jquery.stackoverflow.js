(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (function($) {
    if ($ == null) {
      $ = jQuery;
    }
    return $.fn.overflow = function(opts) {
      var build_badge_info, build_user_info, create, s, user_stats;
      user_stats = {};
      s = $.extend({
        user_id: 500959,
        avatar_size: 48,
        display_avatar: true,
        display_username: true,
        display_all_badge_count: true,
        display_gold_count: true,
        display_silver_count: true,
        display_bronze_count: true,
        display_reputation: true
      }, opts);
      build_user_info = __bind(function(user) {
        if (s.display_avatar) {
          user_stats['avatar'] = '<img id="overflow_avatar" src="http://www.gravatar.com/avatar/' + user.email_hash + '?s=' + s.avatar_size + '" alt="Stack Overflow gravatar">';
        }
        if (s.display_username) {
          user_stats['user_name'] = '<span id="overflow_user_name">' + user.display_name + '</span>';
        }
        if (s.display_reputation) {
          return user_stats['reputation'] = '<span id="overflow_reputation">' + user.reputation + '</span>';
        }
      }, this);
      build_badge_info = __bind(function(badges) {
        var badge, badge_count, badge_info, count, rank, _i, _len;
        badge_info = {};
        badge_count = {
          bronze: 0,
          silver: 0,
          gold: 0
        };
        for (_i = 0, _len = badges.length; _i < _len; _i++) {
          badge = badges[_i];
          if (badge.rank === "bronze") {
            badge_count.bronze += 1;
          } else if (badge.rank === "silver") {
            badge_count.silver += 1;
          } else {
            badge_count.gold += 1;
          }
        }
        if (s.display_all_badge_count) {
          user_stats['badge_count'] = '<ul id="overflow_badge_count">';
          for (rank in badge_count) {
            count = badge_count[rank];
            if (eval("s.display_" + rank + "_count") && count > 0) {
              user_stats[rank] = '<li id="overflow_' + rank + '_count"><span id="' + rank + '"></span> ' + count + '</li>';
            }
          }
        }
        return create(user_stats);
      }, this);
      $.ajax({
        url: 'http://api.stackoverflow.com/1.1/users/' + s.user_id + '?key=zfEThydFQkK1it61Qkrbrw&jsonp=?',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
          build_user_info(data.users[0]);
        }
      });
      $.ajax({
        url: 'http://api.stackoverflow.com/1.1/users/' + s.user_id + '/badges?key=zfEThydFQkK1it61Qkrbrw&jsonp=?',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
          build_badge_info(data.badges);
        }
      });
      create = __bind(function(buildData) {
        var element, stat;
        this.append("<div id='overflow_plugin'>");
        for (stat in buildData) {
          element = buildData[stat];
          if (stat.match(/(bronze|silver|gold)/)) {
            $("#overflow_badge_count").append(element);
          } else {
            this.children("div").append(element);
          }
        }
      }, this);
    };
  })($);
}).call(this);
