//Node Internal Modules
const { exec } = require('child_process');
const LogController = require('@11elements/js-logcontroller');

let wasUpdated = async () => {
    const info = {}
    return new Promise( ( resolve, reject )=> {
        try{
            exec(`git rev-parse @`, ( err, stdout, stderr ) => {
                if ( err ) {
                    LogController.error( `Error trying to get status of local branch: ${ err }` );
                    resolve( false );
                }
                if ( stdout ){
                    info.local = stdout
                    try{
                        exec(`git rev-parse @{u}`, ( err, stdout, stderr ) => {
                            if ( err ) {
                                LogController.error( `Error trying to get status of remote branch: ${ err }` );
                                resolve( false );
                            }
                            if ( stdout ){
                                info.remote = stdout
                                console.log('Has to be updated? ',info.local, info.remote)
                                if(info.local !== info.remote) installUpdates()
                            }
                            else{
                                LogController.error( `Error trying to get status of remote branch: ${ stderr }` );
                            }
                        })
                    }
                    catch( error ){
                        LogController.error( `Unexpected error ${ error }` );
                    }
                }
                else{
                    LogController.error( `Error trying to get status of local branch: ${ stderr }` );
                    resolve( false )
                }
            });
        }
        catch( error ){
            LogController.error( `Unexpected error ${ error }` );
            reject( false )
        }
    })
}

let installUpdates = async () => {
    try{
        exec(`git pull -X theirs origin master`, ( err, stdout, stderr ) => {
            if ( err ) {
                LogController.error( `Error trying to install update: ${ err }` );
            }
            if ( stdout ){
                LogController.info( `updating: ${ stdout }` );
            }
            else{
                LogController.error( `Error while trying to install the update: ${ stderr }` );
            }
        });
    }
    catch( error ){
        LogController.error('Catch Block', error)
        LogController.error( `Error trying to update: ${ error }` );
    }
}

module.exports = {'check': () => wasUpdated()}

