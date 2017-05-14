/**
 * Created by deniztetik on 5/13/17.
 */

const tone = {user: 'U5BHVEU86',
  tone: { emotion_tone:
    { anger: 0.221577,
      disgust: 0.31794,
      fear: 0.078204,
      joy: 0.025548,
      sadness: 0.582408
    },
    language_tone:
      { analytical: 0,
        confident: 0,
        tentative: 0.966403
      },
    social_tone:
      { openness: 0.915827,
        conscientiousness: 0.064387,
        extraversion: 0.375757,
        agreeableness: 0.579473,
        emotional_range: 0.287825
      }}};

export const parseUserSentiment = ({user, tone}) => {
  let str = `Hello, ${user}!\n\n`;
  str += `Here are your stats\n\n`;

  str += 'Emotional Tone:\n';
  str += `Anger: ${tone.emotion_tone.anger}\n`;
  str += `Disgust: ${tone.emotion_tone.disgust}\n`;
  str += `Fear: ${tone.emotion_tone.fear}\n`;
  str += `Joy: ${tone.emotion_tone.joy}\n`;
  str += `Sadness: ${tone.emotion_tone.sadness}\n\n`;

  str += `Language Tone:\n`;
  str += `Analytical: ${tone.language_tone.analytical}\n`;
  str += `Confident: ${tone.language_tone.confident}\n`;
  str += `Tentative: ${tone.language_tone.tentative}\n\n`;

  str += `Social Tone:\n`;
  str += `Analytical: ${tone.social_tone.openness}\n`;
  str += `Extraversion: ${tone.social_tone.extraversion}\n`;
  str += `Agreeableness: ${tone.social_tone.agreeableness}\n`;
  str += `Openness: ${tone.social_tone.openness}\n`;
  str += `Emotional Range: ${tone.social_tone.emotional_range}\n`;


  return str;
}