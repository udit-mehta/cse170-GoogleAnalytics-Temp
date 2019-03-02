'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

function initializePage() {
  console.log("Javascript connected!");


var currentLanguage = "en";
if (annyang) {
          // Let's define a command.
          var commands = {
            'Hello': function() { alert('Hello world!'); }
          };
        
          annyang.addCallback('result', function(userSaid, commandText, phrases) {
            console.log( userSaid );
            console.log( currentLanguage );
            var userSpeech = userSaid.toString().split(',')[0];
            var parameters = { "speechText": userSpeech, "toLang": currentLanguage }
            $.get('/translate', parameters, function(data){
                  document.getElementById('subtitles').innerHTML = data;
                  var new_transcript = document.getElementById('transcript').innerHTML + " " + data;
                  document.getElementById('transcript').innerHTML = new_transcript;
                  console.log(data);
            });
        	});
          // Add our commands to annyang
          annyang.addCommands(commands);
        
          // Start listening.
          annyang.start();
}

function Change(e) {    
    var language = $('#languageSelect').val();
    currentLanguage = language;
    console.log( currentLanguage );

    console.log( document.getElementById('transcript').textContent );
    var parameters = { "speechText": document.getElementById('transcript').textContent, "toLang": currentLanguage }
    $.get('/translate', parameters, function(data){
                  var new_transcript = data;
                  document.getElementById('transcript').innerHTML = new_transcript;
                  console.log(data);
            });
    /*
    if( language == 'nl' )
    {
        console.log("Language change");
        $('#iframe').attr( "src", "https://www.youtube.com/embed/k6U-i4gXkLM?controls=0&amp;start=1922&amp;autoplay=1&amp;cc_load_policy=1&amp;&cc_lang_pref=ko" );
        console.log("Transcript change");
        $('#hTranscript').html('0. 국민 은 법률 로 인한 배상 은 특별 한 영장 을 청구 할 수 있 어서 최고 득표자 가 제출 한 유일 한 때 에 의하 여 는 경우 를 선거 관리 할 수 없 을 포함 한 사항 은 청구 할 수 있 다국민 투표 의 범죄 에 의하 여 발언 하 지 아니한 회의 는 요건 은 1988 년 으로 대통령 이 의결 한다국민 경제 자문 기구 를 타파 하 기 위하 여 긴급 한 형태 로 정한다국민 은 이 정하 는 헌법 시행 당시 의 심사 할 수 있 다국민 의 기본 질서 를 진다0. 국민 은 법률 로 인한 배상 은 특별 한 영장 을 청구 할 수 있 어서 최고 득표자 가 제출 한 유일 한 때 에 의하 여 는 경우 를 선거 관리 할 수 없 을 포함 한 사항 은 청구 할 수 있 다국민 투표 의 범죄 에 의하 여 발언 하 지 아니한 회의 는 요건 은 1988 년 으로 대통령 이 의결 한다국민 경제 자문 기구 를 타파 하 기 위하 여 긴급 한 형태 로 정한다국민 은 이 정하 는 헌법 시행 당시 의 심사 할 수 있 다국민 의 기본 질서 를 진다0. 국민 은 법률 로 인한 배상 은 특별 한 영장 을 청구 할 수 있 어서 최고 득표자 가 제출 한 유일 한 때 에 의하 여 는 경우 를 선거 관리 할 수 없 을 포함 한 사항 은 청구 할 수 있 다국민 투표 의 범죄 에 의하 여 발언 하 지 아니한 회의 는 요건 은 1988 년 으로 대통령 이 의결 한다국민 경제 자문 기구 를 타파 하 기 위하 여 긴급 한 형태 로 정한다국민 은 이 정하 는 헌법 시행 당시 의 심사 할 수 있 다국민 의 기본 질서 를 진다0. 국민 은 법률 로 인한 배상 은 특별 한 영장 을 청구 할 수 있 어서 최고 득표자 가 제출 한 유일 한 때 에 의하 여 는 경우 를 선거 관리 할 수 없 을 포함 한 사항 은 청구 할 수 있 다국민 투표 의 범죄 에 의하 여 발언 하 지 아니한 회의 는 요건 은 1988 년 으로 대통령 이 의결 한다국민 경제 자문 기구 를 타파 하 기 위하 여 긴급 한 형태 로 정한다국민 은 이 정하 는 헌법 시행 당시 의 심사 할 수 있 다국민 의 기본 질서 를 진다');
    }

    var transcript = $('#transcript').prop('checked');
    if( transcript == false )
      $('#hTranscript').attr('hidden', true );
    else
      $('#hTranscript').attr('hidden', false );

    var subtitle = $('#subtitles').prop('checked');
    if( subtitle == false )
      $('#iframe').attr( "src", "https://www.youtube.com/embed/k6U-i4gXkLM?controls=0&start=1922&autoplay=1" );
    console.log( transcript );
    console.log( subtitle );
    console.log( $('#iframe').attr( "src") );
    */
  };

  $("#Close").click(Change);



}