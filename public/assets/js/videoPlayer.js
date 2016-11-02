function Video(URL, startAt, stopAt) {
	this.URL = URL;
	this.startAt = startAt;
	this.stopAt = stopAt;
}

function VideoPlayer() {}

VideoPlayer.play = function(videos, onStart) {
	var videoArray = [];

	for(i in videos) {
		videoArray.push({
			videoURL: videos[i].URL,
			containment: '.video-section',
			quality: 'large',
			autoPlay: true,
			mute: true,
			opacity: 1,
			showControls: false,
			startAt: videos[i].startAt,
			stopAt: videos[i].stopAt
		});
	}

	jQuery(function() {
	    jQuery("#video-player").YTPlaylist(videoArray, false);
	    jQuery('#video-player').on("YTPStart", function(event) {
		   onStart(event);
		});
	});
}
