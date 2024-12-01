let countdownTime = 86400; // 24 hours in seconds
let countdownInterval;

// Function to simulate "repair" progress
function startRepairProgress() {
  let progress = 0;
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");

  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      transitionToRansomwareScreen();
    }
    progressFill.style.width = progress + "%";
    progressText.textContent = progress + "%";
  }, 500);
}

// Function to transition to the ransomware screen
function transitionToRansomwareScreen() {
  document.getElementById("repair-screen").style.display = "none";
  document.getElementById("ransomware-screen").style.display = "flex";
  startCountdown();
  startFileList();
}

// Countdown Timer Function
function startCountdown() {
  countdownInterval = setInterval(() => {
    countdownTime--;
    const hours = String(Math.floor(countdownTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((countdownTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(countdownTime % 60).padStart(2, '0');
    document.getElementById("countdown").textContent = `${hours}:${minutes}:${seconds}`;

    if (countdownTime <= 600) {
      clearInterval(countdownInterval);
      countdownInterval = setInterval(startCountdown, 500); // Speed up in last 10 minutes
    }

    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").textContent = "00:00:00";
    }
  }, 1000);
}

// Function to verify the unlock code
function verifyCode() {
  const enteredCode = document.getElementById("unlock-code").value;
  const correctCode = "0xENCRYPT-123";
  
  if (enteredCode === correctCode) {
    clearInterval(countdownInterval);
    document.getElementById("ransomware-screen").style.display = "none";
  } else {
    document.getElementById("feedback").textContent = "Incorrect code. Try again!";
  }
}

// Start a scrolling file list
function startFileList() {
  const fileNames = [
    "C:/Users/Documents/Important.docx",
    "C:/Photos/Vacation/photo1.jpg",
    "C:/Music/Favorites/song.mp3",
    "C:/Downloads/Secret.pdf",
    "C:/Users/Files/Project.zip",
    "C:/System32/Config.sys",
    "C:/Users/Private/Passwords.txt",
    "C:/Backups/WorkFiles.docx"
  ];

  const fileList = document.getElementById("file-names");
  let index = 0;
  
  setInterval(() => {
    if (index < fileNames.length) {
      const fileItem = document.createElement("li");
      fileItem.textContent = `Encrypting ${fileNames[index]}...`;
      fileItem.classList.add("scanning-item");
      fileList.appendChild(fileItem);
      index++;
    }
  }, 1000); // Change this duration for faster/slower file listing
}

// Start the repair progress on page load
window.onload = startRepairProgress;