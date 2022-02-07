const EMBARK_STORY_KEY = '_HEDVIG_EMBARK_STORY'

export const EmbarkStory = {
  get: () => window.sessionStorage.getItem(EMBARK_STORY_KEY),
  set: (story: string) =>
    window.sessionStorage.setItem(EMBARK_STORY_KEY, story),
}
