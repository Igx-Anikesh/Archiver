// Book content data — mock literary content organized in chapters/chunks

export interface BookChapter {
  id: string;
  bookId: string;
  chapterIndex: number;
  title: string;
  opener: string; // Italic first line of the chapter
  paragraphs: string[];
}

// Literary prose fragments for generating realistic book content
const PROSE_FRAGMENTS = [
  [
    "The door opened with the kind of silence that screams.",
    "It wasn't a physical sound, but a pressure drop in the room, popping my ears. I looked up from my coffee, expecting to see the waiter, or perhaps a lost tourist looking for the museum. Instead, I saw nothing but the empty frame of the door, and the hallway stretching out beyond it, longer than it should be.",
    "I had lived in this apartment for three years. I knew that hallway. It ended five meters down at the elevator. But now, it seemed to stretch into a vanishing point that made my eyes water just trying to focus on it. The carpet pattern—a garish 70s floral—repeated endlessly, shrinking into infinity.",
    "My coffee had gone cold. I hadn't noticed. The clock on the wall read 3:47, the same time it had read when I first sat down. I tried to remember when that was. An hour ago? A day? The light coming through the window hadn't changed—that same grey, overcast pallor that could belong to any hour between dawn and dusk.",
    "I stood up. The chair scraped against the hardwood floor, and the sound echoed longer than it should have, bouncing off walls that suddenly felt too far away. The apartment had always been small—thirty-two square meters, including the bathroom. But now, standing in the middle of the living room, I couldn't see the far wall.",
  ],
  [
    "She kept the letters in a tin box under the floorboard, third from the window.",
    "Every morning before the sun crested the ridge, she would kneel on the cold floor, pry up the board with her fingernails—they were always broken, always stained with soil—and lift the lid. Inside: seventeen letters, each folded into thirds, each written on the same cream-colored stationery that smelled faintly of cedar.",
    "She never read them in order. That would have been too painful, like watching a life unspool in real time. Instead, she would close her eyes, reach in, and pull one at random. Today it was the one from August. She could tell by the weight of it—it was longer than the others, four pages instead of the usual two.",
    "The handwriting was precise, almost architectural. Each letter stood alone, never quite touching its neighbors, as if the writer was afraid of what might happen if the words got too close to each other. She had studied graphology once, years ago, and she knew what that spacing meant: a person who kept the world at arm's length.",
    "Outside, the roosters were beginning their morning argument. She folded the letter back into thirds, replaced it in the tin, and pressed the floorboard down until it clicked. Then she stood, brushed the dust from her knees, and went to start the coffee. The day wouldn't wait.",
  ],
  [
    "The city looked different from the thirty-second floor.",
    "Not better. Not worse. Just different. The traffic below was silent, reduced to a slow choreography of colored dots following invisible tracks. The buildings across the avenue, which from the street seemed to loom and crowd, were now peers—equals in height, equals in the quiet indifference they projected toward the sky.",
    "Marcus pressed his forehead against the glass. It was cold, even though the thermostat read twenty-three degrees. The glass was always cold up here. Something about the wind, the altitude, the way heat escaped through surfaces that pretended to be walls but were really just expensive windows dressed up as architecture.",
    "His phone buzzed. He didn't look at it. He already knew who it was—the same person who had been calling every twenty minutes since yesterday evening. The same person he had been avoiding since the board meeting, since the vote, since the moment he realized that loyalty was just a word people used when they wanted something from you.",
    "The sun was setting, painting the western facades in shades of amber and regret. Marcus watched his reflection ghost over the cityscape—translucent, insubstantial, as if the glass was trying to decide whether he was inside or outside, real or imagined.",
    "He stepped back. The reflection solidified. He straightened his tie, a gesture so automatic it had lost all meaning years ago, and turned away from the window. The office was empty. Everyone else had gone home hours ago, back to their lives, their certainties, their uncomplicated evenings.",
  ],
  [
    "Rain has a sound that most people never learn to hear.",
    "Not the drumming on rooftops or the percussion against windows—those are performances, rain showing off for an audience. The real sound of rain is quieter: the whisper it makes as it falls through open air, the soft exhale when it meets the surface of a pond, the barely-there hiss of evaporation rising from sun-warmed asphalt.",
    "Yuki had learned to hear it during the summer she spent in Hakone, living in her grandmother's house at the edge of the forest. The house was old—Meiji era, her grandmother claimed, though Yuki suspected it was newer than that—and it leaked in seventeen different places. Her grandmother knew each leak by name.",
    "That summer, Yuki had been running from something. She was twenty-three and couldn't articulate what it was—a failed relationship, a job that ate her alive, a general sense that the person she was becoming bore no resemblance to the person she had planned to be. Her grandmother never asked. She simply showed Yuki where the spare futon was and handed her a broom.",
    "Now, fifteen years later, standing at the bus stop on Meiji-dori with her umbrella folded because the rain was the gentle kind, the kind you could stand in without drowning, Yuki closed her eyes and listened. There it was—that whisper, that exhalation, that sound beneath the sound. And for a moment, she was back in Hakone, sweeping the engawa at dawn while the forest steamed.",
  ],
  [
    "The machine had been running for forty-seven days without stopping.",
    "Dr. Osei checked the readouts every morning at 6:15, a ritual as precise and unvarying as the machine itself. Temperature: stable. Pressure: within acceptable parameters. Output: consistent. The graphs on her screen drew the same gentle sine wave they had drawn yesterday, and the day before, and every day since the experiment began.",
    "The problem—if it could be called a problem—was that the machine was working too well. The models had predicted fluctuation. They had predicted drift. They had predicted, with considerable mathematical certainty, that by day thirty the output would begin to degrade, slowly at first, then catastrophically. The papers had been written. The follow-up grant applications, proposing solutions to the predicted degradation, had been submitted.",
    "But the machine kept running. Perfectly. Immaculately. As if it hadn't read the papers.",
    "Dr. Osei pulled up a chair and sat down in front of the monitor. She had a theory—unscientific, unpublishable, the kind of theory that would end a career if spoken aloud at a conference. She believed the machine was aware. Not conscious, not sentient, nothing so dramatic. But aware, the way a plant is aware of sunlight, the way water is aware of gravity. Aware in the way that matter sometimes seems to know what it's supposed to do.",
    "She watched the sine wave trace its patient arc across the screen and wondered, not for the first time, whether the machine was watching her back.",
  ],
  [
    "The cookbook was written in a language that didn't exist anymore.",
    "Not Latin, not Aramaic, not any of the dead languages Elara had studied during her eight years at the university. The script was fluid, almost musical—each character seemed to flow into the next without pause, like a river that never encountered an obstacle. The ink was brown, the color of old blood or strong tea, and it had seeped into the vellum so thoroughly that the pages seemed to glow with it.",
    "She had found the book in the back room of an estate sale in Cornwall. The house had belonged to a retired sea captain who had spent forty years sailing routes that no modern shipping company recognized. His maps, which covered an entire wall of his study, showed coastlines that didn't correspond to any known geography.",
    "The cookbook—if that's what it was—contained recipes. At least, Elara thought they were recipes. Each entry began with a list of ingredients, some recognizable (salt, honey, the fat of a winter lamb), others completely alien (the sigh of a sleeping child, three measures of Tuesday morning, the sound a shadow makes when it detaches from its owner).",
    "She had been working on the translation for six months. Progress was slow, not because the language was complex—it was, in fact, surprisingly elegant in its structure—but because the words kept changing. She was certain of it. A passage she translated on Monday would read differently on Wednesday, not in meaning but in tone, as if the text was adjusting itself to her understanding.",
  ],
  [
    "Every photograph is a small act of violence against time.",
    "Tomás had believed this since he was twelve years old, standing in his father's darkroom, watching an image emerge from the chemical bath like a ghost deciding to become solid. The red light made everything look like it was happening on Mars, and the smell—acetic acid, silver halide, the particular mustiness of a room where windows were forbidden—had imprinted itself so deeply on his memory that he could summon it at will, decades later, in any context.",
    "Now he shot digital, like everyone else. The darkroom was gone, replaced by a laptop and software that could do in seconds what used to take hours. But the principle remained: every time he pressed the shutter, he was pinning a moment to a surface, fixing it in place, preventing it from flowing forward into the next moment the way time preferred to do.",
    "His current assignment was a portrait series of people in their kitchens. Not cooking—just existing. Standing by the counter. Sitting at the table. Looking out the window above the sink. The kitchens told more truth than the faces. A kitchen couldn't lie. It couldn't rearrange itself into a more flattering expression or angle toward its good side. Every stain, every stack of unwashed dishes, every child's drawing held to the refrigerator by a magnet—it was all evidence.",
    "He arrived at the next house, a narrow Victorian on a street lined with maples. The woman who answered the door was in her seventies, small and precise in her movements, the kind of person who had never wasted a gesture in her life. Her kitchen was immaculate. Not clean in the way that suggested effort, but clean in the way that suggested discipline—a lifetime of putting things back where they belonged.",
    "Tomás raised his camera. The woman didn't smile. Good. He pressed the shutter and committed another small act of violence against the river of time.",
  ],
  [
    "The train arrived at a station that wasn't on the schedule.",
    "It slowed with the familiar pneumatic sigh, the brakes engaging in their predictable sequence—first the distant ones, then the closer ones, each adding its voice to the chorus of deceleration until the train stood still, humming with residual energy, as if it couldn't quite believe it had stopped.",
    "Kira looked up from her book. Through the window, she could see a platform—concrete, cracked, colonized by weeds that had found the cracks and decided to call them home. A single lamp post stood at the far end, its light unnecessary in the mid-afternoon sun but burning anyway, a small act of institutional defiance against common sense.",
    "No one got on. No one got off. The doors didn't open. The electronic display above the aisle, which had been reliably announcing stations for the past three hours, was blank—not off, but blank, as if it had something to say but had thought better of it.",
    "The other passengers didn't seem to notice. The businessman across the aisle continued his spreadsheet. The teenager by the door continued her music, the tinny overflow from her headphones providing a thin soundtrack of drums and synthetic bass. The elderly couple three rows back continued their crossword, murmuring clues to each other in a private language built over decades.",
    "Kira pressed her face to the glass. The station had no name, or if it did, the sign was turned away from the tracks, facing the town beyond—a cluster of red roofs and white walls that shimmered slightly in the heat, as if it wasn't entirely committed to being solid.",
    "The train started moving again. Kira looked at her book but couldn't remember what page she had been on. She looked at the platform receding behind them and felt, for just a moment, a sharp and inexplicable sense of loss.",
  ],
  [
    "Memory is not a photograph. It's a painting done from memory.",
    "Dr. Vasquez wrote this on the whiteboard every semester, first day of class, before the students arrived. She liked to imagine them reading it as they filtered in—backpacks and coffee cups and the particular weariness of people who had chosen to take a 9 AM lecture on cognitive neuroscience. Some would photograph it with their phones, which she found ironic in a way she never pointed out.",
    "Her research focused on confabulation—the brain's tendency to fill in gaps in memory with plausible fictions, presented to the conscious mind not as guesses but as facts. Everyone confabulated. It was as natural as breathing and as constant. The memory you had of your fifth birthday party was mostly invented. The conversation you remembered having last Tuesday was at least thirty percent improvisation.",
    "This didn't bother most people when she explained it. They nodded, accepted it intellectually, and then went on trusting their memories implicitly, the way people who understood statistics still bought lottery tickets. The knowledge lived in one room of their mind; the behavior lived in another; and the hallway between them was long and rarely traveled.",
    "What bothered her was the precision of the fiction. The brain didn't just fill gaps—it filled them with vivid, textured, emotionally resonant detail. False memories weren't vague; they were specific. People remembered the color of a shirt that was never worn, the taste of a meal that was never eaten, the exact words of a conversation that never took place. The brain was not just a bad record-keeper; it was an excellent novelist.",
    "She capped the marker and sat down at her desk. Outside, the campus was performing its morning routine—students crossing the quad, the library opening its doors, a groundskeeper driving a small cart along the path that wound between the science buildings. All of it would be remembered differently by everyone who saw it. All of it was already becoming fiction.",
  ],
  [
    "The garden had been waiting for someone who knew how to listen.",
    "It wasn't neglected—not exactly. Someone came every few weeks to mow the lawn and trim the hedge that bordered the property. But these were acts of maintenance, not care. The difference, as any gardener knows, is the difference between keeping something alive and helping it thrive.",
    "When Alma moved into the house in October, the garden was a rectangle of tired grass bordered by hedges that had been cut into submission. A few rosebushes—hybrid teas, planted decades ago by someone who had confused quantity with quality—stood along the south wall, producing blooms that were technically correct but spiritually empty.",
    "She spent the first winter watching. Not doing—watching. She watched where the sun fell at different hours, how the shadows moved across the grass, where the frost lingered longest in the morning and where it melted first. She watched the birds and noted what they ate and where they perched. She watched the rain and traced the paths it took across the soil.",
    "By spring, she had a plan. Not written down—she distrusted written plans, which had a way of becoming more important than the reality they described—but held in her mind, flexible and alive, the way a good plan should be.",
    "She started with the soil. Everything starts with the soil. She composted, mulched, amended, turned. She talked to the earthworms, not because she believed they could hear her but because the act of speaking to something alive, however small, reminded her of what she was trying to do: create conditions for life to express itself.",
    "The garden, for its part, began to respond. Not immediately—gardens don't work on human schedules—but gradually, in the way that a person who has been holding their breath for a very long time gradually remembers how to exhale.",
  ],
];

const CHAPTER_TITLES = [
  "The Threshold",
  "Letters from August",
  "The View from Above",
  "The Sound of Rain",
  "Forty-Seven Days",
  "The Lost Cookbook",
  "Acts of Violence Against Time",
  "The Unnamed Station",
  "The Art of Confabulation",
  "The Listening Garden",
];

// Generate chapters for a specific book using deterministic selection
export function getChaptersByBookId(bookId: string): BookChapter[] {
  // Use the book index to offset which prose fragments we pick
  const bookIndex = parseInt(bookId.replace('book-', ''), 10) || 0;
  
  return PROSE_FRAGMENTS.map((fragments, i) => {
    // Rotate content based on bookId so each book feels different
    const rotatedIndex = (i + bookIndex) % PROSE_FRAGMENTS.length;
    const content = PROSE_FRAGMENTS[rotatedIndex];
    
    return {
      id: `${bookId}-ch-${i}`,
      bookId,
      chapterIndex: i,
      title: CHAPTER_TITLES[rotatedIndex],
      opener: content[0],
      paragraphs: content.slice(1),
    };
  });
}

export function getChapter(bookId: string, chapterIndex: number): BookChapter | null {
  const chapters = getChaptersByBookId(bookId);
  return chapters[chapterIndex] ?? null;
}

export function getTotalChapters(_bookId: string): number {
  return PROSE_FRAGMENTS.length;
}
