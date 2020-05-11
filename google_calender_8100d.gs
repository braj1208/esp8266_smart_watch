/**
 * Lists 10 upcoming events in the user's calendar.
 */
function doGet() {
  var calendarId = 'primary';
  var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime'
  };
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  var event_title = '';
  var event_time = '';
  var t_eventlist = ContentService.createTextOutput();
  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      Logger.log('%s (%s)', event.summary, when);
      event_title = ContentService.createTextOutput(event.summary);
      event_time = ContentService.createTextOutput(when);
      t_eventlist.append(event.summary).append('@').append(when).append('\n');
    }
    return t_eventlist;
  } else {
    Logger.log('No upcoming events found.');
    return ContentService.createTextOutput('No upcoming events found.');
  }
}