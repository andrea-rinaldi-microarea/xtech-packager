const glob = require('glob');
const path = require('path');
const error = require('./error');

class Profiles {
    
    scan(appName, isStandard, filter) {
        var profiles = isStandard ? glob.sync(path.join(appName, '*', 'ModuleObjects', '*', 'ExportProfiles', filter), { nocase: true }) :
                                    glob.sync(path.join(appName, '*', 'ModuleObjects', '*', 'ExportProfiles', 'AllUsers', filter), { nocase: true });
        if (profiles.length == 0) {
            error("No matching profiles found.");
        }
        return profiles;
    }

    clientDocsProfiles(appName, isStandard, profiles) {
        var cdProfiles = [];
        for (var p = 0; p < profiles.length; p++) {
            var doc = profiles[p].substring(
                profiles[p].lastIndexOf("ModuleObjects/") + "ModuleObjects/".length, 
                profiles[p].lastIndexOf("/ExportProfiles")
            );
            var prof = profiles[p].substring(profiles[p].lastIndexOf("/") + 1);
            if (isStandard)
                cdProfiles.push(...glob.sync(path.join(appName, '*', 'ModuleObjects', '*', 'ExportProfiles', doc, prof)));
            else
                cdProfiles.push(...glob.sync(path.join(appName, '*', 'ModuleObjects', '*', 'ExportProfiles', 'AllUsers', doc, prof)));
        }
        return cdProfiles;
    }

}

module.exports = new Profiles();