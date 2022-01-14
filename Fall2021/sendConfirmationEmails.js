var EMAIL_SENT = 'EMAIL_SENT';
var INPERSON1 = 'Auditioning in person';
var INPERSON2 = '';
var SEVENTEEN = 'Seventeen - Ready to Love (8/28 Sat @ 5-7pm)';
var PERSON = 'in-person';
var VIRTUAL = 'virtually'
 
function sendConfirmationEmails() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var dataRange = sheet.getRange(2, 1, sheet.getMaxRows(), 19); //sheet.getRange(startRow, startColumn, numRows, numcolumns)
    var data = dataRange.getValues();
 
 
    for (var i = 0; i < data.length; ++i) {
        // if already sent, skip over
        var emailSent = currRow[16];
        if (emailSent == EMAIL_SENT) {
          continue;
        }
 
        var currRow = data[i];
        var auditionNumber = i + 2; // current row is their audition number
        var name = currRow[1];
        var emailAddress = currRow[3];
        sheet.getRange(2 + i, 19).setValue(auditionNumber); //record their number in the last column
     
        // in-person vs virtual
        var session = currRow[4];
        if (session == INPERSON1) {
            var sess = PERSON;
        } else if (session == INPERSON2) {
            var sess = PERSON;
        } else {
            var sess = VIRTUAL;
        }
     
        //song and date, time
        if (sess == PERSON) {
            if (currRow[5] == SEVENTEEN) {
                var song = 'Seventeen - Ready to Love';
                var date = 'Saturday, August 28th @ 5-7 PM EST';
            } else {
                var song = 'LOONA - Paint the Town';
                var date = 'Thursday, August 26th @ 8:45-10:45 PM EST';
            }
        } else {
            var song = session;
        }
      
        //links for message
        var doc = 'this document';
        var document = doc.link("https://docs.google.com/document/d/1hkZJO5j9m_o0qp8tT8H5rwUoc1wEI9Fy6I6JaqUGtrY/edit?usp=sharing");
     
        //message parts
        var greeting = 'Hi ' + name + '!\n\n';
        var intro = 'Thank you for registering for GT Seoulstice’s Fall 2021 auditions! You have registered to audition ' + sess + ' for ' + song + '.\n\n';
        if (sess == PERSON) {
            var body = 'In-person auditions for ' + song + ' is on ' + date + ', and your audition number is ' + auditionNumber + '. Please show up to your registered session.\n\n';
        } else {
            var body = 'Please follow the filming guidelines in this document, https://tinyurl.com/2ksrj3km, as you record your audition piece. Title your YouTube video as “#' + auditionNumber + ' - ' + name + ' Seoulstice Fall Auditions.” Submissions are due by Saturday, August 28th @ 7 PM EST to gtseoulstice@gmail.com.\n\n';
        }
        var officeHours = 'We will also hold office hours during the first week of classes as an opportunity for you to meet our leaders and get early feedback. Please refer to the following document for more details: https://tinyurl.com/dpphsuh6. Please come to office hours having attempted to learn the choreography. We’re here to answer your questions and give clarifications on any ambiguities! However, we will NOT be teaching the whole choreography during these office hours since people will be coming in at different times.\n\n';
        var outro = 'If you would like to forfeit your spot or have any other questions, please email us at gtseoulstice@gmail.com. We are looking forward to seeing your audition!\nGT Seoulstice';
     
        var message = greeting + intro + body + officeHours + outro;
     
        // Prevent sending duplicates
        if (emailSent !== EMAIL_SENT) {
            var subject = 'You’re registered for GT Seoulstice’s Fall 2021 Auditions!';
            MailApp.sendEmail(emailAddress, subject, message);
            sheet.getRange(2 + i, 17).setValue(EMAIL_SENT);
            // Make sure the cell is updated right away in case the script is interrupted
            SpreadsheetApp.flush();
        }
    }
}
