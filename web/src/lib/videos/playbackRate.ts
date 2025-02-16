const MIN_PLAYBACK_RATE = 0.0625;
const MAX_PLAYBACK_RATE = 16.0;

export const getValidPlaybackRate = (playbackRate: number) => {
  if (playbackRate < MIN_PLAYBACK_RATE) return MIN_PLAYBACK_RATE;
  if (playbackRate > MAX_PLAYBACK_RATE) return MAX_PLAYBACK_RATE;
  return playbackRate;
};
