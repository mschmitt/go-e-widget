// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: cogs;

// Configurator for the go-eCharger widget

// Not thoroughly tested on non-iCloud (local) storage. Good luck with that.

// relative names of the configuration dir/file
let config_dir  = "go-eCharger"
let config_file = "go-eCharger/config.json"

// Start with a local filemanager, then find out whether we're on iCloud
let fm = FileManager.local()
// Detect if I'm running from iCloud myself
const running_on_icloud = fm.isFileStoredIniCloud(module.filename)
if (running_on_icloud) {
	// Re-instantiate filemanager for iCloud
	fm = FileManager.iCloud()
}

// Final names of the configuration dir/file
config_dir  = fm.joinPath(fm.documentsDirectory(), config_dir)
config_file = fm.joinPath(fm.documentsDirectory(), config_file)

// If we're on iCloud, try to retrieve the config file from iCloud
if (running_on_icloud && fm.fileExists(config_file)) {
	await fm.downloadFileFromiCloud(config_file)
}

// If go-eCharger/config.js still does not exist, create default config file
if (!fm.fileExists(config_dir)) {
	await fm.createDirectory(config_dir);
}
if (!fm.fileExists(config_file)){
	let sample_config = new Object()
	sample_config.apitoken = "01234abcde"
	sample_config.price = 0.2755
	sample_config.currency = "€"
	sample_config.url = "https://app.go-e.co/"
	await fm.writeString(config_file, JSON.stringify(sample_config, null, 2))
}

// Now parse configuration from config_file
config = JSON.parse(fm.readString(config_file))

// Present to the user for editing
let alert = new Alert()
alert.title = "go-eCharger Konfiguration"
alert.message = "Bitte Werte passend bearbeiten:\n- API-Token\n- Preis/kWh\n- Währung"
alert.addTextField(config.apitoken, config.apitoken)
alert.addTextField(config.price.toString(), config.price.toString())
alert.addTextField(config.currency, config.currency)
alert.addTextField(config.url, config.url)
alert.addAction("OK")
alert.addCancelAction("Abbruch")
let action = await alert.present()

// OK was pressed, write configuration back
if (action == 0) {
	config.apitoken = alert.textFieldValue(0)
	// https://stackoverflow.com/a/5661399/263310
	config.price = +(alert.textFieldValue(1).replace(/,/,'.'))
	config.currency = alert.textFieldValue(2)
	config.url = alert.textFieldValue(3)
	await fm.writeString(config_file, JSON.stringify(config, null, 2))
}
