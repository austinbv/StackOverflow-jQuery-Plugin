do ($ = jQuery) ->
  $.fn.overflow = (opts) ->
    user_stats = {}
    s = $.extend
      user_id: 500959                       #[int] Your user id for stack overflow
      avatar_size: 48                       #[int] Size in pixles for your gravatar display
      display_avatar: true                  #[boolean] Display Avatar?
      display_username: true                #[boolean] Display username?
      display_all_badge_count: true         #[boolean] Display all badge counts?
      display_gold_count: true              #[boolean] Display gold badge count?
      display_silver_count: true            #[boolean] Display silver badge count?
      display_bronze_count: true           #[boolean] Display bronze badge count?
      display_reputation: true              #[boolean] Display your reputation?
      ,opts

    build_user_info = (user) =>
      if s.display_avatar
        user_stats['avatar'] = '<img id="overflow_avatar" src="http://www.gravatar.com/avatar/'+user.email_hash+'?s='+s.avatar_size+'" alt="Stack Overflow gravatar">'
      if s.display_username
        user_stats['user_name'] = '<span id="overflow_user_name">'+user.display_name+'</span>'
      if s.display_reputation
        user_stats['reputation'] = '<span id="overflow_reputation">'+user.reputation+'</span>'

    build_badge_info = (badges) =>
      badge_info = {}
      badge_count =
        bronze: 0
        silver: 0
        gold: 0

      for badge in badges
        if badge.rank == "bronze"
          badge_count.bronze += 1
        else if badge.rank == "silver"
          badge_count.silver += 1
        else
          badge_count.gold += 1

      if s.display_all_badge_count
        user_stats['badge_count'] = '<ul id="overflow_badge_count">'
        for rank, count of badge_count
          if eval("s.display_"+rank+"_count") && count > 0
            user_stats[rank] = '<li id="overflow_'+rank+'_count"><span id="'+rank+'"></span> '+count+'</li>'

      create(user_stats)

    $.ajax({
      url: 'http://api.stackoverflow.com/1.1/users/'+s.user_id+'?key=zfEThydFQkK1it61Qkrbrw&jsonp=?'
      dataType: 'jsonp'
      crossDomain: true
      success: (data) -> build_user_info(data.users[0]); return
    })

    $.ajax({
      url: 'http://api.stackoverflow.com/1.1/users/'+s.user_id+'/badges?key=zfEThydFQkK1it61Qkrbrw&jsonp=?'
      dataType: 'jsonp'
      crossDomain: true
      success: (data) -> build_badge_info(data.badges); return
    })

    create = (buildData) =>
      @.append "<div id='overflow_plugin'>"
      for stat, element of buildData
        if stat.match(/(bronze|silver|gold)/)
          $("#overflow_badge_count").append element
        else
          @.children("div").append element
      return
    return