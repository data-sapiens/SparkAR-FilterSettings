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

## Example using patches (Updating SparkAR's Adjust Color Shader Patch)
Here is an quick example on how one can send the values to the pathch editor and use them in the Adjust Color Shader Patch.
```
//
// SparkAR Modules
//
const Patches = require('Patches');

//
// Local Dependencies
//
import { FilterSettings } from './FilterSettings';

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

// Function that is triggered when settings are updated.
function onUpdate(evt) {
	Patches.setScalarValue('contrast', FilterSettings.contrast);
	Patches.setScalarValue('lightness', FilterSettings.lightness);
	Patches.setScalarValue('saturation', FilterSettings.saturation);
}

// Trigger once on init to load default values
// into the patch editor.
onUpdate();
```
And then set up the patch in the pacth editor:
![Nodes in patch editor](https://user-images.githubusercontent.com/2833312/74100183-6bf3b780-4b2c-11ea-9880-91c8c90f8987.png)

You can follow the [SparkAR guide on script to patches bridging](https://sparkar.facebook.com/ar-studio/learn/documentation/docs/visual-programming/javascript-to-patch-bridging/) to see how to set up the bridges.

## Example using script (custom color adjustment shader)
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
