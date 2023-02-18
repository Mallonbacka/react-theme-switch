# Web page theme switcher

This is a simple widget to allow the user to override the color scheme and contrast level of a web page.

The project was initially created with `create-react-app`. It renders as a whole page for development and testing, then
I have a script copying the built files into the website at deploy time, as it targets a tiny element in the web page.

It's designed to be keyboard accessible - focus is trapped inside the panel, like a modal.

The preferred color scheme and contrast amount are written to HTML `data-` attributes. 

The code is made public in the spirit of "working in the open". 