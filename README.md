Use bouncy as a resolver between hosts on the domain, so that different services
can be used for each. Also host the main www server in nodejs, even though it's
overkill.

https://github.com/substack/bouncy/

# resolver and www
npm install
sudo node main.js

# For blog on port 2368
Install Ghost to /var/www/ghost and run through npm

http://support.ghost.org/installing-ghost-linux/#install-ghost
