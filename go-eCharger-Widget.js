// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: plug;

// Scriptable.app widget for monitoring go-eCharger(s)
// - https://scriptable.app
// - https://go-e.co
// - https://www.icloud.com/shortcuts/fedc00550c634742b33d596551e8346e
//
// The configuration script for configuring the widget's internals:
//
// - https://raw.githubusercontent.com/mschmitt/go-e-widget/main/go-eCharger-Setup.js
//
// Limitations
// - Refresh interval can't be increased and defaults to 5-10 minutes
// - No manual refresh possible
// - External Siri shortcut seems to be required for opening the charging app
// - Errors around the API http request are not handled very well

let config_file = "go-eCharger/config.json"

// Start with a local filemanager, then find out whether we're on iCloud
let fm = FileManager.local()
// Detect if I'm running from iCloud myself
const running_on_icloud = fm.isFileStoredIniCloud(module.filename)
if (running_on_icloud) {
	// Re-instantiate filemanager for iCloud
	fm = FileManager.iCloud()
}

// Final name of the configuration file
config_file = fm.joinPath(fm.documentsDirectory(), config_file)

// Read config or fall back to defaults
let config = new Object()
let api_url
if (running_on_icloud && fm.fileExists(config_file)) {
	await fm.downloadFileFromiCloud(config_file)
	config = JSON.parse(fm.readString(config_file))
	api_url='https://api.go-e.co/api_status?token=' + config.apitoken
}else{
	api_url='http://go-echarger/status'
}

// Now parse configuration from config_file

const widget = await createWidget()
if (!config.runsInWidget) {
        await widget.presentSmall()
}
Script.setWidget(widget)
Script.complete()

async function createWidget() {
        const status = await getChargerStatus()
        const list = new ListWidget()
        list.backgroundColor = Color.white()
        list.setPadding(0, 0, 0, 0)
        // Rumor has it: Setting a low minimum refresh interval makes for
        // more frequent refreshes. (I doubt this is how any of this works.)
        list.refreshAfterDate = new Date(Date.now() + 60000)
        // On widget click:
        // > Open scriptable.app
        //  > Open shortcuts app
        //   > run the go-eCharger app through the following Siri shortcut
        //     https://www.icloud.com/shortcuts/fedc00550c634742b33d596551e8346e
        //     (Workaround bc as of now, the app doesn't register a URL schema.)
        list.url = 'shortcuts://run-shortcut?name=go-eCharger'
        const header = list.addText("go-eCharger")
        header.font = Font.boldSystemFont(20)
        header.textColor = Color.black()
        header.centerAlignText()
        let icon
        if (status.success){
		let carstatus
		if (status.car == "1"){
			carstatus = list.addText("Kein Fahrzeug verbunden.")
                        icon = list.addText("💤🔌") // Zzz and plug
		} else if (status.car == "2"){
			carstatus = list.addText("Fahrzeug wird geladen.")
                        icon = list.addText("🟢🔌") // Green circle and plug
		} else if (status.car == "3"){
			carstatus = list.addText("Warte auf Fahrzeug.")
                        icon = list.addText("⏸️🔌") // Pause button and plug
		} else if (status.car == "4"){
			carstatus = list.addText("Ladevorgang beendet.")
                        icon = list.addText("✅🔌") // Check mark button and plug
		} else {
                        // After a valid API response, this else should really never hit.
                        carstatus = list.addText("Kein Fahrzeugstatus.")
                        icon = list.addText("❓🤷") // Question mark and shrugging person
		}
		carstatus.textColor = Color.black()
		carstatus.font = Font.mediumSystemFont(10)
		carstatus.centerAlignText()
                const power = list.addText(status.nrg_kw + ' kW')
                power.font = Font.boldSystemFont(32)
                power.textColor = Color.black()
                power.centerAlignText()
		let kwh
		if (status.nrg_kwh > 0) {
			if (config.price && config.currency){
				kwh = list.addText(status.nrg_kwh + ' kWh / ' + (status.nrg_kwh * config.price).toFixed(2) + ' ' + config.currency)
			}else{
				kwh = list.addText(status.nrg_kwh + ' kWh')
			}
			kwh.textColor = Color.black()
			kwh.font = Font.boldSystemFont(10)
			kwh.centerAlignText()
		}
        }else{
                icon = list.addText("❓🤷") // Question mark and shrugging person
                // Wallbox or API not reachable
                const unreachable = list.addText("Wallbox oder API\nnicht erreichbar.")
                unreachable.textColor = Color.black()
                unreachable.centerAlignText()
        }
        const timestamp = list.addText(status.time)
        timestamp.textColor = Color.black()
        timestamp.font = Font.mediumSystemFont(10)
        timestamp.centerAlignText()
        icon.font = Font.boldSystemFont(40)
        icon.centerAlignText()
        return list
}

async function getChargerStatus() {
        let status = {}
        status.time = new Date().toLocaleString()
        try {
                let request = new Request(api_url)
                request.timeoutInterval = 30
                let rawdata = await request.loadJSON()
                let data = rawdata
                // If we're going through api.go-e.co,
                // dig down to the actual data object
                if (rawdata.data){
                        data = rawdata.data
                }
                // For testing / demo / screenshots:
                // data.nrg[11] = 444.444
                // data.nrg[11] = 1080
                status.nrg_kw = (data.nrg[11] / 100).toFixed(1)
		status.nrg_kwh = ((data.dws * 10) / 3600000).toFixed(1)
		status.car = data.car
                if (data.sse){
                        status.success = true
                }
        }catch(e){
                status.success = false
        }
        return status
}
