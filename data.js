// Character data with personalities, preferences, and memory
const characters = [
    {
        id: 1,
        name: "Emily",
        gender: "female",
        imageSeed: 1001,
        imagePrompt: "Professional portrait of a cheerful young woman with wavy brown hair and green eyes, smiling warmly at the camera, wearing casual elegant clothes, natural makeup",
        personality: "Cheerful, artistic, loves nature",
        interests: ["painting", "hiking", "indie music", "photography", "coffee"],
        dislikes: ["loud crowds", "rude people", "horror movies"],
        backstory: "Emily works as a graphic designer and dreams of opening her own art gallery someday. She grew up in a small town and moved to the city for college, where she fell in love with the local art scene.",
        voice: null, // Will be set during initialization
        memories: {}, // Will be filled during gameplay
        relationshipLevel: 0
    },
    {
        id: 2,
        name: "James",
        gender: "male",
        imageSeed: 1002,
        imagePrompt: "Professional portrait of a confident young man with short dark hair and warm brown eyes, with a slight smile, wearing a casual button-up shirt, clean-shaven",
        personality: "Ambitious, witty, analytical",
        interests: ["technology", "rock climbing", "strategy games", "sci-fi novels", "trying new restaurants"],
        dislikes: ["being late", "small talk", "reality TV"],
        backstory: "James is a software engineer who started his own tech startup. He's passionate about using technology to solve real-world problems and loves challenging himself both mentally and physically.",
        voice: null,
        memories: {},
        relationshipLevel: 0
    },
    {
        id: 3,
        name: "Sophia",
        gender: "female",
        imageSeed: 1003,
        imagePrompt: "Professional portrait of a stylish young woman with long black hair and dark eyes, with a confident smile, wearing fashionable clothes, subtle elegant jewelry",
        personality: "Confident, adventurous, passionate",
        interests: ["traveling", "dancing", "cooking international cuisines", "fashion", "learning languages"],
        dislikes: ["closed-minded people", "staying in one place too long", "bad food"],
        backstory: "Sophia is a travel journalist who has lived in five different countries. She speaks three languages fluently and is always planning her next adventure, whether it's a weekend road trip or an expedition abroad.",
        voice: null,
        memories: {},
        relationshipLevel: 0
    },
    {
        id: 4,
        name: "Marcus",
        gender: "male",
        imageSeed: 1004,
        imagePrompt: "Professional portrait of a thoughtful young man with curly hair and blue eyes, with a gentle smile, wearing comfortable stylish clothes, glasses",
        personality: "Thoughtful, creative, kind",
        interests: ["writing poetry", "playing guitar", "documentaries", "volunteering", "quiet cafes"],
        dislikes: ["materialism", "judgment", "wasting time"],
        backstory: "Marcus teaches literature at a local college and publishes poetry in his spare time. He volunteers at a community center teaching creative writing and believes in the power of words to change lives.",
        voice: null,
        memories: {},
        relationshipLevel: 0
    },
    {
        id: 5,
        name: "Olivia",
        gender: "female",
        imageSeed: 1005,
        imagePrompt: "Professional portrait of an athletic young woman with blonde hair in a ponytail and bright eyes, with an energetic smile, wearing casual sporty clothes",
        personality: "Energetic, optimistic, competitive",
        interests: ["fitness", "team sports", "healthy cooking", "motivational books", "outdoor activities"],
        dislikes: ["negativity", "laziness", "processed food"],
        backstory: "Olivia is a personal trainer and former college athlete. She's passionate about helping people become their best selves and believes in balancing hard work with having fun.",
        voice: null,
        memories: {},
        relationshipLevel: 0
    }
];

// Dating locations with descriptions
const locations = [
    {
        id: 1,
        name: "Seaside Café",
        imageSeed: 2001,
        imagePrompt: "A cozy café with large windows overlooking a beautiful beach, wooden tables, soft lighting, and a relaxed atmosphere",
        description: "A charming café with floor-to-ceiling windows offering stunning views of the ocean. The sound of waves provides a soothing backdrop to your conversation.",
        atmosphere: "Relaxed, romantic, peaceful"
    },
    {
        id: 2,
        name: "Botanical Gardens",
        imageSeed: 2002,
        imagePrompt: "A lush botanical garden with exotic plants, colorful flowers, stone pathways, and secluded benches, soft natural lighting",
        description: "Winding paths lead through beautiful displays of plants from around the world. Secret benches tucked away in quiet corners offer private spaces to talk.",
        atmosphere: "Serene, beautiful, intimate"
    },
    {
        id: 3,
        name: "Rooftop Lounge",
        imageSeed: 2003,
        imagePrompt: "A stylish rooftop lounge with city skyline views, modern furniture, ambient lighting, and a sophisticated atmosphere",
        description: "This trendy spot offers breathtaking views of the city skyline. With comfortable seating and ambient music, it's perfect for getting to know someone.",
        atmosphere: "Sophisticated, trendy, exciting"
    },
    {
        id: 4,
        name: "Art Gallery",
        imageSeed: 2004,
        imagePrompt: "A contemporary art gallery with white walls, interesting exhibits, soft gallery lighting, and minimalist design",
        description: "A modern space showcasing works from local and international artists. The thought-provoking pieces provide plenty of conversation starters.",
        atmosphere: "Cultured, intellectual, inspiring"
    },
    {
        id: 5,
        name: "Lakeside Park",
        imageSeed: 2005,
        imagePrompt: "A scenic park with a peaceful lake, walking paths, old trees, benches, and natural beauty",
        description: "A picturesque park with a shimmering lake at its center. You can stroll along the water's edge or find a perfect spot for a picnic under the shade of an old oak tree.",
        atmosphere: "Natural, peaceful, casual"
    },
    {
        id: 6,
        name: "Vintage Arcade",
        imageSeed: 2006,
        imagePrompt: "A retro arcade with colorful vintage game machines, neon lights, nostalgic atmosphere, and playful environment",
        description: "Step back in time in this nostalgic arcade filled with classic games. The playful environment brings out everyone's competitive and fun-loving side.",
        atmosphere: "Playful, nostalgic, energetic"
    }
];

// Dialog starters based on character and location combinations
const dialogTemplates = {
    "firstMeeting": [
        "Hi there, I'm [CHARACTER_NAME]. It's nice to meet you! What made you want to meet up today?",
        "I've been looking forward to meeting you! How's your day been so far?",
        "Well, here we are! I've heard good things about this place. How are you doing today?",
        "Thanks for meeting me at [LOCATION_NAME]. It's one of my favorite spots in town.",
        "I'm [CHARACTER_NAME]. It's great to finally meet in person. What should I know about you?"
    ],
    "returningMeeting": [
        "It's really nice to see you again! I've been thinking about our last conversation about [MEMORY].",
        "Hey there! Good to see you again. How have you been since we last met?",
        "I remember last time we were talking about [MEMORY]. Did you ever [RELATED_QUESTION]?",
        "I was hoping we'd get to meet up again! This place reminds me of when we talked about [MEMORY].",
        "Back at [LOCATION_NAME]! I enjoyed our last time here. Have you been up to anything interesting since then?"
    ],
    "locationSpecific": {
        "Seaside Café": [
            "The ocean is so calming, isn't it? Do you come to the beach often?",
            "This café has the best view in town. Are you a coffee person or do you prefer tea?",
            "I love the sound of the waves while we talk. Do you prefer the ocean or mountains?",
            "There's something so peaceful about watching the water. What's your favorite way to relax?"
        ],
        "Botanical Gardens": [
            "These flowers are beautiful. Do you have any plants at home?",
            "I always feel so refreshed surrounded by all this greenery. What's your favorite part of nature?",
            "Did you know some of these plants are from [interesting fact]? Are you interested in botany?",
            "I've always thought you can tell a lot about a person by their favorite plant. Do you have one?"
        ],
        "Rooftop Lounge": [
            "The city looks so different from up here. What's your favorite neighborhood?",
            "This view is incredible. Are you a city person or do you prefer somewhere quieter?",
            "I love seeing all the lights come on as the sun sets. What time of day do you enjoy most?",
            "There's so much energy in the city tonight. What's your idea of a perfect evening out?"
        ],
        "Art Gallery": [
            "What do you think of this exhibit? Does art play a big role in your life?",
            "I find this piece particularly interesting because [observation]. What catches your eye here?",
            "Art is so subjective. Do you have a favorite style or artist?",
            "I've always believed art reflects something about the viewer. What does this piece make you feel?"
        ],
        "Lakeside Park": [
            "Days like this make me appreciate simple pleasures. What small things make you happy?",
            "I love how peaceful it is here. Do you prefer outdoor activities or indoor ones?",
            "This reminds me of a park near where I grew up. What was your favorite place as a kid?",
            "Nature has a way of putting things in perspective, doesn't it? What do you do when you need to clear your head?"
        ],
        "Vintage Arcade": [
            "Were you into video games growing up? I was obsessed with [game].",
            "Let's see who can get the high score on that game! Are you competitive?",
            "These old games bring back so many memories. What's something you're nostalgic about?",
            "I love how games let you be a kid again. What's something you still enjoy from childhood?"
        ]
    },
    "personalityReactions": {
        "Cheerful": [
            "I love how the atmosphere here brightens everyone's mood!",
            "Isn't it amazing how the little things can bring so much joy?",
            "I try to find something positive in every situation. What makes you smile?"
        ],
        "Ambitious": [
            "I've been working on a new project that I'm really excited about.",
            "I believe every experience teaches us something valuable. What's a lesson you've learned recently?",
            "I'm always looking for new challenges. What's something you're striving for?"
        ],
        "Confident": [
            "I decided recently to just go for what I want in life. No regrets, you know?",
            "Sometimes you have to take chances to get the most out of life. Are you a risk-taker?",
            "I find that being yourself is always the best approach. What do you think?"
        ],
        "Thoughtful": [
            "I've been reflecting lately on what really matters in life. What's important to you?",
            "Sometimes I get lost in thought about the bigger questions. Do you ever feel that way?",
            "I believe there's something to learn from everyone we meet. What's your philosophy?"
        ],
        "Energetic": [
            "I just got back from [activity] and I'm already planning my next adventure!",
            "Life's too short to sit still! What's something exciting you've done recently?",
            "I'm always up for trying new things. What's something you've always wanted to do?"
        ]
    }
};

// Response options templates
const responseOptions = {
    "general": [
        {
            text: "That sounds interesting. Tell me more about that.",
            effect: "positive",
            followUp: "I'm glad you're interested! Well, [EXPANDED_DETAIL]"
        },
        {
            text: "I feel the same way! We have that in common.",
            effect: "very_positive",
            followUp: "Really? That's wonderful! It's always nice to meet someone who shares my [INTEREST]. What specifically do you enjoy about it?"
        },
        {
            text: "I'm not really into that, but I respect your interest.",
            effect: "neutral",
            followUp: "That's totally fair! We all have different tastes. What kinds of things do you enjoy?"
        },
        {
            text: "That's not really my thing.",
            effect: "negative",
            followUp: "Oh, I see. Well, we can't all like the same things. What are you passionate about?"
        }
    ],
    "personal": [
        {
            text: "I'd love to hear more about your background.",
            effect: "positive",
            followUp: "I appreciate your interest! [BACKSTORY_DETAIL]"
        },
        {
            text: "What are you looking for in a relationship?",
            effect: "positive",
            followUp: "That's a thoughtful question. I value [VALUES_LIST] in a relationship. What about you?"
        },
        {
            text: "Where do you see yourself in five years?",
            effect: "positive",
            followUp: "I've been thinking about that a lot lately. Ideally, I'd [FUTURE_PLANS]. Does that sound strange?"
        }
    ],
    "flirty": [
        {
            text: "You have a wonderful smile.",
            effect: "positive",
            followUp: "That's so sweet of you to say! You just made my day a little brighter."
        },
        {
            text: "I'm really enjoying getting to know you.",
            effect: "very_positive",
            followUp: "The feeling is mutual! There's something about our conversation that feels really natural."
        },
        {
            text: "We should do this again sometime.",
            effect: "very_positive",
            followUp: "I'd really like that! It's been a while since I've connected with someone this easily."
        }
    ],
    "location": {
        "Seaside Café": [
            {
                text: "The ocean view here is breathtaking, isn't it?",
                effect: "positive",
                followUp: "It really is! I find the sound of waves so calming. Do you come to the beach often?"
            },
            {
                text: "Have you tried their specialty drink? It's amazing.",
                effect: "positive",
                followUp: "I haven't yet! Thanks for the recommendation. I'm always on the lookout for hidden gems like that."
            }
        ],
        "Botanical Gardens": [
            {
                text: "Which of these plants is your favorite?",
                effect: "positive",
                followUp: "I love the [PLANT_NAME]. There's something about its [FEATURE] that I find fascinating."
            },
            {
                text: "It's so peaceful here, away from the city noise.",
                effect: "positive",
                followUp: "Exactly! Sometimes I come here just to clear my head and reconnect with nature."
            }
        ]
        // Similar options for other locations would be defined here
    }
};

// Relationship progression stages
const relationshipStages = [
    {
        level: 0,
        name: "Strangers",
        dialogOptions: ["firstMeeting", "general", "personal"]
    },
    {
        level: 20,
        name: "Acquaintances",
        dialogOptions: ["returningMeeting", "general", "personal", "flirty"]
    },
    {
        level: 40,
        name: "Friends",
        dialogOptions: ["returningMeeting", "general", "personal", "flirty"]
    },
    {
        level: 60,
        name: "Close Friends",
        dialogOptions: ["returningMeeting", "general", "personal", "flirty"]
    },
    {
        level: 80,
        name: "Dating",
        dialogOptions: ["returningMeeting", "general", "personal", "flirty"]
    }
];

