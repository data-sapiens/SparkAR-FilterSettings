# SparkAR-FilterSettings
A wrapper for controlling multiple settings with a slider in SparkAR.

This script lets you easily add multiple settings that can be controlled by one slider. It utilizes the UI Picker for selecting what setting you want to edit and a single slider for editing the selected setting.

## Usage
Simply add the `FilterSettings.js` script to your project. Include it in your main project script file: 
```
import { FilterSettings } from './FilterSettings';
```
And configure it with the settings you want to control:
```
FilterSettings.configure({
	setting1: {
		icon: Tex.get('iconSetting1')
	},
	setting2: {
		icon: Tex.get('iconSetting2'),
		default: 0.5,
	},
	setting3: {
		icon: Tex.get('iconSetting3'),
	}
}, callback);

function callback(evt) {
  // This will trigger when any setting is updated. 
}
```
By default all settings will have the value 0, but you can overwrite this by setting a `default` parameter for the setting (As shown on setting2 above). You also will need to provide a callback function that should trigger when any of the settings are updated. The callack will recieve an object with the name of the setting being updated and its new value.

## Example
Under is a quick example how it can be used to adjust colors on a filter. Note that this example wont work out of the box, but is to make it more clear. 
```
//
// SparkAR Modules
//
const Mat = require('Materials');
const Tex = require('Textures');

//
// Local Dependencies
//
import { FilterSettings } from './FilterSettings';
import { adjustColors } from './Shaders';

//
// Get textures
//
const texCamera = Tex.get('texCamera');

//
// Get materials
//
const matEdited = Mat.get('matEdited');

//
// Setup filter settings
//
FilterSettings.configure({
	contrast: {
		icon: Tex.get('iconContrast')
	},
	lightness: {
		icon: Tex.get('iconBrightness'),
		default: 0.5,
	},
	saturation: {
		icon: Tex.get('iconSaturation'),
	}
}, onUpdate);


// Function that adjust colors
function onUpdate(evt) {
	const out = adjustColors({
		texture: texCamera.signal,
		contrast: FilterSettings.contrast,
		lightness: FilterSettings.lightness,
		saturation: FilterSettings.saturation
	});

	matEdited.setTexture(out, {textureSlotName: 'diffuseTexture'});
}

// Trigger once on init
onUpdate();
```
## Data Sapiens
If you find this useful, make sure to follow [Data Sapiens on Instagram](https://www.instagram.com/datasapiens.life/) for more.
