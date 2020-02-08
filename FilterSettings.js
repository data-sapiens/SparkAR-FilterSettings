const NativeUI = require('NativeUI');

const FilterSettings = {
	slider: NativeUI.slider,
	picker: NativeUI.picker,
	pickerConfig: {
		selectedIndex: 0,
	 	items: []
	},
	keys: [],
	callback: undefined,
	current: undefined,

	configure(settings, callback) {
		this.keys = Object.keys(settings);
		this.callback = callback;

		// Handle settings
		this.keys.map(key => {
			// Simple error check so we don't
			// overwrite anything in our object.
			if (this[key]) {
				throw `${key} is a reserved value.`;
			}

			// Add icon to picker.
			this.pickerConfig.items.push({
				image_texture: settings[key].icon
			});

			// Set default value or fall back to 0 
			this[key] = settings[key].default || 0; 
		});

		// Set current being edited to be first of settings
		this.current = this.keys[0];

		// Set slider value to current setting
		this.slider.value = this[this.current];

		// Initalise piciker and slider.
		this.initUI();
	},

	initUI() {
		// Load config into picker
		this.picker.configure(this.pickerConfig);

		// Listen to picker events
		this.picker.selectedIndex.monitor({fireOnInitialValue: false}).subscribe(index => {
			// Update current setting being edited to the new picked item
			this.current = this.keys[index.newValue];

			// Update slide value new current setting value
			this.slider.value = this[this.current];
		});

		// Subscribe to slider events
		this.slider.value.monitor({fireOnInitialValue: false}).subscribe(val => {
			// Update the value for the current setting beeing edited
			this[this.current] = val.newValue;

			// Tell that we have made changes.
			this.callback({
				setting: this.current,
				newValue: this[this.current]
			})
		});

		// Make picker and slider visible
		this.picker.visible = true;
		this.slider.visible = true;
	}
};

export {
	FilterSettings
};
