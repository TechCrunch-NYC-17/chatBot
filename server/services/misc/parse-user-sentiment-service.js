/**
 * Created by deniztetik on 5/13/17.
 */

const _ = require('lodash');

const toNumberEmoji = (num) => {
  const toWord = [
    ':zero:', ':one:', ':two:', ':three:', ':four:', ':five:',
    ':six:', ':seven:', ':eight:', ':nine:', ':ten:'
  ];

  return toWord[Math.round(Number(num) * 10)];
};

export const parseUserSentiment = ({userName, emotion_tone, language_tone, social_tone}) => {

  let str = `Hello, ${userName}!\n\n`;
  str += `Here are your tone analysis stats (out of 5)\n\n`;

  str += '*Emotional Tone*:\n';
  str += `:angry: : ${toNumberEmoji(_.find(emotion_tone, {tone_id: 'anger'}).score)}\n`;
  str += `:disappointed: : ${toNumberEmoji(_.find(emotion_tone, {tone_id: 'disgust'}).score)}\n`;
  str += `:fearful: : ${toNumberEmoji(_.find(emotion_tone, {tone_id: 'fear'}).score)}\n`;
  str += `:joy: : ${toNumberEmoji(_.find(emotion_tone, {tone_id: 'joy'}).score)}\n`;
  str += `:white_frowning_face: : ${toNumberEmoji(_.find(emotion_tone, {tone_id: 'sadness'}).score)}\n\n`;

  str += `*Language Tone*:\n`;
  str += `:thinking_face: : ${toNumberEmoji(_.find(language_tone, {tone_id: 'analytical'}).score)}\n`;
  str += `:sunglasses: : ${toNumberEmoji(_.find(language_tone, {tone_id: 'confident'}).score)}\n`;
  str += `:neutral_face: : ${toNumberEmoji(_.find(language_tone, {tone_id: 'tentative'}).score)}\n\n`;

  str += `*Social Tone*:\n`;
  str += `:hugging_face: : ${toNumberEmoji(_.find(social_tone, {tone_id: 'openness_big5'}).score)}\n`;
  str += `:upside_down_face: : ${toNumberEmoji(_.find(social_tone, {tone_id: 'conscientiousness_big5'}).score)}\n`
  str += `:stuck_out_tongue_winking_eye: : ${toNumberEmoji(_.find(social_tone, {tone_id: 'extraversion_big5'}).score)}\n`;
  str += `:smile: : ${toNumberEmoji(_.find(social_tone, {tone_id: 'agreeableness_big5'}).score)}\n\n`;

  str += `*Overall*:\n`;
  str += `:angry: :white_frowning_face: :neutral_face: :slightly_smiling_face: :grinning: : ${toNumberEmoji(_.find(social_tone, {tone_id: 'emotional_range_big5'}).score)}\n`;

  return str;
}
