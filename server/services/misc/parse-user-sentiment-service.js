/**
 * Created by deniztetik on 5/13/17.
 */

const _ = require('lodash');

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

const toNumberEmoji = (num) => {
  const toWord = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:']
};

export const parseUserSentiment = ({user, emotion_tone, language_tone, social_tone}) => {

  let str = `Hello, ${user}!\n\n`;
  str += `Here are your stats\n\n`;

  str += '*Emotional Tone*:\n';
  str += `:angry: : ${_.find(emotion_tone, {tone_id: 'anger'}).score}\n`;
  str += `:disappointed: : ${_.find(emotion_tone, {tone_id: 'disgust'}).score}\n`;
  str += `:fearful: : ${_.find(emotion_tone, {tone_id: 'fear'}).score}\n`;
  str += `:joy: : ${_.find(emotion_tone, {tone_id: 'joy'}).score}\n`;
  str += `:white_frowning_face: : ${_.find(emotion_tone, {tone_id: 'sadness'}).score}\n\n`;

  str += `*Language Tone*:\n`;
  str += `:thinking_face: : ${_.find(language_tone, {tone_id: 'analytical'}).score}\n`;
  str += `:sunglasses: : ${_.find(language_tone, {tone_id: 'confident'}).score}\n`;
  str += `:neutral_face: : ${_.find(language_tone, {tone_id: 'tentative'}).score}\n\n`;

  str += `*Social Tone*:\n`;
  str += `:hugging_face: : ${_.find(social_tone, {tone_id: 'openness_big5'}).score}\n`;
  str += `:upside_down_face: : ${_.find(social_tone, {tone_id: 'conscientiousness_big5'}).score}\n`
  str += `:stuck_out_tongue_winking_eye: : ${_.find(social_tone, {tone_id: 'extraversion_big5'}).score}\n`;
  str += `:smile: : ${_.find(social_tone, {tone_id: 'agreeableness_big5'}).score}\n`;
  str += `:angry: :disappointed: :fearful: :joy: :white_frowning_face: : ${_.find(social_tone, {tone_id: 'emotional_range_big5'}).score}\n`;


  return str;
}

console.log(.25393 * 10);