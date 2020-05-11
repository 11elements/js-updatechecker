
module.exports = function(frequency:any){
    /**
    * @func update: Check the master github repository of the project and try to update the code if their versions diverge.
    * @param frequency: miliseconds - Determine the frequency in which the update check will run
    * @param intervalKey: Stop the setInterval Function if an error occurs
    */
   const { check } = require('./Update');
   const intervalKey = setInterval(() => check(intervalKey), frequency);
};

