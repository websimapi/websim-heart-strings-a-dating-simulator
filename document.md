# Heart Strings: Interactive Dating Simulator

## Project Overview

Heart Strings is a mobile-compatible interactive dating simulator that allows players to select from multiple characters to date and take them to various locations. The application uses advanced language model capabilities for image generation, character dialogue, and text-to-speech functionality to create an immersive dating simulation experience.

## Key Features

### Character System
- Multiple unique characters with distinct personalities, interests, backgrounds, and appearance
- Characters maintain memories of previous interactions across different locations
- Relationship progression system with multiple stages (Strangers, Acquaintances, Friends, Close Friends, Dating)
- Consistent character appearance using seed-based image generation

### Location System
- Various dating locations with unique atmospheres and conversation options
- Consistent location appearance using seed-based image generation
- Location-specific dialogue options and interactions

### Dialogue System
- Dynamic dialogue generation based on character personality, relationship level, and location
- Multiple response options with varying effects on relationship development
- Memory system that recalls previous conversations and experiences
- Natural conversation flow with personality-appropriate reactions

### Text-to-Speech Integration
- Character voices assigned based on gender using available system voices
- Voice selection is consistent for each character across sessions
- Adjustable speech rate and volume settings
- TTS enabled by default with toggle option

### Image Generation
- Seed-based image generation for consistent character appearances
- Seed-based location images for environmental consistency
- Automatic fallback and retry mechanism for failed image generation
- Appropriate image aspect ratios for different UI elements (1:1 for characters, 16:9 for locations)

### Mobile Compatibility
- Responsive design that works on smartphones, tablets, and desktop
- Touch-friendly UI elements with appropriate sizing
- Efficient layout that maximizes screen real estate on smaller devices
- Loading screen to ensure smooth initial experience

### Data Persistence
- Saves relationship progression with each character
- Stores memories of conversations at different locations
- Preserves user preferences and settings
- Option to reset progress if desired

## Technical Implementation

### User Interface
- Character selection screen with relationship status indicators
- Location selection screen with atmospheric descriptions
- Date screen with character image, location background, dialogue box, and response options
- Settings modal for adjusting TTS and text display preferences

### Image Generation Process
- Character images generated using consistent seeds and detailed prompts
- Location images created with descriptive prompts and fixed seeds
- Loading placeholder displayed during image generation
- Error handling with automatic retry mechanism

### Text-to-Speech System
- Voice assignment based on character gender
- Consistent voice selection using deterministic assignment
- Volume and speed controls
- Interruption handling when new dialogue begins

### Memory and State Management
- LocalStorage used for persistent save data
- Structured memory objects for each character-location combination
- Relationship progression tracking
- Conversation topic memory

### Dialogue Generation
- Template-based system with dynamic replacements
- Personality-influenced response patterns
- Location-specific conversation starters
- Relationship-appropriate interaction options

## Character Profiles

### Emily
- Personality: Cheerful, artistic, loves nature
- Interests: painting, hiking, indie music, photography, coffee
- Background: Graphic designer with dreams of opening an art gallery
- Voice: Female voice with slightly higher pitch

### James
- Personality: Ambitious, witty, analytical
- Interests: technology, rock climbing, strategy games, sci-fi novels, trying new restaurants
- Background: Software engineer with his own tech startup
- Voice: Male voice with standard pitch

### Sophia
- Personality: Confident, adventurous, passionate
- Interests: traveling, dancing, cooking international cuisines, fashion, learning languages
- Background: Travel journalist who has lived in five different countries
- Voice: Female voice with slightly higher pitch

### Marcus
- Personality: Thoughtful, creative, kind
- Interests: writing poetry, playing guitar, documentaries, volunteering, quiet cafes
- Background: Literature professor who publishes poetry
- Voice: Male voice with standard pitch

### Olivia
- Personality: Energetic, optimistic, competitive
- Interests: fitness, team sports, healthy cooking, motivational books, outdoor activities
- Background: Personal trainer and former college athlete
- Voice: Female voice with slightly higher pitch

## Locations

### Seaside Café
- Atmosphere: Relaxed, romantic, peaceful
- Description: A charming café with floor-to-ceiling windows offering stunning views of the ocean

### Botanical Gardens
- Atmosphere: Serene, beautiful, intimate
- Description: Winding paths through beautiful displays of plants from around the world

### Rooftop Lounge
- Atmosphere: Sophisticated, trendy, exciting
- Description: Trendy spot offering breathtaking views of the city skyline

### Art Gallery
- Atmosphere: Cultured, intellectual, inspiring
- Description: Modern space showcasing works from local and international artists

### Lakeside Park
- Atmosphere: Natural, peaceful, casual
- Description: Picturesque park with a shimmering lake at its center

### Vintage Arcade
- Atmosphere: Playful, nostalgic, energetic
- Description: Step back in time in this nostalgic arcade filled with classic games

## Relationship Progression System

The relationship with each character progresses through five stages:

1. **Strangers (0-19)**: Initial meeting, basic conversation options
2. **Acquaintances (20-39)**: Recognition of previous meetings, more personal topics
3. **Friends (40-59)**: Comfortable conversation, some flirty options begin to appear
4. **Close Friends (60-79)**: Deep conversations, regular flirty options
5. **Dating (80-100)**: Romantic relationship established, intimate conversation options

Each response the player chooses affects the relationship score:
- Very Positive: +5 points
- Positive: +3 points
- Neutral: +1 point
- Negative: -2 points

## Future Enhancement Possibilities

1. **Character Customization**: Allow players to customize their own character's appearance and personality
2. **Special Events**: Holiday-themed or special occasion dates
3. **Gift System**: Purchase and give gifts to characters to boost relationship
4. **Mini-games**: Simple activities to do with characters during dates
5. **Branching Storylines**: More complex narrative paths based on choices
6. **Character Schedules**: Time-based availability of characters
7. **Weather Effects**: Dynamic weather that affects date atmosphere
8. **Expanded Locations**: More diverse dating spots
9. **Relationship Milestones**: Special events at key relationship stages
10. **Photo Album**: Collection of memories from previous dates

## Technical Requirements

- Modern web browser with JavaScript enabled
- Speech synthesis support for TTS features
- Stable internet connection for image generation
- LocalStorage support for save data
- Minimum screen size of 320px width (though 375px+ recommended)

## Development Considerations

- Ensure all image generation prompts are appropriate and consistent
- Test TTS functionality across different devices and browsers
- Optimize image loading and generation for mobile data usage
- Implement proper error handling for failed API calls
- Consider accessibility options for users with disabilities
- Ensure smooth performance on lower-end mobile devices

