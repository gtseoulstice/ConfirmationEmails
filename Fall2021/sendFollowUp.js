var EMAIL_SENT = 'EMAIL_SENT';

function sendFollowUp() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var dataRange = sheet.getRange(2, 1, sheet.getMaxRows(), 18); //sheet.getRange(startRow, startColumn, numRows, numcolumns)
    var data = dataRange.getValues();
 
    for (var i = 0; i < data.length; ++i) {
        var currRow = data[i];
        var name = currRow[1];
        var emailAddress = currRow[3];
 
        //message parts
        var greeting = 'Hi ' + name + '!\n\n';
        var body = 'Our office hours have been confirmed! Please refer to the google doc below for more details.\n\n';
        var note = '*Note: Please come to office hours having attempted to learn the choreography. We’re here to answer your questions and give clarifications on any ambiguities! However, we will NOT be teaching the whole choreography during these office hours since people will be coming in at different times.\n\n';
        var schedule = 'Schedule for office hours: https://tinyurl.com/dpphsuh6.\n\n';
        var outro = 'We are looking forward to seeing your audition!\nGT Seoulstice';
     
        //message
        var message = greeting + body + note + schedule + outro;
     
        // Prevent sending duplicates
        var emailSent = currRow[17];
        if (emailSent !== EMAIL_SENT) {
            var subject = 'GT Seoulstice Office Hours for Auditions';
            MailApp.sendEmail(emailAddress, subject, message);
            sheet.getRange(2 + i, 18).setValue(EMAIL_SENT);
            // Make sure the cell is updated right away in case the script is interrupted
            SpreadsheetApp.flush();
        }
    }
}
