#!/bin/sh

## By Matthias Strubel , Licenced by GPL-3 (c)2012-2014
## Modified: also tracks unique clients seen since the box was turned on

STATIONS=`iw wlan0 station dump`
CNT=`echo "$STATIONS" | grep Station | wc -l`

# --- "seen since power-on" tracking -----------------------------------------
# A running, de-duplicated list of every MAC iw has reported this session.
# Unlike station_cnt.txt (rewritten every 2 min), this file is appended to,
# so it remembers people who have since disconnected.
SEEN_FILE="/opt/piratebox/tmp/station_seen.txt"
mkdir -p "$(dirname "$SEEN_FILE")" 2>/dev/null

# If SEEN_FILE is older than the current boot, the box has restarted since
# we last wrote to it - start the tally over for this power-on session.
BOOT_TIME=$(( $(date +%s) - $(awk '{print int($1)}' /proc/uptime) ))
if [ -f "$SEEN_FILE" ]; then
    FILE_TIME=$(stat -c %Y "$SEEN_FILE" 2>/dev/null || echo 0)
    [ "$FILE_TIME" -lt "$BOOT_TIME" ] && : > "$SEEN_FILE"
else
    : > "$SEEN_FILE"
fi

# Append any currently-connected MACs, then de-duplicate the file
echo "$STATIONS" | grep Station | awk '{print $2}' >> "$SEEN_FILE"
sort -u -o "$SEEN_FILE" "$SEEN_FILE"

TOTAL=`wc -l < "$SEEN_FILE"`
# -----------------------------------------------------------------------------

echo "<a title='Counter is refreshed every 2 minutes, you need to refresh the page'>Currently there are $CNT connected clients ($TOTAL seen since power-on)</a>"
