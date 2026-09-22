// ---- Preview-only mock behaviour. ----
// On a real box, scripts.js talks to cgi-bin/psowrte.py, diskwrite.py,
// station_cnt.txt and chat_content.html. Here everything is faked
// client-side purely so the CSS skin can be judged without hardware.
// This file is NOT part of the real PirateBox build — swap scripts.js
// back in when you deploy to the actual device.

var sampleMessages = [
  { name: "cpt_blackbeard", color: "", text: "anyone got that zine scan uploaded yet" },
  { name: "n0_signal", color: "blue", text: "dropping the new mixtape in Files now" },
  { name: "ghost_router", color: "green", text: "disk usage looking healthy today" },
  { name: "SLAVA_UKRAINI", color: "orange", text: "board's back up, post away" }
];

function colorClass(c) {
  return c ? c : "";
}

function renderMessage(m, prepend) {
  var time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  var html = '<div class="message"><date class="' + colorClass(m.color) + '">[' + time + ']</date> '
    + '<name class="' + colorClass(m.color) + '">' + m.name + ':</name> '
    + '<data>' + m.text + '</data></div>';
  if (prepend) {
    $('#shoutbox').prepend(html);
  } else {
    $('#shoutbox').append(html);
  }
}

function renderDiskUsage(percent) {
  $('#diskusage').html(
    '<div class="progress"><div class="progress-bar" style="width:' + percent + '%">' + percent + '% used</div></div>' +
    '<p style="margin-top:.5em;font-size:.85em;">' + (100 - percent) + '% free of a simulated 32GB stick</p>'
  );
}

$(document).ready(function() {
  $('#station').text('3 devices connected');
  sampleMessages.forEach(function(m) { renderMessage(m, false); });
  renderDiskUsage(41);

  $('#menu-icon').click(function() {
    $(this).toggleClass('rotate');
    $('#top-nav').slideToggle();
  });

  $('#top-nav a').click(function(e) {
    if ($('#top-nav').is(':visible') && $('#menu-icon').is(':visible')) {
      $('#top-nav').slideUp();
      $('#menu-icon').toggleClass('rotate');
    }
  });

  $(window).resize(function() {
    if ($('#menu-icon').is(':visible')) {
      $('#top-nav').hide();
    } else {
      $('#top-nav').show();
    }
  });

  $('#sb_form').submit(function(event) {
    event.preventDefault();
    var name = $('#sb_form .nickname').val() || 'Anonymous';
    var text = $('#sb_form .message').val();
    var color = $('#sb_form input[name=color]:checked').val();
    if (!text) return;
    if (color === 'def') color = '';
    renderMessage({ name: name, color: color, text: text }, true);
    $('#sb_form .message').val('');
    $('#send-button').val('Sent!');
    setTimeout(function() { $('#send-button').val('Send'); }, 800);
  });

  $('#du_form').submit(function(event) {
    event.preventDefault();
    $('#du_form_button').prop('value', 'Refreshing...').prop('disabled', true);
    setTimeout(function() {
      var pct = Math.floor(30 + Math.random() * 40);
      renderDiskUsage(pct);
      $('#du_form_button').prop('value', 'Refresh').prop('disabled', false);
    }, 700);
  });
});
