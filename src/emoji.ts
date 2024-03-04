export function getEmojiForNumber(number: number): string {
  if (number <= 25) {
      return '📛';
  } else if (number <= 50) {
      return '😐🔎'; // Emoji for range 2
  } else if (number <= 75) {
      return '😊⚙️'; // Emoji for range 3
  } else {
      return '🟢🚀'; // Emoji for range 4
  }
}