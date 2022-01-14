# Scripts for Audition Confirmation Emails
## Resources:
- https://developers.google.com/apps-script/articles/sending_emails

## Apply the Scripts:
- Log into Seoulstice google account
- Help -> ‘App Script’ or script.google.com -> ‘New Project’ -> [ insert instructions for connecting script to sheet ]
- Save when done

## Add trigger to automatically run the script:
- ‘Triggers’ -> ‘Add Trigger’ -> there will be pop up with options
    - Choose which function to run : sendConfirmationEmails
    - Choose which deployment should run : Head
    - Select event source : Time-Driven
    - Select type of time based trigger : Minutes Timer
    - Select minute interval : every 5 Minutes
    - Save
- If pop-up with ‘Google hasn’t verified this app’, just click on ‘Advanced’ -> ‘Go to [title of project] (unsafe)’ -> ‘Allow

## Notes:
- Always be logged into Seoulstice gmail before running to make sure the 'sender' is not your personal account
- trigger has to be time-driven since event-driven has not worked historically
- ignore error rate; it will be for 'no recipient', but all succesfully send emails can be found in the gmail's sent folder

