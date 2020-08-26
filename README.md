Why WEBNMAP

WEBNMAP makes the use of nmap easy even if you're unfamiliar with the tool, moving from the classic shell to a more intuitive web interface.

How to install WEBNMAP

To use WEBNMAP you need to follow the following steps:

    Install nodejs and npm
    Install node modules (shell: npm install express ejs mongoose body-parser node-nmap-vulners)
    Install nmap
    Install vulners.nse script (github: https://github.com/vulnersCom/nmap-vulners )
    Edit app.js and connect to your MongoDB
    Launch your node.js app (shell: node app.js)

How to use WEBNMAP

You can scan by entering an IP or an IP range and selecting options to reduce the number of ports and to look for vulnerabilities.
You can also insert a custom parameter directly in the text field (e.g " -p80 " to limit the scan to port 80 only).

Clicking on "Scan IP Address" the app will scan and redirect you to the results page. Clicking on the CVE icon will redirect you to its in-depth page.