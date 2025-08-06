// Grab references to the relevant DOM elements
const video = document.getElementById('video');         // The video element itself
const play = document.getElementById('play');           // Play/pause button
const stop = document.getElementById('stop');           // Stop button
const progress = document.getElementById('progress');   // Range input (slider for progress)
const timestamp = document.getElementById('timestamp'); // Span to show current video time

// ---------------------------------------------
// Function: Toggle play/pause state of the video
// ---------------------------------------------
function toggleVideoStatus() {
  if (video.paused) {
    video.play();   // If paused, play the video
  } else {
    video.pause();  // If playing, pause it
  }
}

// ---------------------------------------------
// Function: Update the play button icon
// This keeps the icon in sync with the video's state
// ---------------------------------------------
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'; // Show play icon
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'; // Show pause icon
  }
}

// ---------------------------------------------
// Function: Update the slider progress and timestamp display
// Called continuously as the video plays
// ---------------------------------------------
function updateProgress() {
  // Set progress bar value based on current playback time
  progress.value = (video.currentTime / video.duration) * 100;

  // Format time into MM:SS
  let mins = Math.floor(video.currentTime / 60); // Get full minutes
  if (mins < 10) {
    mins = '0' + String(mins); // Pad with leading zero
  }

  let secs = Math.floor(video.currentTime % 60); // Get remaining seconds
  if (secs < 10) {
    secs = '0' + String(secs); // Pad with leading zero
  }

  // Update the timestamp element
  timestamp.innerHTML = `${mins}:${secs}`;
}

// ---------------------------------------------
// Function: Scrub the video when the progress bar is changed
// ---------------------------------------------
function setVideoProgress() {
  // Convert progress value (0–100) back to seconds
  video.currentTime = (+progress.value * video.duration) / 100;
}

// ---------------------------------------------
// Function: Stop the video and reset to beginning
// ---------------------------------------------
function stopVideo() {
  video.currentTime = 0; // Go to start
  video.pause();         // Pause the playback
}

// ---------------------------------------------
// Set up all event listeners to wire up interactivity
// ---------------------------------------------

// Toggle video play/pause when video element is clicked
video.addEventListener('click', toggleVideoStatus);

// Update play button icon when video is paused or played
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);

// Update progress bar and timestamp as the video plays
video.addEventListener('timeupdate', updateProgress);

// Toggle play/pause when play button is clicked
play.addEventListener('click', toggleVideoStatus);

// Stop the video when stop button is clicked
stop.addEventListener('click', stopVideo);

// Allow seeking through the video by dragging slider
progress.addEventListener('change', setVideoProgress);