$(document).ready(function () {
  var userFullName = 'Joseph Schmo';
  var userUsername = '@joeschmo';
  var userAvatar = './img/alagoon.jpg';

  var newTweet = function (text) {

    $('.new').addClass('.tweet');
    $('div').removeClass('.new');

    var timeStamp = new Date();
    timeStamp = timeStamp.toISOString();
    $('#stream').prepend(
      '<div class="tweet">' +
        '<div class="content">' +
          '<img class="avatar" src="' + userAvatar + '"/>' +
            '<strong class="fullname">' + userFullName + '</strong>' +
              '<span class="username">' + userUsername + '</span>' +
                '<p class="tweet-text">' + text + '</p>' +
                '<div class="tweet-actions">' +
                  '<ul>' +
                    '<li><span class="icon action-reply"></span> Reply</li>' +
                    '<li><span class="icon action-retweet"></span> Retweet</li>' +
                    '<li><span class="icon action-favorite"></span> Favorite</li>' +
                    '<li><span class="icon action-more"></span> More</li>' +
                  '</ul>' +
                '</div>' +
                '<div class="stats">' +
                  '<div class="retweets">' +
                    '<p class="num-retweets">30</p>' +
                     '<p>RETWEETS</p>' +
                   '</div>' +
                   '<div class="favorites">' +
                    '<p class="num-favorites">6</p>' +
                    '<p>FAVORITES</p>' +
                  '</div>' +
                  '<div class="users-interact">' +
                    '<div>' +
                      '<img src="img/damenleeturks.jpg" />' +
                      '<img src="img/vklimenko.jpg" />' +
                    '</div>' +
                  '</div>' +
                  '<div>' +
                  '<time class="timeago" datetime="' + timeStamp + '"></time>' +
                  '</div>' +
                '</div>' +
                '<div class="reply">' +
                  '<img class="avatar" src="' + userAvatar + '" />' +
                  '<textarea class="tweet-compose" placeholder="Reply to ' + userUsername + '"/></textarea>' +
                '</div>' +
              '</div>' +
            '</div>');

            // //COPIED THE EVENT HANDLERS
            // $('#tweet-submit').on('click', function () {
            //     var tweetText = $('.tweet-compose').val();
            //     $('.tweet-compose').val('');
            //     newTweet(tweetText);
            //     $('#tweet-controls').css('visibility', 'hidden');
            //     $('.tweet-compose').animate({height:'2.5em'}, 'fast');
            // });
            //
            //
            // $('.new').hover(function () {
            //   $(this).find('.tweet-actions').css('visibility','visible');
            // }, function () {
            //   $(this).find('.tweet-actions').css('visibility','hidden');
            // });
            //
            // $('.new').on('click', function () {
            //   $(this).find('.stats').slideDown('fast');
            // });

    };

//COMPOSE HANDLERS
  $('.tweet-compose').focus(function () {
    var tlength = $(this).val().length;
    if (tlength < 1) {
      $('#tweet-submit').prop('disabled', true).css('opacity', '.75');
    }
    $('#tweet-controls').css('visibility', 'visible');
    $(this).animate({height:'6em'}, 'fast');
  });
  $('.tweet-compose').blur(function () {
    if ($('.tweet-compose').val().length < 1) {
      $('#tweet-controls').css('visibility', 'hidden');
      $(this).animate({height:'2.5em'}, 'fast');
    }
  });

  $('.tweet-compose').keyup(function (e) {
    var wKey = e.which;
    var tlength = $(this).val().length;
    $(this).val($(this).val().substring(0, 140));
    $('#char-count').text(140 - tlength);
    if(tlength > 0) {
      $('#tweet-submit').prop('disabled', false).css('opacity', '1');
    }
    if(tlength < 1) {
      $('#tweet-submit').prop('disabled', true).css('opacity', '.75');
    }
    if ((140 - tlength) <= 10) {
      $('#char-count').css('color', 'red');
    }
    if ((140 - tlength) > 10) {
      $('#char-count').css('color', '#999');
    }
    if (wKey===13) e.preventDefault();
    if (wKey===13) {
      var tweetText = $('.tweet-compose').val();
      $('.tweet-compose').val('');
      newTweet(tweetText);
      $('#tweet-controls').css('visibility', 'hidden');
      $('.tweet-compose').animate({height:'2.5em'}, 'fast');
    }
  });


//SUBMIT HANDLER
  $('#tweet-submit').on('click', function () {
      var tweetText = $('.tweet-compose').val();
      $('.tweet-compose').val('');
      newTweet(tweetText);
      $('#tweet-controls').css('visibility', 'hidden');
      $('.tweet-compose').animate({height:'2.5em'}, 'fast');
  });

//TWEET HOVER + CLICK
  // $('.tweet, .new').hover(function () {
  //   $(this).find('.tweet-actions').css('visibility','visible');
  // }, function () {
  //   $(this).find('.tweet-actions').css('visibility','hidden');
  // });
  //
  // $('.tweet, .new').on('click', function () {
  //   $(this).find('.stats').slideDown();
  // });
  // $('.tweet, .new').on('mouseleave', function () {
  //   $(this).find('.stats').slideUp();
  // });

  var isClicked = false;
var replyClicked = false;

$(document).on('focusin', '.reply', function(){
  replyClicked = true;
});
$(document).on('focusout', '.reply', function(){
  replyClicked = false;
});

$(document).on('click', '.tweet', function(){
  if (replyClicked){
    $(this).find('.stats').show();
    $(this).find('.tweet-actions').show();
  }
  else if (!replyClicked){
  $(this).find('.stats').slideToggle('fast');
  $(this).find('.tweet-actions').show();
//   isClicked = true;
}
// //   isClicked = false;
});

//TWEET ACTIONS ON HOVER
// if (!isClicked){
$(document).on('mouseenter', '.tweet',function(){
  $(this).find('.tweet-actions').css({"visibility": "visible"});
});
$(document).on('mouseleave', '.tweet',function(){
  $(this).find('.tweet-actions').css({"visibility": "hidden"});
});
});
