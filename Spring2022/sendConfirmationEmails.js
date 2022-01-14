var EMAIL_SENT = 'EMAIL_SENT';
var INPERSON = 'Auditioning in person';
var NCT = 'NCT 127 - Favorite (Vampire) (1/16 Sun @3-5pm)';
var PERSON = 'in-person';
var VIRTUAL = 'virtually'

function sendConfirmationEmails() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var dataRange = sheet.getRange(2, 1, sheet.getMaxRows(), 12);
    //sheet.getRange(startRow, startColumn, numRows, numcolumns)
    var data = dataRange.getValues();
    for (var i = 0; i < data.length; ++i) {
        // if already sent, skip over
        var currRow = data[i];
        var emailSent = currRow[11];
        if (emailSent == EMAIL_SENT) {
            continue;
        }
 
        var auditionNumber = i + 1; // current row is their audition number
        var name = currRow[1];
        var emailAddress = currRow[2];
        sheet.getRange(2 + i, 11).setValue(auditionNumber); //record their number in the last column
        // in-person vs virtual
        var session = currRow[4];
        if (session == INPERSON) {
            var sess = PERSON;
        } else {
            var sess = VIRTUAL;
        }
        //song and date, time
        if (sess == PERSON) {
            if (currRow[5] == NCT) {
                var song = 'NCT 127 - Favorite (Vampire)';
                var date = 'Sunday, January 16 @ 3-5 PM EST';
            } else {
                var song = 'ALiEN - Waiting For You';
                var date = 'Saturday, January 15 @ 3-5 PM EST';
            }
        } else {
            var song = session;
        }
        //message parts
        var greeting = 'Hi ' + name + '!\n\n';
        var intro = 'Thank you for registering for GT Seoulstice’s Spring 2022 auditions! You have registered to audition ' + sess + ' for ' + song + '.\n\n';
        if (sess == PERSON) {
            var body = 'In-person auditions for ' + song + ' is on ' + date + ' at CRC Studio A, and your audition number is ' + auditionNumber + '. Please show up to your registered session.\n\n';
        } else {
            var body = 'Please follow the filming guidelines in this document, https://tinyurl.com/2ksrj3km, as you record your audition piece. Title your YouTube video as “#' + auditionNumber + ' - ' + name + ' Seoulstice Spring Auditions.” Submissions are due by Saturday, January 15th @ 5PM EST to gtseoulstice@gmail.com.\n\n';
        }
        var officeHours = 'We will also be hosting office hours during the first week of the semester.  Please refer to the following document for more details: https://tinyurl.com/dpphsuh6. Anyone interested can come in to learn the audition pieces and ask for advice. This is also a good chance to meet the Seoulstice leaders and experience the team culture!\n\n';
        var outro = 'If you would like to forfeit your spot or have any other questions, please email us at gtseoulstice@gmail.com. We are looking forward to seeing your audition!\n\nGT Seoulstice';
        var message = greeting + intro + body + officeHours + outro;
        var subject = 'You’re registered for GT Seoulstice’s Spring 2022 Auditions!';
        MailApp.sendEmail(emailAddress, subject, message);
        sheet.getRange(2 + i, 12).setValue(EMAIL_SENT);
        // Make sure the cell is updated right away in case the script is interrupted
        SpreadsheetApp.flush();
    }
}
