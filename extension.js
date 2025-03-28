import GLib from 'gi://GLib'
import Gio from 'gi://Gio'
import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

const STUDY_DATA_PATH = GLib.get_user_config_dir() + '/study_tracker_data.json'

export default class StudyTrackerExtension{
    constructor(){
        this._indicator = null;
        this._statusMenu = null;
        this._fileStatus = {};
    }

    _saveData(){
        const data = JSON.stringify(this._fileStatus)
        GLib.file_set_contents(STUDY_DATA_PATH, data);
    }

    _loadData(){
        try {
            const file = Gio.File.new_for_path(STUDY_DATA_PATH);
            const [success, contents] = file.load_contents(null);
            if(success){
                this._fileStatus = JSON.parse(new TextDecoder().decode(contents))
            }
        } catch (error) {
            console.log("Error occured while loading the data", error)
        }
    }
    _updateIndicator(){
        const total = Object.keys(this._fileStatus).length;
        const completed = Object.keys(this._fileStatus).filter(v=>v).length;
        const label = this._indicator.get_first_child();
        label.text = `📚 ${completed}/${total}`;
    }

    _createIndicator(){
        this._indicator = new PanelMenu.Button(0.0, 'Study Tracker', false);
        
        const label = new St.Label({text: '0/0'});
        this._indicator.add_child(label);
        Main.panel.addToStatusArea('Study Tracker', this._indicator);
    }

    enable() {
        this._loadData();
        this._createIndicator();
        this._updateIndicator();
        // this._add;
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
    
}