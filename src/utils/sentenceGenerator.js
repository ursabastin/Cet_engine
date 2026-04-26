export const prefixes = [
  "Hold up,", "Wait a minute,", "Seriously?", "Are you sure about this?", "Look at you,", 
  "I mean,", "Okay, fine,", "Wow,", "Let's be real:", "Check this out,"
];

export const actions = [
  "you're about to take the easy way out", "you're reaching for the secret scroll", 
  "you're giving up on your own potential", "you want me to just hand you the answer", 
  "you're about to spend a precious token", "you're thinking of relying on the engine",
  "you are about to skip the hard work", "you're choosing the path of least resistance",
  "you're looking for a shortcut", "you are doubting your own jutsu"
];

export const alternatives = [
  "when you could just use your own brain", "instead of actually thinking it through", 
  "when your own mind is perfectly capable", "rather than pushing your limits",
  "instead of trusting your training", "when you know you should figure it out",
  "rather than activating your brain cells", "instead of unlocking your true potential",
  "when real pros use their intellect", "rather than solving it yourself"
];

export const conclusions = [
  "Don't be lazy!", "Think again!", "You are better than this.", "Is this really your ninja way?", 
  "Try using your brain instead!", "Challenge yourself!", "Don't let the engine do your work.",
  "You should use your brain instead of this.", "Prove me wrong and do it yourself.", 
  "Step up your game!"
];

export function generateMockingSentence() {
  const p = prefixes[Math.floor(Math.random() * prefixes.length)];
  const a = actions[Math.floor(Math.random() * actions.length)];
  const al = alternatives[Math.floor(Math.random() * alternatives.length)];
  const c = conclusions[Math.floor(Math.random() * conclusions.length)];
  return `${p} ${a} ${al}. ${c}`;
}
