Front End Challenge solution

- I optimized the way the html was getting generated. There were 3 for-loops which I reduced to 2 for-loops. This decreased the run time significantly.
- I removed push() for arrays since it takes significantly more time than adding value to the i-th position of an array
- Removed the notion of rows, since that helped in making the icons more fluid while:
	1. removing any product from the screen by clicking on the 'x' (when there are no rows, the icons rearrange nicely)
	2. making the page responsive (the icons don't need to be next to each other while using different devices)
- I added a fadeout animation when any product is closed
- I could make the screen and icons look prettier if I has used some other libraries and could have added the description div on top of the actual div as well
- I did different class names for page and product title and tagline. This helped addressing the look and feel of the two differently.