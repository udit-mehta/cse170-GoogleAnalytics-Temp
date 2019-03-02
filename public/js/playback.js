'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var highlight_loop = '';
var highlight = '';
/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	// Credits - http://jsfiddle.net/F5NUd/11/
	var i = 0;
	var transcript_text= 'We introduce new techniques for extracting, analyzing, and visualizing textual contents from instructional videos of low production quality. Using Automatic Speech Recognition, approximate transcripts (≈75% Word Error Rate) are obtained from the originally highly compressed videos of university courses, each comprising between 10 to 30 lectures. Text material in the form of books or papers that accompany the course are then used to filter meaningful phrases from the seemingly incoherent transcripts. The resulting index into the transcripts is tied together and visualized in 3 experimental graphs that help in understanding the overall course structure and provide a tool for localizing certain topics for indexing. We specifically discuss a Transcript Index Map, which graphically lays out key phrases for a course, a Textbook Chapter to Transcript Match, and finally a Lecture Transcript Similarity graph, which clusters semantically similar lectures. We test our methods and tools on 7 full courses with 230 hours of video and 273 transcripts. We are able to extract up to 98 unique key terms for a given transcript and up to 347 unique key terms for an entire course. The accuracy of the Textbook Chapter to Transcript Match exceeds 70% on average. The methods used can be applied to genres of video in which there are recurrent thematic words (news, sports, meetings, …) Source: https://arxiv.org/ftp/cs/papers/0408/0408063.pdf';
	highlight = function()
	{
	        var inputText = $('#hTranscript');
	        var words = transcript_text.split(/[, ]+/);//match(/\w+/g);//inputText.text().match(/\w+/g);
	        if (i >= words.length) {
	            i = 0;
	        }
	        words.splice(i, 0, "<mark style='background-color: yellow;color: black; font-weight:bold'>");
	        words.splice(i + 2, 0, "</mark>");
	        inputText.html(words.slice(0,i+2).join(' '));
	        i += 1;
    }

    highlight_loop = setInterval(highlight, 250);

	function Change(e) {    
		var language = $('#languageSelect').val();
		console.log( language );

		player.setOption("captions", "track", {"languageCode": language});
		var parameters = { "speechText": transcript_text, "toLang": language };
		$.get('/translate', parameters, function(data){

                  var fontSize = $('#fontSelect').val() + "%";
                  console.log( fontSize );
       			  //$('#hTranscript').css("font-size", fontSize+"%");

                  var new_transcript = data;
                  document.getElementById('hTranscript').innerHTML = new_transcript;
                  transcript_text = new_transcript;
                  i = 0;
                  console.log(data);

                  document.getElementById('hTranscript').style.fontSize = fontSize;

        });



		var transcript = $('#transcript').prop('checked');
		if( transcript == false )
			$('#hTranscript').attr('hidden', true );
		else
			$('#hTranscript').attr('hidden', false );

		var subtitles = $('#subtitles').prop('checked');
		if( subtitles == false )
		{
			player.unloadModule("captions"); 
		}
		else
		{
			player.loadModule("captions");
		}
		
	};

	$("#Close").click(Change);

}