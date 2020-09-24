// data is an array of objects, each representing one of your categories.
// Each category has a .title to store its title and a .counters that
// stores an object for each counter in that category.
var data = [
  {
title: 'LEAGUES',
counters: [
  // Each counter has a .title and a .date that is parsed by new Date()
  {
    title: 'IPL',
    date: 'September 19, 2020'
  },
  {
    title: 'BBL',
    date: 'December 3, 2020'
  },
  
]
  },
  {
title: 'ICC TOURNAMENTS',
  counters: [
    {
      title: "Men's T20 World Cup (Postponed)",
      date: "October 18, 2020"
    },
    {
      title: "Women's Cricket World Cup (Postponed)",
      date: 'February 6, 2021'
    },
    
    
  ]
},
{
title: 'INTERNATIONAL SERIES',
   counters: [
    {
      title: "Australia tour of England",
      date: 'September 4, 2020'
    },
    {
      title: "West Indies tour of Australia (Postponed)",
      date: 'October 4, 2020'
    },
    {
      title: "India tour of Australia",
      date: 'October 11, 2020'
    },
    {
      title: "Afghanistan tour of Australia",
      date: "November 21, 2020"
    },
    {
      title: "New Zealand tour of Australia",
      date: "January 26, 2021"
    },
   
]
},
]
  

// this reduce generates the table
let table = data.reduce((acc, category, categoryIndex) => {
return acc + `<tr><td colspan="6" class="category">${category.title}</td></tr>` +
category.counters.reduce((acc, counter, index) => {
  return acc + `<tr id="counter-${categoryIndex}-${index}">
  <td>${counter.title}</td>
  <td>${counter.date}</td>
  <td class="days"></td>
  <td class="hours"></td>
  <td class="minutes"></td>
  <td class="seconds"></td>
  </tr>`;
  }, '');
}, '<tr><th>Event</th><th>Date</th><th>Days</th><th>Hours</th><th>Minutes</th><th>Seconds</th></tr>');

// REMOVED
// table += '</table>';

// CHANGED: insert the table after the noscript tag
// document.getElementById('countdown').insertAdjacentHTML('afterend', table);
document.getElementById('countdown').innerHTML = table;

// generate a flat list of counters
let counters = data.reduce((acc, category, categoryIndex) => {
return acc.concat(category.counters.reduce((counterAcc, counter, index) => {
    return counterAcc.concat([{
      // counters will be an array of the objects we generate here.
      // node contains a reference to the tr element for this counter
      node: document.getElementById(`counter-${categoryIndex}-${index}`),
      // date is the date for this counter parsed by Date and then converted
      // into a timestamp
      date: (new Date(counter.date)).getTime()
      }]);
    }, []));
}, []);
// calculates time
const msSecond = 1000,
  msMinute = msSecond * 60,
  msHour = msMinute * 60,
  msDay = msHour * 24;
let intervalId;

function updateCounters () {
  counters.forEach((counter, counterIndex) => {
  let remaining = counter.date - Date.now(),
    node = counter.node;
  let setText = (selector, text) => node.querySelector(selector).textContent = text;

  if (remaining > 0) {
    setText('.days', Math.floor(remaining / msDay));
    remaining %= msDay;
    setText('.hours', Math.floor(remaining / msHour));
    remaining %= msHour;
    setText('.minutes', Math.floor(remaining / msMinute));
    remaining %= msMinute;
    setText('.seconds', Math.floor(remaining / msSecond));
  } else {
    // make sure I don't accidentally display negative numbers if a timer
    // firing late returns a past timestamp (or the data contains a past date)
    setText('.days', 0);
    setText('.hours', 0);
    setText('.minutes', 0);
    setText('.seconds', 0);

    // This countdown has reached 0 seconds, stop updating it.
    counters.splice(counterIndex, 1);
    // no more counters? Stop the timer
    if (counters.length === 0) {
      clearInterval(intervalId);
    }
  }
  });
}
// display counters right away without waiting a second
updateCounters();
intervalId = setInterval(updateCounters, 1000);
