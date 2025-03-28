import GLib from 'gi://GLib';

const STUDY_DATA_PATH = GLib.get_user_config_dir() + '/study-tracker-data.json';

/**
 * @class StudyTrackerExtension
 * @description A GNOME Shell extension that helps track study materials.
 * The extension adds an indicator to the GNOME shell panel that shows
 * how many study materials have been completed out of the total.
 */
export default class StudyTrackerExtension {

  /**
 * @constructor
 * @description Initializes the extension with null values for indicator and menu,
 * and an empty object for file status tracking.
 */
  constructor() {
    this._indicator = null;
    this._statusMenu = null;
    this._fileStatus = {};
  }


  /**
 * @method _saveData
 * @private
 * @description Serializes and saves the current file status data to the file system.
 */
  _saveData() {
    const data = JSON.stringify(this._fileStatus);
    GLib.file_set_contents(STUDY_DATA_PATH, data);
  }
}