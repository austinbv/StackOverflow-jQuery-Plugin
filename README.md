# A simple plugin to display your stackoverflow account info #

## basic usage ##
    $("#id").overflow("{
      user_id: YOUR_UID
    }");

## Advanced usage ##
    // Well really not that advanced
    $("#id").overflow({
      user_id: YOUR_UID,
      avatar_size: 48
      // And anyother options
    })

## Current Options ##
    user_id                         #[int] Your user id for stack overflow
    avatar_size                     #[int] Size in pixles for your gravatar display
    display_avatar                  #[boolean] Display Avatar?
    display_username                #[boolean] Display username?
    display_all_badge_count         #[boolean] Display all badge counts?
    display_gold_count              #[boolean] Display gold badge count?
    display_silver_count            #[boolean] Display silver badge count?
    display_bronze_count            #[boolean] Display bronze badge count?
    display_reputation              #[boolean] Display your reputation?

more to come