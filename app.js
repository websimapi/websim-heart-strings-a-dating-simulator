// Main application logic for Heart Strings Dating Simulator

// Global state
let state = {
    currentCharacter: null,
    currentLocation: null,
    ttsEnabled: true,
    textSpeed: 5,
    volume: 0.7,
    synth: window.speechSynthesis,
    currentVoice: null,
    characterVoices: {}
};

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading (could be used for actual asset loading)
    simulateLoading();
    // Initialize state from localStorage if available
    loadGameState();
    // Setup event listeners
    setupEventListeners();
    // Initialize TTS
    initializeTTS();
});

// Simulate loading process
function simulateLoading() {
    const progressBar = document.querySelector('.loading-progress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            
            // Initialize the character selection screen
            populateCharacterSelection();
        }
    }, 100);
}

// Load saved game state from localStorage
function loadGameState() {
    const savedState = localStorage.getItem('heartStringsState');
    
    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            
            // Merge saved state with default state
            state = { ...state, ...parsedState };
            
            // Load character memories
            characters.forEach(char => {
                const savedMemories = localStorage.getItem(`memories_${char.id}`);
                if (savedMemories) {
                    char.memories = JSON.parse(savedMemories);
                }
                
                const savedRelationship = localStorage.getItem(`relationship_${char.id}`);
                if (savedRelationship) {
                    char.relationshipLevel = parseInt(savedRelationship, 10);
                }
            });
            
            // Update UI based on loaded state
            updateSettingsUI();
        } catch (error) {
            console.error('Error loading saved game state:', error);
            // If there's an error, use default state
        }
    }
}

// Save current game state to localStorage
function saveGameState() {
    // Save general settings
    const stateToSave = {
        ttsEnabled: state.ttsEnabled,
        textSpeed: state.textSpeed,
        volume: state.volume
    };
    
    localStorage.setItem('heartStringsState', JSON.stringify(stateToSave));
    
    // Save character-specific data
    if (state.currentCharacter) {
        localStorage.setItem(`memories_${state.currentCharacter.id}`, 
            JSON.stringify(state.currentCharacter.memories));
        
        localStorage.setItem(`relationship_${state.currentCharacter.id}`, 
            state.currentCharacter.relationshipLevel.toString());
    }
}

// Setup event listeners for UI interactions
function setupEventListeners() {
    // TTS toggle
    document.getElementById('tts-toggle').addEventListener('click', toggleTTS);
    
    // Settings button
    document.getElementById('settings-btn').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'block';
    });
    
    // Close modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'none';
    });
    
    // Settings controls
    document.getElementById('text-speed').addEventListener('input', (e) => {
        state.textSpeed = parseInt(e.target.value, 10);
        saveGameState();
    });
    
    document.getElementById('volume').addEventListener('input', (e) => {
        state.volume = parseFloat(e.target.value);
        saveGameState();
    });
    
    // Reset progress button
    document.getElementById('reset-progress').addEventListener('click', resetGameProgress);
    
    // Change location button
    document.getElementById('change-location-btn').addEventListener('click', showLocationSelection);
    
    // Back to date button
    document.getElementById('back-to-date-btn').addEventListener('click', () => {
        document.getElementById('location-selection').style.display = 'none';
        document.getElementById('date-screen').style.display = 'block';
    });
    
    // End date button
    document.getElementById('end-date-btn').addEventListener('click', endCurrentDate);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('settings-modal')) {
            document.getElementById('settings-modal').style.display = 'none';
        }
    });
}

// Update UI elements based on current settings
function updateSettingsUI() {
    // Update TTS button
    const ttsButton = document.getElementById('tts-toggle');
    ttsButton.textContent = state.ttsEnabled ? 'TTS: ON' : 'TTS: OFF';
    ttsButton.classList.toggle('active', state.ttsEnabled);
    
    // Update sliders
    document.getElementById('text-speed').value = state.textSpeed;
    document.getElementById('volume').value = state.volume;
}

// Toggle text-to-speech functionality
function toggleTTS() {
    state.ttsEnabled = !state.ttsEnabled;
    updateSettingsUI();
    saveGameState();
}

// Initialize Text-to-Speech
function initializeTTS() {
    if ('speechSynthesis' in window) {
        // Wait for voices to be loaded
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            
            // Categorize voices by gender
            const femaleVoices = voices.filter(voice => 
                voice.name.includes('female') || 
                voice.name.includes('woman') || 
                voice.name.includes('girl') ||
                voice.name.toLowerCase().includes('zira') ||
                voice.name.toLowerCase().includes('samantha') ||
                voice.name.toLowerCase().includes('victoria'));
                
            const maleVoices = voices.filter(voice => 
                voice.name.includes('male') || 
                voice.name.includes('man') || 
                voice.name.includes('boy') ||
                voice.name.toLowerCase().includes('david') ||
                voice.name.toLowerCase().includes('mark') ||
                voice.name.toLowerCase().includes('george'));
            
            // Assign voices to characters based on gender
            characters.forEach(character => {
                if (character.gender === 'female' && femaleVoices.length > 0) {
                    // Deterministic selection based on character id to ensure consistency
                    const voiceIndex = character.id % femaleVoices.length;
                    state.characterVoices[character.id] = femaleVoices[voiceIndex];
                    character.voice = femaleVoices[voiceIndex];
                } else if (character.gender === 'male' && maleVoices.length > 0) {
                    const voiceIndex = character.id % maleVoices.length;
                    state.characterVoices[character.id] = maleVoices[voiceIndex];
                    character.voice = maleVoices[voiceIndex];
                } else {
                    // Fallback to any available voice
                    const voiceIndex = character.id % voices.length;
                    state.characterVoices[character.id] = voices[voiceIndex];
                    character.voice = voices[voiceIndex];
                }
            });
        };
    } else {
        console.log('Text-to-speech not supported in this browser');
        state.ttsEnabled = false;
        updateSettingsUI();
    }
}

// Speak text using the appropriate voice
function speakText(text, character) {
    if (!state.ttsEnabled || !state.synth) return;
    
    // Cancel any ongoing speech
    state.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on character
    if (character && character.voice) {
        utterance.voice = character.voice;
    }
    
    // Apply volume setting
    utterance.volume = state.volume;
    
    // Use a moderate rate and pitch
    utterance.rate = 0.9 + (state.textSpeed * 0.05);
    utterance.pitch = character && character.gender === 'female' ? 1.1 : 0.9;
    
    state.synth.speak(utterance);
}

// Populate the character selection screen
function populateCharacterSelection() {
    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = '';
    
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        characterCard.dataset.id = character.id;
        
        // Generate or load character image
        const img = document.createElement('img');
        img.alt = character.name;
        img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="150" height="150" fill="#f0f0f0"/><text x="75" y="75" font-family="Arial" font-size="12" text-anchor="middle" dominant-baseline="middle">Loading ${character.name}...</text></svg>`);
        
        // Generate character image
        generateCharacterImage(character, img);
        
        const name = document.createElement('h3');
        name.textContent = character.name;
        
        const relationshipLevel = document.createElement('p');
        const relationshipStage = getRelationshipStage(character.relationshipLevel);
        relationshipLevel.textContent = relationshipStage.name;
        relationshipLevel.className = 'relationship-stage';
        
        characterCard.appendChild(img);
        characterCard.appendChild(name);
        characterCard.appendChild(relationshipLevel);
        
        characterCard.addEventListener('click', () => selectCharacter(character));
        
        charactersList.appendChild(characterCard);
    });
}

// Generate character image using the seed and prompt
async function generateCharacterImage(character, imgElement) {
    try {
        const result = await websim.imageGen({
            prompt: character.imagePrompt,
            seed: character.imageSeed,
            aspect_ratio: "1:1"
        });
        
        if (result && result.url) {
            imgElement.src = result.url;
            imgElement.dataset.generated = "true";
        }
    } catch (error) {
        console.error(`Error generating image for ${character.name}:`, error);
        // Use a fallback image or retry
        setTimeout(() => generateCharacterImage(character, imgElement), 3000);
    }
}

// Generate location image using the seed and prompt
async function generateLocationImage(location, imgElement) {
    try {
        const result = await websim.imageGen({
            prompt: location.imagePrompt,
            seed: location.imageSeed,
            aspect_ratio: "16:9"
        });
        
        if (result && result.url) {
            imgElement.src = result.url;
            imgElement.dataset.generated = "true";
        }
    } catch (error) {
        console.error(`Error generating image for ${location.name}:`, error);
        // Use a fallback image or retry
        setTimeout(() => generateLocationImage(location, imgElement), 3000);
    }
}

// Select a character to date
function selectCharacter(character) {
    state.currentCharacter = character;
    
    // Show location selection
    showLocationSelection();
}

// Show the location selection screen
function showLocationSelection() {
    document.getElementById('character-selection').style.display = 'none';
    document.getElementById('date-screen').style.display = 'none';
    document.getElementById('location-selection').style.display = 'block';
    
    populateLocationSelection();
}

// Populate the location selection screen
function populateLocationSelection() {
    const locationsList = document.getElementById('locations-list');
    locationsList.innerHTML = '';
    
    locations.forEach(location => {
        const locationCard = document.createElement('div');
        locationCard.className = 'location-card';
        locationCard.dataset.id = location.id;
        
        // Generate or load location image
        const img = document.createElement('img');
        img.alt = location.name;
        img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" viewBox="0 0 150 100"><rect width="150" height="100" fill="#f0f0f0"/><text x="75" y="50" font-family="Arial" font-size="12" text-anchor="middle" dominant-baseline="middle">Loading ${location.name}...</text></svg>`);
        
        // Generate location image
        generateLocationImage(location, img);
        
        const name = document.createElement('h3');
        name.textContent = location.name;
        
        const description = document.createElement('p');
        description.textContent = location.atmosphere;
        description.className = 'location-atmosphere';
        
        locationCard.appendChild(img);
        locationCard.appendChild(name);
        locationCard.appendChild(description);
        
        locationCard.addEventListener('click', () => selectLocation(location));
        
        locationsList.appendChild(locationCard);
    });
}

// Select a location for the date
function selectLocation(location) {
    state.currentLocation = location;
    
    // Start the date
    startDate();
}

// Start the date with selected character and location
function startDate() {
    document.getElementById('location-selection').style.display = 'none';
    document.getElementById('date-screen').style.display = 'block';
    
    // Update the UI with character and location info
    updateDateUI();
    
    // Begin dialog
    startDialog();
}

// Update the date screen UI
function updateDateUI() {
    // Set character info
    document.getElementById('character-name').textContent = state.currentCharacter.name;
    
    const characterImage = document.getElementById('character-image');
    characterImage.alt = state.currentCharacter.name;
    characterImage.src = document.querySelector(`.character-card[data-id="${state.currentCharacter.id}"] img`).src;
    
    // Set location info
    document.getElementById('location-name').textContent = state.currentLocation.name;
    
    const locationImage = document.getElementById('location-image');
    locationImage.alt = state.currentLocation.name;
    locationImage.src = document.querySelector(`.location-card[data-id="${state.currentLocation.id}"] img`).src;
}

// Start dialog for the current date
function startDialog() {
    // Clear previous dialog
    document.getElementById('dialog-text').textContent = '';
    document.getElementById('response-options').innerHTML = '';
    
    // Check if this is a first meeting or returning
    const hasMetBefore = state.currentCharacter.memories[state.currentLocation.id];
    
    // Get appropriate dialog based on relationship stage
    let dialog;
    if (hasMetBefore) {
        dialog = getRandomItem(dialogTemplates.returningMeeting);
        // Replace memory placeholders
        dialog = dialog.replace('[MEMORY]', state.currentCharacter.memories[state.currentLocation.id].topic || 'our conversation');
        dialog = dialog.replace('[RELATED_QUESTION]', getRelatedQuestion(state.currentCharacter.memories[state.currentLocation.id].topic));
    } else {
        dialog = getRandomItem(dialogTemplates.firstMeeting);
    }
    
    // Replace character and location placeholders
    dialog = dialog.replace('[CHARACTER_NAME]', state.currentCharacter.name);
    dialog = dialog.replace('[LOCATION_NAME]', state.currentLocation.name);
    
    // Display the dialog with typing effect
    typeDialog(dialog, () => {
        // Show response options after dialog is complete
        showResponseOptions(hasMetBefore);
    });
}

// Type dialog with animation effect
function typeDialog(text, callback) {
    const dialogElement = document.getElementById('dialog-text');
    dialogElement.textContent = '';
    
    // Calculate typing speed based on text speed setting (1-10)
    // Lower number = slower typing
    const typingInterval = 70 - (state.textSpeed * 5); 
    
    // Speak the full text immediately
    speakText(text, state.currentCharacter);
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            dialogElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            if (callback) callback();
        }
    }, typingInterval);
}

// Show response options for the player
function showResponseOptions(hasMetBefore) {
    const responseOptionsElement = document.getElementById('response-options');
    responseOptionsElement.innerHTML = '';
    
    // Get appropriate response options based on relationship and location
    let options = [];
    
    // Add general responses
    options = options.concat(responseOptions.general.slice(0, 3));
    
    // Add location-specific responses if available
    if (responseOptions.location[state.currentLocation.name]) {
        options = options.concat(responseOptions.location[state.currentLocation.name].slice(0, 2));
    }
    
    // Add personal/flirty responses based on relationship level
    const relationshipStage = getRelationshipStage(state.currentCharacter.relationshipLevel);
    if (relationshipStage.dialogOptions.includes('personal')) {
        options.push(getRandomItem(responseOptions.personal));
    }
    
    if (relationshipStage.dialogOptions.includes('flirty')) {
        options.push(getRandomItem(responseOptions.flirty));
    }
    
    // Shuffle and limit options
    options = shuffleArray(options).slice(0, 4);
    
    // Create option elements
    options.forEach(option => {
        const responseElement = document.createElement('div');
        responseElement.className = 'response-option';
        responseElement.textContent = option.text;
        
        responseElement.addEventListener('click', () => {
            handleResponseSelection(option, hasMetBefore);
        });
        
        responseOptionsElement.appendChild(responseElement);
    });
}

// Handle player response selection
function handleResponseSelection(option, hasMetBefore) {
    // Clear response options
    document.getElementById('response-options').innerHTML = '';
    
    // Update relationship based on response
    updateRelationship(option.effect);
    
    // Process the response
    let followUp = option.followUp;
    
    // Replace placeholders in follow-up
    followUp = followUp.replace('[EXPANDED_DETAIL]', getExpandedDetail(state.currentCharacter));
    followUp = followUp.replace('[INTEREST]', getRandomItem(state.currentCharacter.interests));
    followUp = followUp.replace('[BACKSTORY_DETAIL]', getBackstoryDetail(state.currentCharacter));
    followUp = followUp.replace('[VALUES_LIST]', getValuesList(state.currentCharacter));
    followUp = followUp.replace('[FUTURE_PLANS]', getFuturePlans(state.currentCharacter));
    followUp = followUp.replace('[PLANT_NAME]', 'orchid');
    followUp = followUp.replace('[FEATURE]', 'delicate beauty');
    
    // Display the follow-up
    typeDialog(followUp, () => {
        // Store memory of this conversation
        if (!hasMetBefore) {
            state.currentCharacter.memories[state.currentLocation.id] = {
                firstMeeting: new Date().toISOString(),
                topic: getConversationTopic(option)
            };
        } else {
            // Update existing memory
            state.currentCharacter.memories[state.currentLocation.id].lastMeeting = new Date().toISOString();
            state.currentCharacter.memories[state.currentLocation.id].topic = getConversationTopic(option);
        }
        
        // Save game state
        saveGameState();
        
        // Continue the conversation
        setTimeout(() => {
            continueConversation();
        }, 1500);
    });
}

// Continue the conversation with a new dialog
function continueConversation() {
    // Clear previous dialog
    document.getElementById('dialog-text').textContent = '';
    document.getElementById('response-options').innerHTML = '';
    
    // Get appropriate dialog based on character personality and location
    let dialog;
    
    // Personality-based dialog
    const personalityDialogs = dialogTemplates.personalityReactions[getPersonalityTrait(state.currentCharacter)];
    if (personalityDialogs && Math.random() > 0.3) {
        dialog = getRandomItem(personalityDialogs);
    } 
    // Location-specific dialog
    else if (dialogTemplates.locationSpecific[state.currentLocation.name]) {
        dialog = getRandomItem(dialogTemplates.locationSpecific[state.currentLocation.name]);
    }
    // Fallback to general dialog
    else {
        dialog = getRandomItem(dialogTemplates.firstMeeting);
    }
    
    // Display the dialog with typing effect
    typeDialog(dialog, () => {
        // Show new response options
        showResponseOptions(true);
    });
}

// End the current date and return to character selection
function endCurrentDate() {
    // Save the date in memories
    if (state.currentCharacter && state.currentLocation) {
        if (!state.currentCharacter.memories[state.currentLocation.id]) {
            state.currentCharacter.memories[state.currentLocation.id] = {};
        }
        
        state.currentCharacter.memories[state.currentLocation.id].lastMeeting = new Date().toISOString();
        
        // Save game state
        saveGameState();
    }
    
    // Reset current date
    state.currentCharacter = null;
    state.currentLocation = null;
    
    // Return to character selection
    document.getElementById('date-screen').style.display = 'none';
    document.getElementById('character-selection').style.display = 'block';
    
    // Stop any ongoing speech
    if (state.synth) {
        state.synth.cancel();
    }
    
    // Refresh character selection
    populateCharacterSelection();
}

// Reset all game progress
function resetGameProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        // Clear all localStorage data
        localStorage.removeItem('heartStringsState');
        
        characters.forEach(char => {
            localStorage.removeItem(`memories_${char.id}`);
            localStorage.removeItem(`relationship_${char.id}`);
            
            // Reset character data
            char.memories = {};
            char.relationshipLevel = 0;
        });
        
        // Reset current state
        state.currentCharacter = null;
        state.currentLocation = null;
        
        // Close settings modal
        document.getElementById('settings-modal').style.display = 'none';
        
        // Return to character selection
        document.getElementById('date-screen').style.display = 'none';
        document.getElementById('character-selection').style.display = 'block';
        
        // Refresh character selection
        populateCharacterSelection();
        
        alert('Game progress has been reset.');
    }
}

// Update relationship level based on response
function updateRelationship(effect) {
    if (!state.currentCharacter) return;
    
    switch (effect) {
        case 'very_positive':
            state.currentCharacter.relationshipLevel += 5;
            break;
        case 'positive':
            state.currentCharacter.relationshipLevel += 3;
            break;
        case 'neutral':
            state.currentCharacter.relationshipLevel += 1;
            break;
        case 'negative':
            state.currentCharacter.relationshipLevel -= 2;
            break;
        default:
            break;
    }
    
    // Ensure relationship level stays within bounds
    state.currentCharacter.relationshipLevel = Math.max(0, Math.min(100, state.currentCharacter.relationshipLevel));
}

// Get the current relationship stage based on level
function getRelationshipStage(level) {
    for (let i = relationshipStages.length - 1; i >= 0; i--) {
        if (level >= relationshipStages[i].level) {
            return relationshipStages[i];
        }
    }
    return relationshipStages[0];
}

// Helper function to get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Shuffle an array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Get a related question based on a topic
function getRelatedQuestion(topic) {
    if (!topic) return "follow up on that";
    
    const questions = {
        "painting": "finish that piece you were working on",
        "hiking": "go on that trail you mentioned",
        "music": "listen to that band you recommended",
        "technology": "try that app you were talking about",
        "traveling": "visit that place you described",
        "writing": "finish that story you were working on",
        "fitness": "try that workout routine",
        "default": "think more about what we discussed"
    };
    
    // Look for keywords in the topic
    for (const [key, question] of Object.entries(questions)) {
        if (topic.toLowerCase().includes(key)) {
            return question;
        }
    }
    
    return questions.default;
}

// Get expanded detail about a character
function getExpandedDetail(character) {
    const details = [
        `I've been interested in ${getRandomItem(character.interests)} since I was a teenager.`,
        `My passion for ${getRandomItem(character.interests)} has taken me to some interesting places.`,
        `I find that ${getRandomItem(character.interests)} really helps me express who I am.`,
        `I think my love of ${getRandomItem(character.interests)} comes from my childhood.`,
        `I've met some of my closest friends through our shared interest in ${getRandomItem(character.interests)}.`
    ];
    
    return getRandomItem(details);
}

// Get a detail from the character's backstory
function getBackstoryDetail(character) {
    // Split backstory into sentences and return one
    const sentences = character.backstory.split('. ');
    return getRandomItem(sentences) + '.';
}

// Get a list of values the character appreciates
function getValuesList(character) {
    const values = [
        "honesty and open communication",
        "mutual respect and support",
        "shared interests but also independence",
        "humor and the ability to laugh together",
        "trust and reliability",
        "understanding and patience"
    ];
    
    // Return 2-3 random values
    return shuffleArray(values).slice(0, 2 + Math.floor(Math.random() * 2)).join(", ");
}

// Get character's future plans
function getFuturePlans(character) {
    const plans = {
        "Emily": "have my own art gallery and maybe be teaching workshops to inspire others",
        "James": "have scaled my startup and be working on innovative tech that makes a real difference",
        "Sophia": "have visited at least 10 more countries and published a book about my travels",
        "Marcus": "have published my poetry collection and maybe be working on a novel",
        "Olivia": "have opened my own fitness studio focused on holistic wellness"
    };
    
    return plans[character.name] || "be doing something I'm passionate about and making a difference";
}

// Get a conversation topic based on the selected response
function getConversationTopic(option) {
    // Extract key topics from the option text and follow-up
    const text = option.text + ' ' + option.followUp;
    
    // Look for common interests in the text
    const interestKeywords = [
        "art", "painting", "music", "hiking", "nature",
        "technology", "travel", "food", "books", "writing",
        "fitness", "sports", "movies", "photography", "fashion",
        "relationship", "future", "career", "family", "hobbies"
    ];
    
    for (const keyword of interestKeywords) {
        if (text.toLowerCase().includes(keyword)) {
            return keyword;
        }
    }
    
    // Default topics based on option effect
    switch (option.effect) {
        case 'very_positive':
            return "our connection";
        case 'positive':
            return "our shared interests";
        case 'neutral':
            return "general conversation";
        case 'negative':
            return "our differences";
        default:
            return "our conversation";
    }
}

// Get the main personality trait of a character
function getPersonalityTrait(character) {
    const traits = character.personality.split(', ');
    return traits[0].trim();
}

