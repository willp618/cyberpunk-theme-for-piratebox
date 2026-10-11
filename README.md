# cyberpunk-theme-for-piratebox
- this is a cyberpunk theme made with help of AI to use copy the share folder to the usb stick being used by the piratebox Im not sure how to do this on a piratebox using just an sdcard 

- this allows both the main page and the chan board to have the same theme without manually editing files 

- to change the info panel to match your device setup change the index.html that is in the share/content folder 

- there is a modified station_cnt.sh file this needs to be copied to /opt/piratebox/bin/ i personally manually replaced the current station_cnt.sh line by line making sure that the format is the same 
  this modified station_cht.sh logs mac addresses to a .txt in the tmp folder which is cleared every restart this allows the stations_cnt.sh to show how many devices have been connected since startup a useful bit of 
  info when out in the wild and not sure if the box has had anyone connect 

- to use you most install station_cnt.sh using 

- sudo /opt/piratebox/bin/install_piratebox.sh /opt/piratebox/conf/piratebox.conf station_cnt 

- after a while it should show on the homepage, you then cd to /opt/piratebox/bin then sudo nano station_cnt.sh and edit line by line 

- there are ways to copy it over but they didnt work for me causing errors in the formatting

- you should be get something like the image below 

- ALWAYS MAKE A BACK UP OF ANY FILES YOU PLAN TO CHANGE JUST INCASE

<img width="1919" height="876" alt="image" src="https://github.com/user-attachments/assets/fc2faaf1-02c4-4a1d-af4c-7d37fa278983" />


- the above is a screen shot of the theme installed and working on a rpi 1 piratebox 
  
