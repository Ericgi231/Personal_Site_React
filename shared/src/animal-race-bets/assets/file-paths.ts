const TRACK_BACKGROUND_FILE = "background.png";
const TRACK_LAYOUT_FILE = "layout.png";
const TRACK_RESULTS_FILE = "results.png";
const TRACK_BASE_PATH = "/assets/animal-race-bets/tracks/";

const ANIMAL_SPRITE_FILE = "sprite.png";
const ANIMAL_VICTORY_FILE = "victory.png";
const ANIMAL_BASE_PATH = "/assets/animal-race-bets/animals/";

const INTERMISSION_BASE_PATH = "/assets/animal-race-bets/intermissions/";

const OBJECT_BASE_PATH = "/assets/animal-race-bets/objects/";

/**
 * @param intermissionId ID of the intermission
 * @returns Full path to intermission background image
 */
export function getIntermissionPath(intermissionId: string) {
  return `${INTERMISSION_BASE_PATH}${intermissionId}.png`;
}

/**
 * @param objectId ID of the object
 * @returns Full path to object image
 */
export function getObjectPath(objectId: string) {
  return `${OBJECT_BASE_PATH}${objectId}.png`;
}

/**
 * @param animalId ID of the animal
 * @returns Full path to animals racing sprite
 */
export function getAnimalSpritePath(animalId: string) {
  return `${ANIMAL_BASE_PATH}${animalId}/${ANIMAL_SPRITE_FILE}`;
}

/**
 * @param animalId ID of the animal
 * @returns Full path to animals victory image
 */
export function getAnimalVictoryPath(animalId: string) {
  return `${ANIMAL_BASE_PATH}${animalId}/${ANIMAL_VICTORY_FILE}`;
}

/**
 * @param trackId ID of the track
 * @returns Full path to track background image
 */
export function getTrackBackgroundPath(trackId: string) {
  return `${TRACK_BASE_PATH}${trackId}/${TRACK_BACKGROUND_FILE}`;
}

/**
 * @param trackId ID of the track
 * @returns Full path to track layout image
 */
export function getTrackLayoutPath(trackId: string) {
  return `${TRACK_BASE_PATH}${trackId}/${TRACK_LAYOUT_FILE}`;
}

/**
 * @param trackId ID of the track
 * @returns Full path to track results image
 */
export function getTrackResultsPath(trackId: string) {
  return `${TRACK_BASE_PATH}${trackId}/${TRACK_RESULTS_FILE}`;
}