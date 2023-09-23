import { HfInference } from "https://cdn.jsdelivr.net/npm/@huggingface/inference@2.6.1/+esm";

// insert huggingface token here (don't publish this to github)
const HF_ACCESS_TOKEN = "";
const inference = new HfInference(HF_ACCESS_TOKEN);

const audio = document.querySelector("#audio");

// initialize Speechrecognition for webkit bowsers, prefix
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

// grammer -> these are all commands you can say, feel free to change
const commands = ["start", "stop"];
const colorCommands = ["red", "blue", "green", "aqua"]; // Add color commands
const grammar = `#JSGF V1.0; grammar commands; public <command> = ${commands.join(
  " | "
)}; public <color> = ${colorCommands.join(" | ")};`; // Include color commands in the grammar
/*const grammar = `#JSGF V1.0; grammar commands; public <command> = ${commands.join(
  " | "
)};`;*/

document.querySelector("#loading").style.display = "none";

// just speech recognition settings, standard MDN documentation stuff
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = /*"nl-NL"*/ "en-US";
recognition.interimResults = false;

// start listinging
recognition.start();

// on result, log result
recognition.onresult = function (event) {
  // log the word
  let recognizedSpeech = event.results[event.results.length - 1][0].transcript;

  if (recognizedSpeech === "") return;

  // trim word and lowercase
  recognizedSpeech = recognizedSpeech.trim().toLowerCase();

  // update DOM
  /*document.querySelector("#commando").innerHTML = recognizedSpeech;*/
  // Check for color commands
  if (colorCommands.includes(recognizedSpeech)) {
    // Change the color of the recognized text
    document.querySelector("#commando").style.color = recognizedSpeech;
  } else {
    // Update DOM with recognized speech
    /*document.querySelector("#commando").textContent = recognizedSpeech;*/
    // Change the color back to default
    document.querySelector("#commando").style.color = "white";
  }
};
