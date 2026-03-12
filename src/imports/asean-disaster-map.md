🗺️ State 1: ASEAN Macro Map (Home Screen)

The default application state.

This screen introduces the Disaster Matrix, which visualizes major disaster risks across Southeast Asia.

Layout Structure

Use layer hierarchy.

Z-Index 0 → Base Map
Z-Index 1 → Disaster Markers
Z-Index 2 → UI Navigation

Base Layer (Z-Index 0)

A stylized 2.5D vector map of Southeast Asia.

Map Style:

• flat pastel terrain
• thick black borders
• cartoon rivers and coastlines
• doodle clouds and waves

Ocean Design:

Soft blue background with repeating doodle waves.

Example:

~  ~  ~  ~


Countries should have distinct pastel colors.

Disaster Matrix Markers (Z-Index 1)

These markers represent major regional disaster types.

Markers float slightly above the map and have:

• thick black outlines
• strong sticker shadows
• gentle bobbing animation

Animation:

Vertical float loop
Duration: 3 seconds
Movement: 6px

Regional Disaster Markers
Philippines 🇵🇭

Typhoon Marker

Icon design:

Cute blue whirlwind with dizzy eyes.

Represents:

Super Typhoons.

Secondary marker:

Brown falling rock doodles.

Represents:

Landslides.

Indonesia 🇮🇩

Volcano Marker

Small grey volcano with a cotton-candy smoke cloud.

Represents:

Volcanic eruptions.

Secondary marker:

Tree with orange flames.

Represents:

Forest fires and haze.

Malaysia 🇲🇾

Flood Marker

Large dark rain cloud with a band-aid.

Below it:

Tiny house partially submerged in water.

Represents:

Monsoon and flash floods.

Vietnam & Thailand 🇻🇳 🇹🇭

Drought Marker

Cracked yellow earth patch with one weak green plant.

Secondary marker:

Blue overflowing river waves.

Represents:

River basin flooding.

Myanmar & Cambodia 🇲🇲 🇰🇭

Cyclone Marker

Grey spiral cloud with strong wind lines.

Secondary marker:

Wooden stilt house in rising water.

Represents:

Cyclones and seasonal flooding.

Singapore 🇸🇬

Urban Heat Marker

Bright red sun wearing sunglasses.

Sweating cartoon expression.

Represents:

Urban heatwaves.

Top Navigation Bar (Z-Index 2)

Large pill-shaped search bar.

Style:

Background: White
Border: 4px black
Border radius: 999px


Placeholder text:

Where do you want to explore?

Radar Toggle Switch

Location:

Top right corner.

Design:

Mechanical toggle style.

States:

OFF → Grey
ON → Neon Green or Alert Red

Label:

Radar

📖 State 2: History Capsule (Learning Mode)

Triggered when user taps a Disaster Marker.

Map Focus Effect

Background map becomes darker.

Overlay:

Black
Opacity: 20%


Purpose:

Focus user attention on the learning card.

Bottom Sheet Modal

Large card slides from bottom.

Height:

60% of screen.

Design:

Background: White
Border: 4px black
Top border radius: 32px
Shadow: Sticker style

Modal Content Layout
Section 1 — Comic Story

3-panel horizontal comic strip.

Panel 1

Dark clouds and strong wind bending palm trees.

Panel 2

Wind lifting roof off a small house.

Panel 3

Family sitting safely inside interior room.

Educational Text

Example:

Typhoons happen often here.

When the wind gets strong,
where is the safest place to stay?

Gamified Quiz

Two large pill buttons.

Stacked vertically.

Wrong Option

Grey button.

Text:

Next to the big glass window.

Correct Option

Bright yellow button.

Text:

Inside the hallway or bathroom!

Reward Animation

Correct answer triggers:

• confetti burst
• badge unlock animation

Badge example:

Typhoon Master

🚨 State 3: Hyper-Local Forecast (Radar Mode)

Triggered when user activates Radar Toggle.

The map transforms from learning mode → real-time survival mode.

Radar Activation

Toggle switch turns:

Neon green or alert red.

Subtle pulsing glow.

Risk Overlay

The map dims slightly.

A semi-transparent watercolor threat zone appears.

Example:

Flash flood risk in Kuala Lumpur.

Color:

Light red / purple gradient
Opacity: 35%

User Location Marker

Icon:

Blinking smiling dot.

Color:

Sky blue.

Animation:

Soft pulse.

Safe Route System

Evacuation route appears.

Style:

Hand-drawn dashed line.

Animation:

Marching ants movement.

Destination:

Green shield icon.

Represents:

Safe zone.

Examples:

• school
• community center
• hospital

Top Alert Banner

Large alert card slides from top.

Design:

Background: Coral Red
Border: 4px black
Rounded corners: 16px


Text:

⚠️ Flash flood risk in 2 hours!

Tap to see the safest route to higher ground.