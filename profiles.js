const glob = require('glob');
const path = require('path');
const error = require('./error');

class Profiles {
    
    scan(folder, filter) {
        var profiles = glob.sync(path.join('*', 'ModuleObjects', '*', 'ExportProfiles', filter), { nocase: true });
        if (profiles.length == 0) {
            error("No matching profiles found.");
        }
        return profiles;
    }

    clientDocsProfiles(profiles) {
        var cdProfiles = [];
        for (var p = 0; p < profiles.length; p++) {
            var doc = profiles[p].substring(
                profiles[p].lastIndexOf("ModuleObjects/") + "ModuleObjects/".length, 
                profiles[p].lastIndexOf("/ExportProfiles")
            );
            var prof = profiles[p].substring(profiles[p].lastIndexOf("/") + 1);
            cdProfiles.push(...glob.sync(path.join('*', 'ModuleObjects', '*', 'ExportProfiles', doc, prof)));
        }
        return cdProfiles;
    }

}

module.exports = new Profiles();