// Passwords and hints for each level
const levels = [
  { password: "dragon", hint: "It's a beast that breathes fire." },
  { password: "phoenix", hint: "A bird that rises from ashes." },
  { password: "sorcery", hint: "The art of casting spells." },
  { password: "alchemy", hint: "The ancient science of turning lead into gold." },
  { password: "eternity", hint: "Something that lasts forever." },
];

let currentLevel = 0;
let attempts = 0;

// Update level display and hint
function updateLevel() {
  document.getElementById("levelDisplay").innerText = `Level ${currentLevel + 1}`;
  document.getElementById("hintText").innerText = levels[currentLevel].hint;
  document.getElementById("passwordInput").value = ""; // clear input
  attempts = 0; // reset attempts for new level
}

// AI-style hint generator
function generateHint(input) {
  const correctPassword = levels[currentLevel].password;
  if (input.length === 0) {
    return "🧙‍♂️ Silence is not the key... try a guess.";
  } else if (input.length < correctPassword.length) {
    return "You're close, but the word feels... shorter.";
  } else if (input.length > correctPassword.length) {
    return "Something tells me the spell is a bit... too long.";
  } else if (input.toLowerCase() === correctPassword.slice(0, input.length)) {
    return "You're on the right track, just keep going.";
  } else {
    return "❌ The magic doesn't resonate... try again.";
  }
}

// Check if the entered password matches
function checkPassword() {
  const passwordInput = document.getElementById("passwordInput").value.toLowerCase();
  const secretMessage = document.getElementById("secretMessage");

  if (passwordInput === levels[currentLevel].password) {
    currentLevel++;
    if (currentLevel < levels.length) {
      // Correct password, proceed to next level
      secretMessage.innerText = `✨ Magic Unlocked! Level ${currentLevel + 1} awaits... ✨`;
      secretMessage.classList.remove("hidden");
      setTimeout(() => {
        secretMessage.classList.add("hidden");
        updateLevel();
      }, 2000);
    } else {
      // Game completed
      secretMessage.innerText = "🔥 Congratulations, Master of the Arcane! 🔥";
      secretMessage.classList.remove("hidden");
      document.getElementById("revealButton").disabled = true;
    }
  } else {
    // Incorrect guess - provide AI-style hint
    attempts++;
    document.getElementById("hintText").innerText = generateHint(passwordInput);
    if (attempts >= 3) {
      document.getElementById("hintText").innerText = "Need help? Think about something ancient and powerful.";
    }
  }
}

// Initialize game with the first level's hint and password
updateLevel();

// Background music controls
const bgMusic = document.getElementById("bgMusic");

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}

function adjustVolume(change) {
  bgMusic.volume = Math.min(1, Math.max(0, bgMusic.volume + change));
}
